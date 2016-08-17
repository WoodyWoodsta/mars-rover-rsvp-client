/* kurento-behavior.es6 */
/**
 * Exposes video streaming functionality to the browser
 */
import debug from 'debug';
import { kurentoIOClient } from 'app-core';

const log = debug('rsvp-client: kurento-behavior');

let video = null;
let webRtcPeer = null;

const ws = kurentoIOClient.init((message) => {
  log('Received a message');

  const parsedMessage = JSON.parse(message);
  log(`Received message: ${message}`);

  switch (parsedMessage.id) {
    case 'presenterResponse':
      presenterResponse(parsedMessage);
      break;
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

function _onBeforeUnloadCallback() {
  ws.close();
}

window.onbeforeunload = _onBeforeUnloadCallback;

// === Public ===
export function setVideo(inputVideo) {
  video = inputVideo;
}

export function presenter() {
  if (!webRtcPeer) {
    log('Presenter - Loading peer video...');

    const options = {
      localVideo: video,
      onicecandidate: onIceCandidate,
    };

    webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function callback(error) {
      if (error) return onError(error);

      this.generateOffer(onOfferPresenter);
    });
  }
}

export function viewer() {
  if (!webRtcPeer) {
    // showSpinner(video);
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
function presenterResponse(message) {
  if (message.response !== 'accepted') {
    const errorMsg = message.message ? message.message : 'Unknow error';
    log(`Call not accepted for the following reason: ${errorMsg}`);
    dispose();
  } else {
    webRtcPeer.processAnswer(message.sdpAnswer);
  }
}

function viewerResponse(message) {
  if (message.response !== 'accepted') {
    const errorMsg = message.message ? message.message : 'Unknow error';
    log(`Call not accepted for the following reason: ${errorMsg}`);
    dispose();
  } else {
    webRtcPeer.processAnswer(message.sdpAnswer);
  }
}

function onOfferPresenter(error, offerSdp) {
  if (error) return onError(error);

  const message = {
    id: 'presenter',
    sdpOffer: offerSdp,
  };

  sendMessage(message);
}

function onOfferViewer(error, offerSdp) {
  if (error) return onError(error);

  const message = {
    id: 'viewer',
    sdpOffer: offerSdp,
  };

  sendMessage(message);
}

function onIceCandidate(candidate) {
  log(`Local candidate ${JSON.stringify(candidate)}`);

  const message = {
    id: 'onIceCandidate',
    candidate,
  };

  sendMessage(message);
}

function dispose() {
  if (webRtcPeer) {
    webRtcPeer.dispose();
    webRtcPeer = null;
  }

  // hideSpinner(video);
  log('Disposing of or cancelling WebRTC Peer');
}

function sendMessage(message) {
  const jsonMessage = JSON.stringify(message);
  log(`Senging message: ${jsonMessage}`);
  ws.send(jsonMessage);
}