/* tele-io-client-translator.es6 */
import debug from 'debug';

import * as store from '../store';

const log = debug('rsvp-client:tele-io-client-translator');

export function onData(message, event) {
  if (event === 'data') {
    switch (message.storeName) {
      case 'rceState':
        store.rceState.set(message.path, message.data.newValue);
        break;
      case 'server':
        store.server.set(message.path, message.data.newValue);
        break;
      default:
        log(`Storename '${message.storeName}' is not recognised`);
    }
  }
}
