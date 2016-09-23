/* app-rover-overview.es6 */

import { store } from 'app-core';

Polymer({
  is: 'app-rover-overview',

  properties: {
    mobile: {
      type: Boolean,
      reflectToAttribute: true,
      value: false,
    },
  },

  attached() {
    store.client.on('mobile-changed', this._onClientMobileChanged.bind(this));

    this.mobile = store.client.mobile;
  },

  detached() {
    store.client.removeListener('mobile-changed', this._onClientMobileChanged.bind(this));
  },

  // === Private ===
  _onClientMobileChanged(event) {
    this.mobile = event.newValue;
  },
});
