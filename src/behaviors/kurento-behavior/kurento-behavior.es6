/* kurento-behavior.es6 */
/**
 * @author Sean Wood (WoodyWoodsta)
 */

/**
 * Exposes video streaming functionality to the browser
 */
import debug from 'debug';
import { kurentoIOClient, store } from 'app-core';

const log = debug('rsvp-client: kurento-behavior');

let video = null;
let webRtcPeer = null;

// Create the websocket
const ws = kurentoIOClient.init((message) => {
  log('Received a message');

  const parsedMessage = JSON.parse(message);
  log(`Received message: ${message}`);

  switch (parsedMessage.id) {
    case 'viewerResponse':
      viewerResponse(parsedMessage);
      break;
    case 'stopCommunication':
      dispose();
      break;
    case 'iceCandidate':
      webRtcPeer.addIceCandidate(parsedMessage.candidate);
      break;
    default:
      log(`Error, unrecognized message: ${parsedMessage}`);
  }
});

// === Public ===
/**
 * Indicate to kurento the target video endpoint element
 * @param {Elm} inputVideo The video element which is the endpoint target
 */
export function setVideo(inputVideo) {
  video = inputVideo;
}

/**
 * Initiate a viewer call/connection with the server
 */
export function viewer() {
  if (!webRtcPeer) {
    log('Viewer - Loading peer video...');

    const options = {
      remoteVideo: video,
      onicecandidate: onIceCandidate,
    };

    webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function callback(error) {
      if (error) return onError(error);

      this.generateOffer(onOfferViewer);
    });
  }
}

/**
 * Stop the current call/connection
 */
export function stop() {
  if (webRtcPeer) {
    const message = {
      id: 'stop',
    };

    sendMessage(message);
    dispose();
  }
}

// === Private ===
/**
 * Handle the response generated by the server during a viewer session call
 * @param  {Object} message The response message object
 */
function viewerResponse(message) {
  if (message.response !== 'accepted') {
    const errorMsg = message.message ? message.message : 'Unknow error';
    log(`Call not accepted for the following reason: ${errorMsg}`);
    dispose();
  } else {
    webRtcPeer.processAnswer(message.sdpAnswer);
  }
}

/**
 * Handle an offer generated by the server
 * @param  {Object} error    The error, if applicable
 * @param  {Object} offerSdp The offer
 */
function onOfferViewer(error, offerSdp) {
  if (error) return onError(error);

  const message = {
    id: 'viewer',
    sdpOffer: offerSdp,
  };

  sendMessage(message);
}

/**
 * Handle an incomming ICE candidate
 * @param  {Object} candidate The ICE candidate
 */
function onIceCandidate(candidate) {
  log(`Local candidate ${JSON.stringify(candidate)}`);

  const message = {
    id: 'onIceCandidate',
    candidate,
  };

  sendMessage(message);
}

/**
 * Get rid of the connection
 */
function dispose() {
  log('Disposing of or cancelling WebRTC Peer');
  if (webRtcPeer) {
    webRtcPeer.dispose();
    webRtcPeer = null;
  }

  store.client.set('streamLive', false);
}

/**
 * Send a message via the websocket
 * @param  {Object} message The message
 */
function sendMessage(message) {
  const jsonMessage = JSON.stringify(message);
  log(`Senging message: ${jsonMessage}`);
  ws.send(jsonMessage);
}

/**
 * Close the webrtc connection before the window unloads
 */
function _onBeforeUnloadCallback() {
  ws.close();
}

window.onbeforeunload = _onBeforeUnloadCallback;
