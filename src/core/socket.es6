/* socket.es6 */
/**
 * Manages the WebSocket connections between here and the server
 */
import * as controlIOClient from './clients/control-io-client';
import * as teleIOClient from './clients/tele-io-client';

import { store, set } from './store';

/**
 * Will start the socket connections
 * @return {[type]} [description]
 */
export function startSockets() {
  teleIOClient.init();
  controlIOClient.init();

  set('client.test', 'hello');
}
