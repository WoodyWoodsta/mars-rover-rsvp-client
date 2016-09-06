/* app-stream-container.es6 */

import { kurentoBehavior } from 'app-behaviors';

Polymer({
  is: 'app-stream-container',

  attached() {
    // Expose the video element to the Kurento framework
    kurentoBehavior.setVideo(this.$.video);
  },
});
