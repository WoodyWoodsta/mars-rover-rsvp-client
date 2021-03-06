/* app-rover-overview.es6 */
/**
 * @author Sean Wood (WoodyWoodsta)
 */

import { store, round, teleIOClientTranslator } from 'app-core';

Polymer({
  is: 'app-rover-overview',

  properties: {
    mobile: {
      type: Boolean,
      reflectToAttribute: true,
      value: false,
    },

    lowGraphicsMode: {
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
    store.hardwareState.on('proximity.values-changed', this._onStoreProximityValuesChanged, this);
    store.hardwareState.on('proximity.warn-changed', this._onStoreProximityWarnChanged, this);

    store.client.on('lowGraphicsMode-changed', this._onLowGraphicsModeChanged, this);

    store.client.repush();
    teleIOClientTranslator.requestRepush('hardwareState', '*');

    this.mobile = store.client.mobile;
  },

  detached() {
    store.client.removeListener('mobile-changed', this._onClientMobileChanged, this);
    store.hardwareState.removeListener('servos.values-changed', this._onStoreServosChanged, this);
    store.hardwareState.removeListener('proximity.values-changed', this._onStoreProximityValuesChanged, this);

    store.client.removeListener('lowGraphicsMode-changed', this._onLowGraphicsModeChanged, this);
  },

  // === Private ===
  _onClientMobileChanged(event) {
    this.mobile = event.newValue;
  },

  _onStoreProximityValuesChanged(event) {
    // debugger;
    Object.keys(event.newValue).forEach((key) => {
      switch (key) {
        case 'front':
          this.set('frontUsSensorData.items.0.value', round(event.newValue[key], 2));
          this._updateFrontUsSensorValue(event.newValue[key]);
          break;
        case 'rear':
          this.set('rearUsSensorData.items.0.value', round(event.newValue[key], 2));
          this._updateRearUsSensorValue(event.newValue[key]);
          break;
        case 'head':
          this.set('headData.items.2.value', round(event.newValue[key], 2));
          this._updateHeadUsSensorValue(event.newValue[key]);
          break;
        default:
          console.log(`Proximity change property '${key}' not recognised`);
          break;
      }
    });
  },

  _onStoreProximityWarnChanged(event) {
    Object.keys(event.newValue).forEach((key) => {
      switch (key) {
        case 'front':
          this.set('frontUsSensorData.items.1.value', event.newValue[key]);
          this._updateFrontUsSensorWarn(event.newValue[key]);
          break;
        case 'rear':
          this.set('rearUsSensorData.items.1.value', event.newValue[key]);
          this._updateRearUsSensorWarn(event.newValue[key]);
          break;
        case 'head':
          this.set('headUsSensorData.items.1.value', event.newValue[key]);
          break;
        default:
          console.log(`Proximity change property '${key}' not recognised`);
          break;
      }
    });
  },

  _onStoreServosChanged(event) {
    Object.keys(event.newValue).forEach((key) => {
      switch (key) {
        case 'driveFrontLeft':
          this.set('frontLeftWheelData.items.1.value', round(event.newValue[key], 2));
          this._updateDriveFrontLeft(event.newValue[key]);

          break;
        case 'driveFrontRight':
          this.set('frontRightWheelData.items.1.value', round(event.newValue[key], 2));
          this._updateDriveFrontRight(event.newValue[key]);

          break;
        case 'driveRearLeft':
          this.set('rearLeftWheelData.items.1.value', round(event.newValue[key], 2));
          this._updateDriveRearLeft(event.newValue[key]);

          break;
        case 'driveRearRight':
          this.set('rearRightWheelData.items.1.value', round(event.newValue[key], 2));
          this._updateDriveRearRight(event.newValue[key]);

          break;
        case 'steerFrontLeft':
          this.set('frontLeftWheelData.items.0.value', round(event.newValue[key], 2));
          this._updateSteerFrontLeft(event.newValue[key]);

          break;
        case 'steerFrontRight':
          this.set('frontRightWheelData.items.0.value', round(event.newValue[key], 2));
          this._updateSteerFrontRight(event.newValue[key]);

          break;
        case 'steerRearLeft':
          this.set('rearLeftWheelData.items.0.value', round(event.newValue[key], 2));
          this._updateSteerRearLeft(event.newValue[key]);

          break;
        case 'steerRearRight':
          this.set('rearRightWheelData.items.0.value', round(event.newValue[key], 2));
          this._updateSteerRearRight(event.newValue[key]);

          break;
        case 'headPan':
          this.set('headData.items.0.value', round(event.newValue[key], 2));
          this._updateHeadPan(event.newValue[key]);

          break;
        case 'headPitch':
          this.set('headData.items.1.value', round(event.newValue[key], 2));
          this._updateHeadPitch(event.newValue[key]);

          break;
        default:
          console.log(`Servo change property '${key}' not recognised`);
          break;
      }
    });
  },

  _onLowGraphicsModeChanged(event) {
    this.lowGraphicsMode = event.newValue;
  },

  _updateDriveFrontLeft(value) {
    this.$.wheelFrontLeftVelocityFill.style.fill = this._resolveFillColor(value);
    this.$.wheelFrontLeftVelocityFill.setAttribute('height', Math.abs(value * 69));
  },

  _updateDriveFrontRight(value) {
    this.$.wheelFrontRightVelocityFill.style.fill = this._resolveFillColor(value);
    this.$.wheelFrontRightVelocityFill.setAttribute('height', Math.abs(value * 69));
  },

  _updateDriveRearLeft(value) {
    this.$.wheelRearLeftVelocityFill.style.fill = this._resolveFillColor(value);
    this.$.wheelRearLeftVelocityFill.setAttribute('height', Math.abs(value * 69));
  },

  _updateDriveRearRight(value) {
    this.$.wheelRearRightVelocityFill.style.fill = this._resolveFillColor(value);
    this.$.wheelRearRightVelocityFill.setAttribute('height', Math.abs(value * 69));
  },

  _updateSteerFrontLeft(value) {
    this.$.wheelFrontLeft.style.transform = `translate(40px, 25px) rotate(${value}deg)`;
  },

  _updateSteerFrontRight(value) {
    this.$.wheelFrontRight.style.transform = `translate(450px, 25px) rotate(${value}deg)`;
  },

  _updateSteerRearLeft(value) {
    this.$.wheelRearLeft.style.transform = `translate(40px, 330px) rotate(${value}deg)`;
  },

  _updateSteerRearRight(value) {
    this.$.wheelRearRight.style.transform = `translate(450px, 330px) rotate(${value}deg)`;
  },

  _updateHeadPan(value) {
    this.$.head.style.transform = `translate(325px, 100px) rotate(${value}deg)`;
  },

  _updateHeadPitch(value) {

  },

  _updateFrontUsSensorValue(value) {
    this.$.usSensorFrontFill.style.fillOpacity = 1 - (value / 200);
  },

  _updateRearUsSensorValue(value) {
    this.$.usSensorRearFill.style.fillOpacity = 1 - (value / 200);
  },

  _updateFrontUsSensorWarn(value) {
    this.$.usSensorFront.setAttribute('warn', value);
  },

  _updateRearUsSensorWarn(value) {
    this.$.usSensorRear.setAttribute('warn', value);
  },

  _resolveFillColor(value) {
    return (value < 0) ? '#C62828' : '#2E7D32';
  },
});
