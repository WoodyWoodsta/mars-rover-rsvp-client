/* app-rover-controls.es6 */

import { store } from 'app-core';

Polymer({
  is: 'app-rover-controls',

  properties: {
    mobile: {
      type: Boolean,
      value: false,
    },
  },

  listeners: {
    'driveJoystick.rover-control-joystick-tweak': '_onDriveJoystickTweak',
    'pointUpButton.down': '_onPointUpButtonDown',
    'pointUpButton.up': '_onPointUpButtonUp',
  },

  attached() {
    store.client.on('mobile-changed', this._onClientMobileChanged, this);

    this.mobile = store.client.mobile;
  },

  detached() {
    store.client.removeListener('mobile-changed', this._onClientMobileChanged, this);
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

  _onClientMobileChanged(event) {
    this.mobile = event.newValue;
  },
});
