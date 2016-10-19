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
    'headJoystick.rover-control-joystick-tweak': '_onHeadJoystickTweak',
    'snapshotButton.tap': '_onSnapshotButtonTap',
    'centerHeadButton.tap': '_onCenterHeadButtonTap',
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

  _onHeadJoystickTweak(event) {
    store.control.set('headInput', { xMag: event.detail.xMag, yMag: event.detail.yMag });
  },

  _onCenterHeadButtonTap() {
    this.$.headJoystick.returnToCenter();
  },

  _onSnapshotButtonTap() {
    console.log('Snapshot!');
  },

  _onClientMobileChanged(event) {
    this.mobile = event.newValue;
  },
});
