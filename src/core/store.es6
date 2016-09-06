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
 * @member  {String}  type          The type of client ['viewer'|'controller']
 * @member  {String}  controlLevel  The level of control that the client has in this session ['none'|'control'|'admin']
 */
export const client = {
  type: 'controller',
  controlLevel: 'none',

  _watched: {
    test: ['controlIO', 'teleIO'],
  },
};

export const control = {
  driveInput: {
    xMag: 0,
    yMag: 0,
  },

  _watched: {
    driveInput: ['controlIO'],
  },
};

export const store = {
  client,
  control,
};

/**
 * Mutate the store, optionally notifying listeners on specific socket channels of the change
 * NOTE: Mutating the store will automatically notify according to the `_watched` array in each store object
 * @param {String}        path      The path of the property to change
 * @param {Any}           data      The new data
 * @param {Array/String}  notifyees Custom notification: the name of the socket channel to notify on, or an array of such names
 */
export function set(path, data, notifyees) {
  // Record of notified
  const notified = [];

  // Record and mutate
  const baseDotIdx = path.indexOf('.');
  let dotIndex = 0;
  const base = path.slice(0, baseDotIdx);
  const key = path.slice(baseDotIdx + 1);

  const oldValue = objectPath.get(store, path);
  objectPath.set(store, path, data);

  while (dotIndex > -1) {
    const sub = key.slice(0, dotIndex || undefined);
    if (store[base]._watched[sub]) {
      store[base]._watched[sub].forEach((notifyee) => {
        notifyMutate(notifyee, path, oldValue, data);
        notified.push(notifyee);
        // log(`Notified ${notifyee}`);
      });

      break;
    }

    dotIndex = key.indexOf('.', dotIndex + 1);
  }

  // Custom Notify
  if (notifyees) {
    if (typeof notifyees === 'string') {
      // One notifyee
      if (!notified.includes(notifyees)) {
        notifyMutate(notifyees, path, oldValue, data);
        notified.push(notifyees);
      }
    } else if (notifyees.constructor === Array) {
      // Multiple notifyees
      notifyees.forEach((notifyee) => {
        // Do not notify more than once
        if (!notified.includes(notifyee)) {
          notifyMutate(notifyee, path, oldValue, data);
          notified.push(notifyee);
        }
      });
    } else {
      log('Notifyee list is not a string nor an array');
    }
  }
}

// === Private ===
/**
 * Emit a notification of a mutation on a store property
 * @param  {String} notifyee The socket on which to send the notification
 * @param  {String} path     The property path of the property that was mutated
 * @param  {any}    oldValue The previous value
 * @param  {any}    newValue The new value
 */
function notifyMutate(notifyee, path, oldValue, newValue) {
  // Construct message to send
  const message = {
    type: 'mutate',
    data: {
      path,
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
