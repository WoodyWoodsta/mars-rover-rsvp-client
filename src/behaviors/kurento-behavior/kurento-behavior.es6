/* kurento-behavior.es6 */
import debug from 'debug';
import { kurentoIOClient } from 'app-core';

const log = debug('rsvp-client: kurento-behavior');

let video = null;
let webRtcPeer = null;

// TODO: Sort this mess out
const ws = kurentoIOClient.init({
  getVideo,
  getWebRtcPeer,
  presenterResponse,
  viewerResponse,
  dispose,
});

export function getVideo() {
  return video;
}

export function setVideo(inputVideo) {
  video = inputVideo;
}

export function getWebRtcPeer() {
  return webRtcPeer;
}

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

function onOfferPresenter(error, offerSdp) {
  if (error) return onError(error);

  const message = {
    id: 'presenter',
    sdpOffer: offerSdp,
  };

  sendMessage(message);
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

export function stop() {
  if (webRtcPeer) {
    const message = {
      id: 'stop',
    };

    sendMessage(message);
    dispose();
  }
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

// function showSpinner() {
//   for (let i = 0; i < arguments.length; i++) {
//     arguments[i].poster = './img/transparent-1px.png';
//     arguments[i].style.background = 'center transparent url("./img/spinner.gif") no-repeat';
//   }
// }

// function hideSpinner() {
//   for (var i = 0; i < arguments.length; i++) {
//     arguments[i].src = '';
//     arguments[i].poster = './img/webrtc.png';
//     arguments[i].style.background = '';
//   }
// }

function _onBeforeUnloadCallback() {
  ws.close();
}

window.onbeforeunload = _onBeforeUnloadCallback;
