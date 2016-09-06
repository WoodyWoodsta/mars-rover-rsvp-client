/* tele-io-client.es6 */
import debug from 'debug';

import SocketClient from 'socket.io-client';
// import { client } from '../store';

const log = debug('rsvp-client:TeleIOClient');

export let teleIOClient;

export function init() {
  teleIOClient = new SocketClient(`${window.location.origin}/TeleIO`);
  attachCoreListeners(teleIOClient);
}

// === Private ===
function attachCoreListeners(io) {
  io.on('connect', () => {
    // TODO: use the correct data mutation method
    // client.teleIO.connected = true;
    log('Connected to TeleIO Websocket');
    io.emit('test');

    attachTeleListeners(io);
  });
}


function attachTeleListeners(io) {
  io.on('test', () => {
    log('Received test message from TeleIO');
  });

  io.on('servos', (data) => {
    // Do some translation of this info
  });

  io.on('proximity', (data) => {
    // Do some translation of this info
  });

  io.on('battery', (data) => {
    // Do some translation of this info
  });
}
