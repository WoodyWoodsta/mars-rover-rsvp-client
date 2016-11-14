/* kurento-io-client.es6 */
/**
 * @author Sean Wood (WoodyWoodsta)
 */

/**
 * Manages the socket connection itself for the kurento media stream
 */
import debug from 'debug';
import SocketClient from 'socket.io-client';

const log = debug('rsvp-client:kurento-io-client');

// === Public ===
export const client = new SocketClient(`wss://${window.location.host}/KurentoIO`);

export function init(messageCallback) {
  attachCoreListeners(client, messageCallback);

  client.on('error', () => {
    log('A socket.io error ocurred');
  });

  return client;
}

// === Private ===
function attachCoreListeners(io, messageCallback) {
  io.on('message', messageCallback);
}
