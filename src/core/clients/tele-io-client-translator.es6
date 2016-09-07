/* tele-io-client-translator.es6 */
import debug from 'debug';

import * as store from '../store';

const log = debug('rsvp-client:tele-io-client-translator');

export function onData(message, event) {
  switch (message.storeName) {
    case 'rceState':
      if (event === 'data') {
        store.set(message.path, message.data.newValue);
      }
      break;
    default:
      log(`Storename '${message.storeName}' is not recognised`);
  }
}
