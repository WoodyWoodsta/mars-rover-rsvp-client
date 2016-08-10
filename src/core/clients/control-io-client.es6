/* control-io-client.es6 */
import debug from 'debug';

import SocketClient from 'socket.io-client';

const log = debug('rsvp-client:control-io-client');

export function init() {
  const controlIOClient = new SocketClient(`${window.location.origin}/ControlIO`);
  attachCoreListeners(controlIOClient);

  controlIOClient.on('error', () => {
    log('A socket.io error ocurred');
  })
}

// === Private ===
function attachCoreListeners(io) {
  io.on('connect', () => {
    log('Connected to ControlIO Websocket');
    io.emit('test');

    attachControlListeners(io);
  });

  io.on('test', () => {
    log('Received test message from ControlIO');
  });
}

function attachControlListeners(io) {

}
