/* app-rover-controls.es6 */

import { store } from 'app-core';

Polymer({
  is: 'app-rover-controls',

  listeners: {
    'driveJoystick.rover-control-joystick-tweak': '_onDriveJoystickTweak',
    'pointUpButton.down': '_onPointUpButtonDown',
    'pointUpButton.up': '_onPointUpButtonUp',
  },

  resetControls() {
    this.$.driveJoystick.resetController();
  },

  // === Private ===
  _onDriveJoystickTweak(event) {
    store.control.set('driveInput', { xMag: event.detail.xMag, yMag: event.detail.yMag });
  },

  _onPointUpButtonDown() {
    store.control.set('testLED.isOn', true);
  },

  _onPointUpButtonUp() {
    store.control.set('testLED.isOn', false);
  },
});
