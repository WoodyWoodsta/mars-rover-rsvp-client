/* socket.es6 */
/**
 * @author Sean Wood (WoodyWoodsta)
 */

/**
 * Manages the WebSocket connections between here and the server
 */
import * as controlIOClient from './clients/control-io-client';
import * as teleIOClient from './clients/tele-io-client';

/**
 * Will start the socket connections
 */
export function startSockets() {
  teleIOClient.init();
  controlIOClient.init();
}
