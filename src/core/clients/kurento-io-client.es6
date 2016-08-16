/* kurento-io-client.es6 */
import debug from 'debug';
import SocketClient from 'socket.io-client';

const log = debug('rsvp-client:kurento-io-client');

export const client = new SocketClient(`wss://${window.location.host}/KurentoIO`);

export function init(kurentoBehavior) {
  attachCoreListeners(client, kurentoBehavior);

  client.on('error', () => {
    log('A socket.io error ocurred');
  });

  return client;
}

function attachCoreListeners(io, kurentoBehavior) {
  io.on('message', (message) => {
    log('Received a message');

    const parsedMessage = JSON.parse(message);
    log(`Received message: ${message}`);

    switch (parsedMessage.id) {
      case 'presenterResponse':
        kurentoBehavior.presenterResponse(parsedMessage);
        break;
      case 'viewerResponse':
        kurentoBehavior.viewerResponse(parsedMessage);
        break;
      case 'stopCommunication':
        kurentoBehavior.dispose();
        break;
      case 'iceCandidate':
        kurentoBehavior.getWebRtcPeer().addIceCandidate(parsedMessage.candidate);
        break;
      default:
        log(`Error, unrecognized message: ${parsedMessage}`);
    }
  });
}
