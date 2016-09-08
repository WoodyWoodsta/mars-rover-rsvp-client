/* app-telemetry-container.es6 */

import { store } from 'app-core';

Polymer({
  is: 'app-telemetry-container',

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
    store.rceState.on('rceCpu-changed', this._onRceCpuChanged.bind(this));
    store.rceState.on('rceMemory-changed', this._onRceMemChanged.bind(this));
  },

  _removeBindings() {
    store.rceState.removeListener('rceCpu-changed', this._onRceCpuChanged.bind(this));
    store.rceState.removeListener('rceMemory-changed', this._onRceMemChanged.bind(this));
    store.rceState.removeListener('rceCpu-changed', this._onRceCpuChanged.bind(this));
    store.rceState.removeListener('rceMemory-changed', this._onRceMemChanged.bind(this));
  },

  _onRceCpuChanged(event) {
    this.$.rceCpuBubble.value = event.newValue;
  },

  _onRceMemChanged(event) {
    this.$.rceMemBubble.value = event.newValue;
  },

  _onCamCpuChanged(newValue) {
    this.$.camCpuBubble.value = newValue;
  },

  _onCamMemChanged(newValue) {
    this.$.camMemBubble.value = newValue;
  },
});
