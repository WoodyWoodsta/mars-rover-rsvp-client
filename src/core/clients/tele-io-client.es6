/* tele-io-client.es6 */
import debug from 'debug';

import SocketClient from 'socket.io-client';

import * as teleIOClientTranslator from './tele-io-client-translator';

const log = debug('rsvp-client:TeleIOClient');

export let teleIOClient;

export function init() {
  teleIOClient = new SocketClient(`${window.location.origin}/TeleIO`);
  attachCoreListeners(teleIOClient);
}

// === Private ===
function attachCoreListeners(io) {
  io.on('connect', () => {
    log('Connected to TeleIO Websocket');
    io.emit('test');

    attachTeleListeners(io);
  });
}


function attachTeleListeners(io) {
  io.on('test', () => {
    log('Received test message from TeleIO');
  });

  io.on('data', (message) => {
    teleIOClientTranslator.onData(message, 'data');
  });
}
