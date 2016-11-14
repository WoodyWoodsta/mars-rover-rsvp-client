/* app-trims-dialog.es6 */
/**
 * @author Sean Wood (WoodyWoodsta)
 */

import { store, controlIOClientTranslator } from 'app-core';

Polymer({
  is: 'app-trims-dialog',

  properties: {
    trims: {
      type: Object,
      value: {},
    },
  },

  listeners: {
    'updateButton.tap': '_onUpdateButtonTap',
    'saveButton.tap': '_onSaveButtonTap',
  },

  attached() {
    this.trims = store.hardwareState.trims.servos;

    store.hardwareState.on('trims.servos-changed', this._onServoTrimsChanged, this);
  },

  detatched() {
    store.hardwareState.removeListener('trims.servos-changed', this._onServoTrimsChanged, this);
  },

  open() {
    this.$.trimsDialog.open();
  },

  close() {
    this.$.trimsDialog.close();
  },

  // === Private ===
  _onServoTrimsChanged(event) {
    this.trims = event.newValue;
  },

  _onUpdateButtonTap() {
    controlIOClientTranslator.updateTrims(this.trims);
  },

  _onSaveButtonTap() {
    controlIOClientTranslator.requestSaveTrims();
  },
});
