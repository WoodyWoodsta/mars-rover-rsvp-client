/* app-core.es6 */
import * as socket from './core/socket';
import * as kurentoIOClient from './core/clients/kurento-io-client';

socket.startSockets();

export { debug } from './core/utils/debug';
export {
  kurentoIOClient,
};
