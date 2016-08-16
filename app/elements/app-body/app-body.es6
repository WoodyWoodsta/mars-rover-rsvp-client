/* app-body.es6 */

import { kurentoBehavior } from 'app-behaviors';

Polymer({
  is: 'app-body',

  attached() {
    kurentoBehavior.setVideo(this.$.video);
  },
});
