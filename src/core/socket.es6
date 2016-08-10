/* socket.es6 */
/**
 * Manages the WebSocket connections between here and the server
 */

import { client } from './store';
import * as controlIOClient from './clients/control-io-client';
import * as teleIOClient from './clients/tele-io-client';

/**
 * Will start the socket connections
 * @return {[type]} [description]
 */
export function startSockets() {
  teleIOClient.init();
  controlIOClient.init();
}
