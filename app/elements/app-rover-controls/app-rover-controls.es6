/* app-rover-controls.es6 */

import { store } from 'app-core';

Polymer({
  is: 'app-rover-controls',

  listeners: {
    'driveJoystick.rover-control-joystick-tweak': '_onDriveJoystickTweak',
  },


  // === Private ===
  _onDriveJoystickTweak(event) {
    store.set('control.driveInput', { xMag: event.detail.xMag, yMag: event.detail.yMag });
  },
});
