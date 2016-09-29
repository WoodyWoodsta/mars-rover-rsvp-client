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

    controlType: {
      type: String,
      value: '',
    },

    mobile: {
      type: Boolean,
      value: false,
    },

    streamCombine: {
      type: Boolean,
      computed: '_computeStreamCombine(mobile, controlType)',
      observer: '_onStreamCombineChanged',
    },

  },

  listeners: {
    'iron-select': '_onIronSelect',
  },

  attached() {
    store.client.on('control.type-changed', this._onControlTypeChanged, this);
    store.client.on('mobile-changed', this._onClientMobileChanged, this);

    this.controlType = store.client.control.type;
    this.mobile = store.client.mobile;
  },

  detached() {
    store.client.removeListener('control.type-changed', this._onControlTypeChanged, this);
    store.client.removeListener('mobile-changed', this._onClientMobileChanged, this);
  },

  // === Private ===
  _onControlTypeChanged(event) {
    this.set('controlType', event.newValue);

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

  _onClientMobileChanged(event) {
    // this.mobile = event.newValue;
    this.set('mobile', event.newValue);
  },

  _computeStreamCombine(mobile, controlType) {
    return (mobile && controlType === 'interactive');
  },

  _onStreamCombineChanged(newValue) {
    if (newValue) {
      this._streamToTabs();
    } else {
      this._streamToSide();
    }
  },

  _streamToTabs() {
    this.$.telemetryContainer.appendChild(this.$.streamContainer);
    this.$.telemetryContainer.setAttribute('contains-stream', true);
  },

  _streamToSide() {
    this.$.upperContainer.insertBefore(this.$.streamContainer, this.$.telemetryContainer);
    this.$.telemetryContainer.removeAttribute('contains-stream');
  },

  _onIronSelect(event) {
    if (event.detail.item === this.$.controlsSection) {
      this.$.controls.resetControls();
    }
  },
});
