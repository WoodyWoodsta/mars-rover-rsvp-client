/* tele-io-client-translator.es6 */
/**
 * @author Sean Wood (WoodyWoodsta)
 */

import debug from 'debug';

import * as store from '../store';
import * as teleIOClient from './tele-io-client';

const log = debug('rsvp-client:tele-io-client-translator');

// === Incoming ===
export function onData(message, event) {
  if (event === 'data') {
    switch (message.storeName) {
      case 'rceState':
        store.rceState.receiveData(message.fullPath, message.path, message.data.newValue);
        break;
      case 'server':
        store.server.receiveData(message.fullPath, message.path, message.data.newValue);
        break;
      case 'hardwareState':
        store.hardwareState.receiveData(message.fullPath, message.path, message.data.newValue);
        break;
      default:
        log(`Storename '${message.storeName}' is not recognised`);
    }
  }
}

export function requestRepush(storeName, path, notifyees = []) {
  teleIOClient.sendRequest('repush', { storeName, path, notifyees });
}
