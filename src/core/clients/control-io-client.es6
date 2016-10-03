/* control-io-client.es6 */
import debug from 'debug';

import SocketClient from 'socket.io-client';

const log = debug('rsvp-client:control-io-client');
let listenersAttached = false;

export let controlIOClient;

export function init() {
  controlIOClient = new SocketClient(`${window.location.origin}/ControlIO`);
  attachCoreListeners(controlIOClient);

  controlIOClient.on('error', () => {
    log('A socket.io error ocurred');
  });
}

export function sendPost(type, payload) {
  controlIOClient.emit('post', { type, payload });
}

export function sendRequest(type, payload) {
  controlIOClient.emit('request', { type, payload });
}

// === Private ===
function attachCoreListeners(io) {
  io.on('connect', () => {
    log('Connected to ControlIO Websocket');
    io.emit('test');

    if (!listenersAttached) {
      attachControlListeners(io);
    }
  });

  io.on('test', () => {
    log('Received test message from ControlIO');
  });

  io.emit('data', 'hello');
}

function attachControlListeners(io) {
  listenersAttached = true;
}
