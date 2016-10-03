/* app-core.es6 */
import * as socket from './core/socket';
import * as kurentoIOClient from './core/clients/kurento-io-client';
import * as store from './core/store';
import * as controlIOClientTranslator from './core/clients/control-io-client-translator';
import * as teleIOClientTranslator from './core/clients/tele-io-client-translator';

socket.startSockets();

export { debug } from './core/utils/debug';
export { round } from './core/utils/round';
export {
  kurentoIOClient,
  store,
  controlIOClientTranslator,
  teleIOClientTranslator,
};
