/* app-telemetry-container.es6 */

import { store, teleIOClientTranslator } from 'app-core';
import { toastBehavior } from 'app-behaviors';

Polymer({
  is: 'app-telemetry-container',

  properties: {
    states: {
      type: Array,
      value: [
        {
          state: 'Undefined',
          description: 'System State',
          positivity: false,
        },
        {
          state: 'Offline',
          description: 'Board System',
          positivity: false,
        },
        {
          state: 'Offline',
          description: 'Analog Input System',
          positivity: false,
        },
        {
          state: 'Offline',
          description: 'Camera System',
          positivity: false,
        },
        {
          state: 'Offline',
          description: 'LED System',
          positivity: false,
        },
        {
          state: 'Offline',
          description: 'Ultrasonic System',
          positivity: false,
        },
        {
          state: 'Offline',
          description: 'Servo System',
          positivity: false,
        },
      ],
    },

    selected: {
      type: String,
      value: 'rce-system-page',
    },

    mobile: {
      type: Boolean,
      value: false,
    },
  },

  listeners: {
    'iron-select': '_onIronSelect',
  },

  attached() {
    this.selected = 'rce-system-page';
    this._setupBindings();

    this.mobile = store.client.mobile;
  },

  detached() {
    this._removeBindings();
  },

  // === Private ===
  _setupBindings() {
    store.rceState.on('rceCpu-changed', this._onRceCpuChanged, this);
    store.rceState.on('rceMemory-changed', this._onRceMemChanged, this);
    store.rceState.on('camCpu-changed', this._onCamCpuChanged, this);
    store.rceState.on('camMemory-changed', this._onCamMemChanged, this);
    store.rceState.on('systemState-changed', this._onSystemStateChanged, this);

    store.hardwareState.on('board.initialised-changed', this._onBoardInitialisedChanged, this);
    store.hardwareState.on('analog.initialised-changed', this._onAnalogInitialisedChanged, this);
    store.hardwareState.on('camera.running-changed', this._onCameraRunningChanged, this);
    store.hardwareState.on('leds.initialised-changed', this._onLedsInitialisedChanged, this);
    store.hardwareState.on('proximity.initialised-changed', this._onProximityInitialisedChanged, this);
    store.hardwareState.on('servos.initialised-changed', this._onServosInitialisedChanged, this);
    store.hardwareState.on('analog.values.battery-changed', this._onAnalogBatteryChanged, this);
    store.hardwareState.on('analog.warnings.battery-changed', this._onAnalogBatteryWarningChanged, this);

    teleIOClientTranslator.requestRepush('rceState', '*');
    teleIOClientTranslator.requestRepush('hardwareState', '*');

    store.client.on('mobile-changed', this._onClientMobileChanged, this);
  },

  _removeBindings() {
    store.rceState.removeListener('rceCpu-changed', this._onRceCpuChanged, this);
    store.rceState.removeListener('rceMemory-changed', this._onRceMemChanged, this);
    store.rceState.removeListener('camCpu-changed', this._onCamCpuChanged, this);
    store.rceState.removeListener('camMemory-changed', this._onCamMemChanged, this);
    store.rceState.removeListener('systemState-changed', this._onSystemStateChanged, this);

    store.hardwareState.removeListener('board.initialised-changed', this._onBoardInitialisedChanged, this);
    store.hardwareState.removeListener('analog.initialised-changed', this._onAnalogInitialisedChanged, this);
    store.hardwareState.removeListener('camera.running-changed', this._onCameraRunningChanged, this);
    store.hardwareState.removeListener('leds.initialised-changed', this._onLedsInitialisedChanged, this);
    store.hardwareState.removeListener('proximity.initialised-changed', this._onProximityInitialisedChanged, this);
    store.hardwareState.removeListener('servos.initialised-changed', this._onServosInitialisedChanged, this);
    store.hardwareState.removeListener('analog.values.battery-changed', this._onAnalogBatteryChanged, this);
    store.hardwareState.removeListener('analog.warnings.battery-changed', this._onAnalogBatteryWarningChanged, this);

    store.client.removeListener('mobile-changed', this._onClientMobileChanged, this);
  },

  _onRceCpuChanged(event) {
    this.$.rceCpuBubble.value = Math.round(event.newValue * 100) / 100;
  },

  _onRceMemChanged(event) {
    this.$.rceMemBubble.value = Math.round(event.newValue * 100) / 100;
  },

  _onCamCpuChanged(event) {
    this.$.camCpuBubble.value = Math.round(event.newValue * 100) / 100;
  },

  _onCamMemChanged(event) {
    this.$.camMemBubble.value = Math.round(event.newValue * 100) / 100;
  },

  _onSystemStateChanged(event) {
    let state;

    switch (event.newValue) {
      case 'normal':
        state = 'Normal';
        break;
      case 'obstacle':
        state = 'Obstacle Detected';
        break;
      case 'emergency-shutdown':
        state = 'Emergency Shutdown';
        break;
      default:
        state = 'Undefined';
        break;
    }

    this._setHardwareState(0, state, (state === 'Normal'));
  },

  _onBoardInitialisedChanged(event) {
    const state = (event.newValue) ? 'Online' : 'Offline';
    this._setHardwareState(1, state, event.newValue);
  },

  _onAnalogInitialisedChanged(event) {
    const state = (event.newValue) ? 'Online' : 'Offline';
    this._setHardwareState(2, state, event.newValue);
  },

  _onCameraRunningChanged(event) {
    const state = (event.newValue) ? 'Online' : 'Offline';
    this._setHardwareState(3, state, event.newValue);
  },

  _onLedsInitialisedChanged(event) {
    const state = (event.newValue) ? 'Online' : 'Offline';
    this._setHardwareState(4, state, event.newValue);
  },

  _onProximityInitialisedChanged(event) {
    const state = (event.newValue) ? 'Online' : 'Offline';
    this._setHardwareState(5, state, event.newValue);
  },

  _onServosInitialisedChanged(event) {
    const state = (event.newValue) ? 'Online' : 'Offline';
    this._setHardwareState(6, state, event.newValue);
  },

  _onClientMobileChanged(event) {
    this.mobile = event.newValue;
  },

  _onAnalogBatteryChanged(event) {
    this.$.batteryVoltageBubble.value = Math.round(event.newValue * 100) / 100;
  },

  _onAnalogBatteryWarningChanged(event) {
    switch (event.newValue) {
      case 'low':
        toastBehavior.displayPersistentMessage('Warning: Low RCE battery voltage');
        break;
      case 'critical':
        toastBehavior.displayPersistentMessage('Warning: Critical RCE battery voltage!');
        break;
      default:
        break;

    }
  },

  _setHardwareState(index, state, positivity) {
    this.set(`states.${index}.state`, state);
    this.set(`states.${index}.positivity`, positivity);
  },

  _onIronSelect(event) {
    if (event.detail.item.getAttribute('page') === 'rce-system-page') {
      this.$.rceCpuBubble.value = Math.round((store.rceState.rceCpu + 1) * 100) / 100;
      this.$.rceMemBubble.value = Math.round((store.rceState.rceMemory + 1) * 100) / 100;
      this.$.camCpuBubble.value = Math.round((store.rceState.camCpu + 1) * 100) / 100;
      this.$.camMemBubble.value = Math.round((store.rceState.camMemory + 1) * 100) / 100;

      this.$.rceCpuBubble.value = Math.round(store.rceState.rceCpu * 100) / 100;
      this.$.rceMemBubble.value = Math.round(store.rceState.rceMemory * 100) / 100;
      this.$.camCpuBubble.value = Math.round(store.rceState.camCpu * 100) / 100;
      this.$.camMemBubble.value = Math.round(store.rceState.camMemory * 100) / 100;
    }
  },
});
