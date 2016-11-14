/* app-rover-diagnostics-dialog.es6 */
/**
 * @author Sean Wood (WoodyWoodsta)
 */

import { store } from 'app-core';

Polymer({
  is: 'app-rover-diagnostics-dialog',

  properties: {
    running: {
      type: Boolean,
      value: false,
    },

    status: {
      type: String,
      value: '',
    },
  },

  attached() {
    store.rceState.on('selfDiagnostics.running-changed', this._onSelfDiagnosticsRunningChanged, this);
    store.rceState.on('selfDiagnostics.status-changed', this._onSelfDiagnosticsStatusChanged, this);
  },

  detached() {
    store.rceState.on('selfDiagnostics.running-changed', this._onSelfDiagnosticsRunningChanged, this);
    store.rceState.on('selfDiagnostics.status-changed', this._onSelfDiagnosticsStatusChanged, this);
  },

  // === Private ===
  _onSelfDiagnosticsRunningChanged(event) {
    if (event.newValue) {
      this.status = 'Starting self-diagnostics sequence...';
      this.$.dialog.open();
    } else {
      this.status = 'Complete!';
    }

    this.running = event.newValue;
  },

  _onSelfDiagnosticsStatusChanged(event) {
    this.status = event.newValue;
  },
});
