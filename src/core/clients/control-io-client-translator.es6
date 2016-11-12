/* control-io-translator.es6 */
import debug from 'debug';

import * as store from '../store';
import * as controlIOClient from './control-io-client';

const log = debug('rsvp-client:control-io-client-translator');

// === Incoming ===
export function onData(message, event) {
  switch (message.storeName) {
    case 'rceState':
      if (event === 'data') {
        store.rceState.receiveData(message.fullPath, message.path, message.data.newValue);
      }
      break;
    default:
      log(`Storename '${message.storeName}' is not recognised`);
  }
}

// === Outgoing ===
export function sendSequence(sequence) {
  controlIOClient.sendPost('upload-sequence', sequence);
}

export function sendPlaybackSequenceSignal() {
  controlIOClient.sendPost('playback-sequence');
}

export function updateTrims(trims) {
  controlIOClient.sendPost('update-trims', trims);
}

export function requestSaveTrims() {
  controlIOClient.sendRequest('save-trims');
}

export function updateIpAddress(ip) {
  controlIOClient.sendPost('change-ip-address', ip);
}

export function restartServer() {
  controlIOClient.sendPost('restart-server');
}

export function requestRepush(storeName, path, notifyees = []) {
  controlIOClient.sendRequest('repush', { storeName, path, notifyees });
}
