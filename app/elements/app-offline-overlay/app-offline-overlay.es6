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
      reflectToAttribute: true,
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
  /**
   * Hide or show the rover not online text based on rover online state
   * @param {Object}  event The property change event
   */
  _serverRoverIsOnlineChanged(event) {
    if (event.newValue && !this.serverTextVisible && this.loadingTextVisible) {
      this.loadingTextVisible = false;
    }

    this.roverTextVisible = !event.newValue;
  },

  /**
   * Hide or show the server disconnected text based on tele-io client state
   * @param {Object}  event The property change event
   */
  _serverTeleIOClientConnectedChanged(event) {
    if (event.newValue && !this.roverTextVisible && this.loadingTextVisible) {
      this.loadingTextVisible = false;
    }

    this.serverTextVisible = !event.newValue;
  },

  /**
   * Make the necessary UI changes based on whether or not the overlay should be shown
   * @param {Boolean} newValue  The new value
   */
  _onShowingChanged(newValue) {
    if (newValue) {
      this.hidden = false;
      this.$.backdrop.open();
    } else {
      this.$.backdrop.close();

      // HACK: Hide the element after the animation is complete
      setTimeout(() => {
        this.hidden = true;
      }, 150);
    }
  },

  /**
   * Decide whether or not the overlay should be shown
   */
  _computeShowing(roverTextVisible, serverTextVisible, loadingTextVisible) {
    // return roverTextVisible || serverTextVisible || loadingTextVisible;
    return false;
  },
});
