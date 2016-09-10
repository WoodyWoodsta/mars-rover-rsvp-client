/* app-telemetry-container.es6 */

import { store } from 'app-core';

Polymer({
  is: 'app-telemetry-container',

  listeners: {
    'iron-select': '_onIronSelect',
  },

  attached() {
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

    store.hardwareState.on('analog.initialised-changed', this._onAnalogChanged.bind(this));
  },

  _removeBindings() {
    store.rceState.removeListener('rceCpu-changed', this._onRceCpuChanged.bind(this));
    store.rceState.removeListener('rceMemory-changed', this._onRceMemChanged.bind(this));
    store.rceState.removeListener('camCpu-changed', this._onCamCpuChanged.bind(this));
    store.rceState.removeListener('camMemory-changed', this._onCamMemChanged.bind(this));

    store.hardwareState.removeListener('analog.initialised-changed', this._onAnalogChanged.bind(this));
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

  _onAnalogChanged(event) {
    console.log('Analog changed!');
    console.log(event.newValue);
    this.$.toast.show('Analog has changed!');
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
