/* app-telemetry-container.es6 */

import { store } from 'app-core';

Polymer({
  is: 'app-telemetry-container',

  attached() {
    this._setupBindings();
  },

  // === Private ===

  _setupBindings() {
    store.rceState._watched.rceCpu.push((newValue) => { this._onRceCpuChanged(newValue); });
    store.rceState._watched.rceMemory.push((newValue) => { this._onRceMemChanged(newValue); });
    store.rceState._watched.camCpu.push((newValue) => { this._onCamCpuChanged(newValue); });
    store.rceState._watched.camMemory.push((newValue) => { this._onCamMemChanged(newValue); });
  },

  _onRceCpuChanged(newValue) {
    this.$.rceCpuBubble.value = newValue;
  },

  _onRceMemChanged(newValue) {
    this.$.rceMemBubble.value = newValue;
  },

  _onCamCpuChanged(newValue) {
    this.$.camCpuBubble.value = newValue;
  },

  _onCamMemChanged(newValue) {
    this.$.camMemBubble.value = newValue;
  },
});
