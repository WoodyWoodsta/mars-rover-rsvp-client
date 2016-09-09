/* store.es6 */
/**
 * Client data model including state. Operates on a data-driven model in terms of socket notifications
 */
import debug from 'debug';
import objectPath from 'object-path';
import { EventEmitter } from 'events';

import { controlIOClient } from './clients/control-io-client';
import { teleIOClient } from './clients/tele-io-client';

const log = debug('rsvp-client:store');

/**
 * A store of data which allows declarative and imperative subscriptions to data changes as well as emits notifications of changes
 * to available and specified web sockets
 * @param {String}  name    The name of the data store. Is required to be the name of the `DataStore` instance
 * @param {String}  type    The primary direction of flow of data
 * @param {Object}  fields  The data fields to store
 * @param {Object}  watched An array of socket channel names or callback functions for specific data paths
 */
class DataStore extends EventEmitter {
  constructor(name, type = 'sink', fields = {}, watched = {}) {
    super();

    // Copy in fields
    Object.assign(this, fields);
    this.name = name;
    this._type = type;
    this._watched = watched;

    this._createAutoListeners();
  }

  /**
   * Mutate the store, optionally notifying listeners on specific socket channels of the change
   * The mutation will also fire events pertaining to the path of the change and will do so for every node along the path tree,
   * downwards from the root.
   * NOTE: Mutating the store will automatically notify sockets as in notifyees
   * @param {String}                path      The path of the property to change, relative to this `DataStore`
   * @param {Any}                   data      The new data
   * @param {Array/String/Function} notifyees Custom notification: the name of the socket channel to notify on, or an array of
   *                                          such names, or a callback function, or an array of callback functions or a mixed
   *                                          array of notifyees or callback functions :D
   */
  set(path, data, notifyees = []) {
    // Keep track of who is notified to prevent event duplication
    const notified = [];

    let dotIndex = 0;

    // Copy old data and mutat
    let oldValue = {};
    objectPath.set(oldValue, path, objectPath.set(this, path, data));

    // Copy new data
    let newValue = {};
    objectPath.set(newValue, path, data);

    // Emit notifications
    while (dotIndex > -1) {
      const sub = path.slice(0, dotIndex || undefined);
      this.emit(`${sub}-changed`, { path, newValue: objectPath.get(newValue, sub), oldValue: objectPath.get(oldValue, sub) });

      if (this._watched[sub]) {
        notified.push(sub);
      }

      dotIndex = path.indexOf('.', dotIndex + 1);
    }

    // Custom notify based on passed in `notifyees`. Will not duplicate
    if (notifyees) {
      customNotify(notified, this.name, path, data, oldValue, notifyees);
    }
  }

  _createAutoListeners() {
    Object.keys(this._watched).forEach((watchKey) => {
      if (this._watched[watchKey].length !== 0) {
        // Only listen if there are watchers in the array
        this.on(`${watchKey}-changed`, function onChanged(message) {
          setTimeout(() => {
            customNotify([], this.name, message.path, message.newValue, message.oldValue, this._watched[watchKey]);
          }, 0);
        });
      }
    });
  }
}

/**
 * Store for the RCE state and telemetry
 * @member {Number} rceCpu    The percentage CPU usage taken up by the RCE Node process
 * @member {Number} rceMemory The percentage of physically available memory taken up by the RCE Node process
 * @member {Number} camCpu    The percentage CPU usage taken up by the cam process
 * @member {Number} camMemory The percentage of physically available memory taken up by the cam process
 */
export const rceState = new DataStore('rceState', 'sink', {
  rceCpu: undefined,
  rceMemory: undefined,
  camCpu: undefined,
  camMemory: undefined,
}, {
  rceCpu: [],
  rceMemory: [],
  camCpu: [],
  camMemory: [],
});

/**
 * Store for data relating to the client that is currently in session (viewer)
 * @member {String} type          The type of client ['viewer'|'controller']
 * @member {String} controlLevel  The level of control that the client has in this session ['none'|'control'|'admin']
 */
export const client = new DataStore('client', 'source', {
  type: 'controller',
  controlLevel: 'none',
});

/**
 * Store for the control input
 * @member {Object} driveInput  The input values from the drive joystick
 * @member {Object} testLED     The state of the test LED
 */
export const control = new DataStore('control', 'source', {
  driveInput: {
    xMag: 0,
    yMag: 0,
  },

  testLED: {
    isOn: false,
  },
}, {
  driveInput: ['controlIO'],
  testLED: ['controlIO'],
});

/**
 * Store for the server state data
 * @member {Object} controlIOClients  Of the clients connected to the controlIO socket
 * @member {Object} teleIOClients     Of the clients connected to the teleIO socket
 * @member {Object} rover             Of the rover
 */
export const server = new DataStore('server', 'sink', {
  controlIOClients: {
    number: 0,
  },

  teleIOClients: {
    number: 0,
  },

  rover: {
    isOnline: false,
  },
});

/**
 * Store for the hardware state data
 * @member {Object} board     Data related to the `johnny-five` board
 * @member {Object} analog    Data related to the analog inputs
 * @member {Object} camera    Data related to the camera
 * @member {Object} leds      Data related to the LEDs
 * @member {Object} proximity Data related to the proximity sensors
 * @member {Object} servos    Data related to the servo motors
 */
export const hardwareState = new DataStore('hardwareState', 'sink', {
  board: {
    initialised: false,
  },
  analog: {
    initialised: false,
  },
  camera: {
    initialised: false,
    running: false,
  },
  leds: {
    initialised: false,
  },
  proximity: {
    initialised: false,
  },
  servos: {
    initialised: false,
  },
});

export const stores = {
  hardwareState,
  server,
  client,
  control,
  rceState,
};

// === Private ===
function customNotify(notified, name, path, data, oldValue, notifyees) {
  // Handle all types
  if (typeof notifyees === 'string') {
    // One notifyee
    if (!notified.includes(notifyees)) {
      notifyMutate(notifyees, name, path, data, oldValue);
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
        notifyMutate(notifyee, name, path, data, oldValue);
        notified.push(notifyee);
      }
    });
  } else if (typeof notifyees === 'function') {
    notifyees(data, oldValue, path);
  } else {
    log('Notifyee list is not a string nor an array');
  }
}

/**
 * Emit a notification of a mutation on a store property
 * @param  {String} notifyee  The socket on which to send the notification
 * @param  {String} storeName The name of the store concerned
 * @param  {String} path      The property path of the property that was mutated
 * @param  {any}    oldValue  The previous value
 * @param  {any}    newValue  The new value
 */
function notifyMutate(notifyee, storeName, path, newValue, oldValue) {
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
      log(`Attempted notification failed on ${notifyee}, no such notifyee`);
      break;
  }
}
