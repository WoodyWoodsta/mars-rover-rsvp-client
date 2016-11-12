/* app-stream-container.es6 */

import { kurentoBehavior } from 'app-behaviors';
import { store } from 'app-core';

Polymer({
  is: 'app-stream-container',

  listeners: {
    'video.playing': '_onVideoPlaying',
  },

  attached() {
    // Expose the video element to the Kurento framework
    kurentoBehavior.setVideo(this.$.video);

    store.client.on('streamLive-changed', this._onStreamLiveChanged, this);
  },

  detached() {
    store.client.removeListener('streamLive-changed', this._onStreamLiveChanged, this);
  },

  // === Private ===
  _onStreamLiveChanged(event) {
    if (event.newValue) {
      this.$.loadingContainer.setAttribute('hidden', '');
    } else {
      this.$.loadingContainer.removeAttribute('hidden');
    }
  },

  _onVideoPlaying() {
    store.rceState.set('streamLive', true);
  },
});
