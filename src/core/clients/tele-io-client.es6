/* tele-io-client.es6 */
/**
 * @author Sean Wood (WoodyWoodsta)
 */

import debug from 'debug';

import SocketClient from 'socket.io-client';

import * as teleIOClientTranslator from './tele-io-client-translator';
import * as store from '../store';

const log = debug('rsvp-client:TeleIOClient');
let listenersAttached = false;

export let teleIOClient;

export function init() {
  teleIOClient = new SocketClient(`${window.location.origin}/TeleIO`);
  attachCoreListeners(teleIOClient);
}

export function sendRequest(type, payload) {
  teleIOClient.emit('request', { type, payload });
}

// === Private ===
function attachCoreListeners(io) {
  io.on('connect', () => {
    log('Connected to TeleIO Websocket');
    io.emit('test');

    if (!listenersAttached) {
      attachTeleListeners(io);
    }

    store.client.set('teleIOClient.connected', true);
  });

  io.on('connect_error', () => {
    store.client.set('teleIOClient.connected', false);
  });
}


function attachTeleListeners(io) {
  io.on('test', () => {
    log('Received test message from TeleIO');
  });

  io.on('data', (message) => {
    teleIOClientTranslator.onData(message, 'data');
  });

  listenersAttached = true;
}
