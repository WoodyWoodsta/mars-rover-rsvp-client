/* app-body.es6 */
import { store } from 'app-core';

Polymer({
  is: 'app-body',

  properties: {
    controlPageSelected: {
      type: Number,
      value: (() => {
        switch (store.client.control.type) {
          case 'interactive':
            return 0;
          case 'rose':
            return 1;
          default:
            return 0;
        }
      })(),
    },
  },

  listeners: {
    'iron-select': '_onIronSelect',
  },

  attached() {
    store.client.on('control.type-changed', this._onControlTypeChanged.bind(this));
  },

  detached() {
    store.client.removeListener('control.type-changed', this._onControlTypeChanged.bind(this));
  },

  // === Private ===
  _onControlTypeChanged(event) {
    switch (event.newValue) {
      case 'interactive':
        this.controlPageSelected = 0;
        break;
      case 'rose':
        this.controlPageSelected = 1;
        break;
      default:
        this.controlPageSelected = 0;
    }

    return this.controlPageSelected;
  },

  _onIronSelect(event) {
    if (event.detail.item === this.$.controlsSection) {
      this.$.controls.resetControls();
    }
  },
});
