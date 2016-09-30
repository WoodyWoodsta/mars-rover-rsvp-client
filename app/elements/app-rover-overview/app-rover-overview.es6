/* app-rover-overview.es6 */

import { store, round } from 'app-core';

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
            unit: '°',
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
            unit: '°',
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
            unit: '°',
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
            unit: '°',
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
            unit: '°',
            icon: 'rsvp:pan',
          },
          {
            label: 'Pitch',
            value: 0,
            unit: '°',
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
    store.hardwareState.on('servos.values-changed', this._onStoreServosChanged, this);

    this.mobile = store.client.mobile;
  },

  detached() {
    store.client.removeListener('mobile-changed', this._onClientMobileChanged, this);
    store.hardwareState.removeListener('servos.values-changed', this._onStoreServosChanged, this);
  },

  // === Private ===
  _onClientMobileChanged(event) {
    this.mobile = event.newValue;
  },

  _onStoreServosChanged(event) {
    if (event.path !== 'servos.values') {
      return console.log(`Servo change path '${event.path}' not recognised`);
    }

    Object.keys(event.newValue).forEach((key) => {
      switch (key) {
        case 'driveFrontLeft':
          this.set('frontLeftWheelData.items.1.value', round(event.newValue[key], 2));
          break;
        case 'driveFrontRight':
          this.set('frontRightWheelData.items.1.value', round(event.newValue[key], 2));

          break;
        case 'driveRearLeft':
          this.set('rearLeftWheelData.items.1.value', round(event.newValue[key], 2));

          break;
        case 'driveRearRight':
          this.set('rearRightWheelData.items.1.value', round(event.newValue[key], 2));

          break;
        case 'steerFrontLeft':
          this.set('frontLeftWheelData.items.0.value', round(event.newValue[key], 2));

          break;
        case 'steerFrontRight':
          this.set('frontRightWheelData.items.0.value', round(event.newValue[key], 2));

          break;
        case 'steerRearLeft':
          this.set('rearLeftWheelData.items.0.value', round(event.newValue[key], 2));

          break;
        case 'steerRearRight':
          this.set('rearRightWheelData.items.0.value', round(event.newValue[key], 2));

          break;
        case 'headPan':
          this.set('headData.items.0.value', round(event.newValue[key], 2));

          break;
        case 'headPitch':
          this.set('headData.items.1.value', round(event.newValue[key], 2));

          break;
        default:
          console.log(`Servo change property '${key}' not recognised`);
          break;
      }
    });
  },
});
