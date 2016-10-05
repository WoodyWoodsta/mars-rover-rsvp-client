/* app-offline-overlay.es6 */

import { store, teleIOClientTranslator } from 'app-core';

Polymer({
  is: 'app-offline-overlay',

  properties: {
    loadingTextVisible: {
      type: Boolean,
      value: true,
    },

    roverTextVisible: {
      type: Boolean,
      value: true,
    },

    serverTextVisible: {
      type: Boolean,
      value: true,
    },

    showing: {
      type: Boolean,
      observer: '_onShowingChanged',
      computed: '_computeShowing(roverTextVisible, serverTextVisible, loadingTextVisible)',
    },
  },

  attached() {
    store.server.on('rover.isOnline-changed', this._serverRoverIsOnlineChanged, this);
    store.client.on('teleIOClient.connected-changed', this._serverTeleIOClientConnectedChanged, this);

    store.server.repush();
    store.client.repush();
  },

  detached() {
    store.server.removeListener('rover.isOnline-changed', this._serverRoverIsOnlineChanged, this);
    store.client.removeListener('teleIOClient.connected-changed', this._serverTeleIOClientConnectedChanged, this);
  },

  // === Private ===
  _serverRoverIsOnlineChanged(event) {
    if (event.newValue && !this.serverTextVisible && this.loadingTextVisible) {
      this.loadingTextVisible = false;
    }

    this.roverTextVisible = !event.newValue;
  },

  _serverTeleIOClientConnectedChanged(event) {
    if (event.newValue && !this.roverTextVisible && this.loadingTextVisible) {
      this.loadingTextVisible = false;
    }

    this.serverTextVisible = !event.newValue;
  },

  _onShowingChanged(newValue) {
    if (newValue) {
      this.$.backdrop.open();
    } else {
      this.$.backdrop.close();
    }
  },

  _computeShowing(roverTextVisible, serverTextVisible, loadingTextVisible) {
    return roverTextVisible || serverTextVisible || loadingTextVisible;
  },
});
