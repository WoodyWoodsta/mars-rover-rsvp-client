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
        label: 'FL Wheel',
        items: [
          {
            label: 'Angle',
            value: 0,
            unit: 'deg',
            icon: 'rsvp:angle',
          },
          {
            label: 'Velocity',
            value: 0,
            unit: '',
            icon: 'rsvp:velocity',
          },
        ],
      },
    },

    frontRightWheelData: {
      type: Object,
      value: {
        label: 'FR Wheel',
        items: [
          {
            label: 'Angle',
            value: 0,
            unit: 'deg',
            icon: 'rsvp:angle',
          },
          {
            label: 'Velocity',
            value: 0,
            unit: '',
            icon: 'rsvp:velocity',
          },
        ],
      },
    },

    rearLeftWheelData: {
      type: Object,
      value: {
        label: 'RL Wheel',
        items: [
          {
            label: 'Angle',
            value: 0,
            unit: 'deg',
            icon: 'rsvp:angle',
          },
          {
            label: 'Velocity',
            value: 0,
            unit: '',
            icon: 'rsvp:velocity',
          },
        ],
      },
    },

    rearRightWheelData: {
      type: Object,
      value: {
        label: 'RR Wheel',
        items: [
          {
            label: 'Angle',
            value: 0,
            unit: 'deg',
            icon: 'rsvp:angle',
          },
          {
            label: 'Velocity',
            value: 0,
            unit: '',
            icon: 'rsvp:velocity',
          },
        ],
      },
    },

    frontUsSensorData: {
      type: Object,
      value: {
        label: 'F Sensor',
        items: [
          {
            label: 'Distance',
            value: 0,
            unit: 'mm',
            icon: 'rsvp:distance',
          },
          {
            label: 'Warning',
            value: 'None',
            unit: '',
            icon: 'rsvp:warning',
          },
        ],
      },
    },

    rearUsSensorData: {
      type: Object,
      value: {
        label: 'R Sensor',
        items: [
          {
            label: 'Distance',
            value: 0,
            unit: 'mm',
            icon: 'rsvp:distance',
          },
          {
            label: 'Warning',
            value: 'None',
            unit: '',
            icon: 'rsvp:warning',
          },
        ],
      },
    },

    headData: {
      type: Object,
      value: {
        label: 'Head',
        items: [
          {
            label: 'Pan',
            value: 0,
            unit: 'deg',
            icon: 'rsvp:pan',
          },
          {
            label: 'Pitch',
            value: 0,
            unit: 'deg',
            icon: 'rsvp:pitch',
          },
          {
            label: 'Distance',
            value: 0,
            unit: 'mm',
            icon: 'rsvp:distance',
          },
        ],
      },
    },
  },

  attached() {
    store.client.on('mobile-changed', this._onClientMobileChanged, this);

    this.mobile = store.client.mobile;
  },

  detached() {
    store.client.removeListener('mobile-changed', this._onClientMobileChanged, this);
  },

  // === Private ===
  _onClientMobileChanged(event) {
    this.mobile = event.newValue;
  },
});
