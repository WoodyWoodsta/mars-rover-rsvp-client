/* app-telemetry-container.es6 */

import { store } from 'app-core';

Polymer({
  is: 'app-telemetry-container',

  properties: {
    states: {
      type: Array,
      value: [
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
  },

  listeners: {
    'iron-select': '_onIronSelect',
  },

  attached() {
    this.selected = 'rce-system-page';
    this._setupBindings();
  },

  detached() {
    this._removeBindings();
  },

  // === Private ===

  _setupBindings() {
    store.rceState.on('rceCpu-changed', this._onRceCpuChanged.bind(this));
    store.rceState.on('rceMemory-changed', this._onRceMemChanged.bind(this));
    store.rceState.on('camCpu-changed', this._onCamCpuChanged.bind(this));
    store.rceState.on('camMemory-changed', this._onCamMemChanged.bind(this));

    store.hardwareState.on('board.initialised-changed', this._onBoardInitialisedChanged.bind(this));
    store.hardwareState.on('analog.initialised-changed', this._onAnalogInitialisedChanged.bind(this));
    store.hardwareState.on('camera.running-changed', this._onCameraRunningChanged.bind(this));
    store.hardwareState.on('leds.initialised-changed', this._onLedsInitialisedChanged.bind(this));
    store.hardwareState.on('proximity.initialised-changed', this._onProximityInitialisedChanged.bind(this));
    store.hardwareState.on('servos.initialised-changed', this._onServosInitialisedChanged.bind(this));

    // store.hardwareState.on('servos.values.driveFrontLeft-changed', (event) => {
    //   // console.log(event.newValue);
    // });
  },

  _removeBindings() {
    store.rceState.removeListener('rceCpu-changed', this._onRceCpuChanged.bind(this));
    store.rceState.removeListener('rceMemory-changed', this._onRceMemChanged.bind(this));
    store.rceState.removeListener('camCpu-changed', this._onCamCpuChanged.bind(this));
    store.rceState.removeListener('camMemory-changed', this._onCamMemChanged.bind(this));

    store.hardwareState.removeListener('board.initialised-changed', this._onBoardInitialisedChanged.bind(this));
    store.hardwareState.removeListener('analog.initialised-changed', this._onAnalogInitialisedChanged.bind(this));
    store.hardwareState.removeListener('camera.running-changed', this._onCameraRunningChanged.bind(this));
    store.hardwareState.removeListener('leds.initialised-changed', this._onLedsInitialisedChanged.bind(this));
    store.hardwareState.removeListener('proximity.initialised-changed', this._onProximityInitialisedChanged.bind(this));
    store.hardwareState.removeListener('servos.initialised-changed', this._onServosInitialisedChanged.bind(this));
  },

  _onRceCpuChanged(event) {
    console.log('CPU: ', event.oldValue, event.newValue);
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

  _onBoardInitialisedChanged(event) {
    const state = (event.newValue) ? 'Online' : 'Offline';
    this._setHardwareState(0, state, event.newValue);
  },

  _onAnalogInitialisedChanged(event) {
    const state = (event.newValue) ? 'Online' : 'Offline';
    this._setHardwareState(1, state, event.newValue);
  },

  _onCameraRunningChanged(event) {
    const state = (event.newValue) ? 'Online' : 'Offline';
    this._setHardwareState(2, state, event.newValue);
  },

  _onLedsInitialisedChanged(event) {
    const state = (event.newValue) ? 'Online' : 'Offline';
    this._setHardwareState(3, state, event.newValue);
  },

  _onProximityInitialisedChanged(event) {
    const state = (event.newValue) ? 'Online' : 'Offline';
    this._setHardwareState(4, state, event.newValue);
  },

  _onServosInitialisedChanged(event) {
    const state = (event.newValue) ? 'Online' : 'Offline';
    this._setHardwareState(5, state, event.newValue);
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
