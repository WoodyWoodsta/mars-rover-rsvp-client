/* app-rover-controls.es6 */

import { store } from 'app-core';

Polymer({
  is: 'app-rover-controls',

  listeners: {
    'driveJoystick.rover-control-joystick-tweak': '_onDriveJoystickTweak',
    'pointUpButton.down': '_onPointUpButtonDown',
    'pointUpButton.up' : '_onPointUpButtonUp'
  },


  // === Private ===
  _onDriveJoystickTweak(event) {
    store.set('control.driveInput', { xMag: event.detail.xMag, yMag: event.detail.yMag });
  },

  _onPointUpButtonDown() {
    store.set('control.testLED.isOn', true);
    console.log('Button is pressed');
  },

  _onPointUpButtonUp() {
    store.set('control.testLED.isOn', false);
    console.log('Button is not pressed');
  },
});
