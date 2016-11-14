/* app-rover-controls.es6 */
/**
 * @author Sean Wood (WoodyWoodsta)
 */

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
    'centerHeadButton.tap': '_onCenterHeadButtonTap',
    'rotateCCWButton.down': '_onRotateCCWButtonDown',
    'rotateCWButton.down': '_onRotateCWButtonDown',
    'rotateCCWButton.up': '_onRotateCCWButtonUp',
    'rotateCWButton.up': '_onRotateCWButtonUp',
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

  _onClientMobileChanged(event) {
    this.mobile = event.newValue;
  },

  _onRotateCCWButtonDown() {
    store.control.set('buttons.rotateCCW', true);
  },

  _onRotateCWButtonDown() {
    store.control.set('buttons.rotateCW', true);
  },

  _onRotateCCWButtonUp() {
    store.control.set('buttons.rotateCCW', false);
  },

  _onRotateCWButtonUp() {
    store.control.set('buttons.rotateCW', false);
  },
});
