/* control-io-translator.es6 */
import debug from 'debug';

import * as store from '../store';

const log = debug('rsvp-client:control-io-client-translator');

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
