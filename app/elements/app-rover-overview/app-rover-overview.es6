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

    frontLeftWheelData: {
      type: Object,
      value: {
        label: '',
        items: [
          {
            label: 'Angle',
            value: 0,
            unit: 'deg',
          },
          {
            label: 'Velocity',
            value: 0,
            unit: '',
          },
        ],
      },
    },

    frontRightWheelData: {
      type: Object,
      value: {
        label: '',
        items: [
          {
            label: 'Angle',
            value: 0,
            unit: 'deg',
          },
          {
            label: 'Velocity',
            value: 0,
            unit: '',
          },
        ],
      },
    },

    rearLeftWheelData: {
      type: Object,
      value: {
        label: '',
        items: [
          {
            label: 'Angle',
            value: 0,
            unit: 'deg',
          },
          {
            label: 'Velocity',
            value: 0,
            unit: '',
          },
        ],
      },
    },

    rearRightWheelData: {
      type: Object,
      value: {
        label: '',
        items: [
          {
            label: 'Angle',
            value: 0,
            unit: 'deg',
          },
          {
            label: 'Velocity',
            value: 0,
            unit: '',
          },
        ],
      },
    },

    frontUsSensorData: {
      type: Object,
      value: {
        label: '',
        items: [
          {
            label: 'Distance',
            value: 0,
            unit: 'mm',
          },
          {
            label: 'Warning',
            value: 'None',
            unit: '',
          },
        ],
      },
    },

    rearUsSensorData: {
      type: Object,
      value: {
        label: '',
        items: [
          {
            label: 'Distance',
            value: 0,
            unit: 'mm',
          },
          {
            label: 'Warning',
            value: 'None',
            unit: '',
          },
        ],
      },
    },

    headData: {
      type: Object,
      value: {
        label: '',
        items: [
          {
            label: 'Pan',
            value: 0,
            unit: 'deg',
          },
          {
            label: 'Pitch',
            value: 0,
            unit: 'deg',
          },
          {
            label: 'Distance',
            value: 0,
            unit: 'mm',
          },
        ],
      },
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
