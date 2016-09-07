/* store.es6 */
/**
 * Client data model including state. Operates on a data-driven model in terms of socket notifications
 */
import debug from 'debug';
import objectPath from 'object-path';

import { controlIOClient } from './clients/control-io-client';
import { teleIOClient } from './clients/tele-io-client';

const log = debug('rsvp-client:store');

/**
 * Data related to the client that is currently in session
 * SOURCE
 * @member  {String}  type          The type of client ['viewer'|'controller']
 * @member  {String}  controlLevel  The level of control that the client has in this session ['none'|'control'|'admin']
 */
export const client = {
  type: 'controller',
  controlLevel: 'none',

  _watched: {
  },
  _type: 'source',
};

/**
 * Control input store
 * SOURCE
 * @member  {Object}  driveInput  The input values from the drive joystick
 */
export const control = {
  driveInput: {
    xMag: 0,
    yMag: 0,
  },

  testLED: {
    isOn: false,
  },

  _watched: {
    driveInput: ['controlIO'],
    testLED: ['controlIO'],
  },
  _type: 'source',
};

export const rceState = {
  rceCpu: undefined,
  rceMemory: undefined,
  camCpu: undefined,
  camMemory: undefined,
  _watched: {
  },
  _type: 'sink',
};

export const stores = {
  client,
  control,
  rceState,
};

/**
 * Mutate the store, optionally notifying listeners on specific socket channels of the change
 * NOTE: Mutating the store will automatically notify according to the `_watched` array in each store object
 * @param {String}                path      The path of the property to change
 * @param {Any}                   data      The new data
 * @param {Array/String/Function} notifyees Custom notification: the name of the socket channel to notify on, or an array of
 *                                          such names, or a callback function, or an array of callback functions or a mixed
 *                                          array of notifyees or callback functions :D
 */
export function set(path, data, notifyees) {
  // Record of notified
  const notified = [];

  // Record and mutate
  const baseDotIdx = path.indexOf('.');
  let dotIndex = 0;
  const base = path.slice(0, baseDotIdx);
  const key = path.slice(baseDotIdx + 1);

  const oldValue = objectPath.get(stores, path);
  objectPath.set(stores, path, data);

  while (dotIndex > -1) {
    const sub = key.slice(0, dotIndex || undefined);
    if (stores[base]._watched[sub]) {
      stores[base]._watched[sub].forEach((notifyee) => {
        // Handle all types
        if (typeof notifyee === 'function') {
          notifyee(data, oldValue, path);
        } else {
          notifyMutate(notifyee, base, path, oldValue, data);
          notified.push(notifyee);
        }
      });

      break;
    }

    dotIndex = key.indexOf('.', dotIndex + 1);
  }

  // Custom Notify
  if (notifyees) {
    // Handle all types
    if (typeof notifyees === 'string') {
      // One notifyee
      if (!notified.includes(notifyees)) {
        notifyMutate(notifyees, base, path, data, oldValue);
        notified.push(notifyees);
      }
    } else if (notifyees.constructor === Array) {
      // Multiple notifyees
      notifyees.forEach((notifyee) => {
        // Handle all types
        if (typeof notifyee === 'function') {
          notifyee(data, oldValue, path);
        } else if (!notified.includes(notifyee)) {
          // Do not notify more than once
          notifyMutate(notifyee, base, path, data, oldValue);
          notified.push(notifyee);
        }
      });
    } else if (typeof notifyees === 'function') {
      notifyees(data, oldValue, path);
    } else {
      log('Notifyee list is not a string nor an array');
    }
  }
}

// === Private ===
/**
 * Emit a notification of a mutation on a store property
 * @param  {String} notifyee  The socket on which to send the notification
 * @param  {String} storeName The name of the store concerned
 * @param  {String} path      The property path of the property that was mutated
 * @param  {any}    oldValue  The previous value
 * @param  {any}    newValue  The new value
 */
function notifyMutate(notifyee, storeName, path, oldValue, newValue) {
  // Construct message to send
  const message = {
    type: 'mutate',
    storeName,
    path,
    data: {
      oldValue,
      newValue,
    },
  };

  // Notify
  switch (notifyee) {
    case 'controlIO':
      controlIOClient.emit('data', message);
      break;
    case 'teleIO':
      teleIOClient.emit('data', message);
      break;
    default:
      log('Attempted notification failed, no such notifyee');
      break;
  }
}
