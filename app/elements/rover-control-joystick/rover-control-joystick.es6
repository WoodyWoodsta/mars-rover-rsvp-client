/* rover-control-joystick.es6 */
import { debug } from 'app-core';
const log = debug('rsvp-client:rover-control-joystick');

Polymer({
  is: 'rover-control-joystick',
  behaviors: [
    Polymer.IronResizableBehavior,
  ],

  properties: {
    /**
     * The position of the joystick relative to the pad
     */
    position: {
      type: Object,
      value: {
        x: 0,
        y: 0,
      },
      observer: '_onPositionChanged',
    },

    /**
     * The joystick control magnitudes
     */
    magnitudes: {
      type: Object,
      value: {
        x: 0,
        y: 0,
      },
      observer: '_onMagnitudesChanged',
    },

    /**
     * Name of the joystick (ie. what is it controlling?)
     */
    name: {
      type: String,
      value: 'Joystick',
    },

    /**
     * Whether or not the transitions are disabled for the joystick
     */
    transitionDisabled: {
      type: Boolean,
      value: true,
      reflectToAttribute: true,
    },

    /**
     * Whether or not the pad background should contain arrows
     */
    arrows: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
    },

    /**
     * Whether or not the joystick is active
     */
    active: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
    },

    // === Private ===
    _joystickWidth: {
      type: Number,
    },

    _joystickHeight: {
      type: Number,
    },

    _padWidth: {
      type: Number,
    },

    _padHeight: {
      type: Number,
    },

    _padX: {
      type: Number,
    },

    _padY: {
      type: Number,
    },

    _trackStartLeft: {
      type: Number,
    },

    _trackStartTop: {
      type: Number,
    },
  },

  observers: [
    '_onPosChanged(xPos, yPos)',
  ],

  listeners: {
    'joystickContainer.down': '_onJoystickContainerDown',
    'joystickContainer.up': '_onJoystickContainerUp',
    'joystickContainer.track': '_onJoystickContainerTrackReceive',
  },

  attached() {
    this._getJoystickDimensions();
    this._updatePadDimensions();
    this.returnToCenter();

    // Signal that the joystick is ready
    this.fire('rover-control-joystick-ready', {
      name: this.name,
    });

    // Attach to the resize listener when everything is configured
    this.listen(this, 'iron-resize', '_onIronResize');
  },

  detached() {
    // Unlisten to events
    this.unlisten(this, 'iron-resize', '_onIronResize');
  },

  /**
  * Change the position of the joystick
  * @param {Number}  x   The x position, in terms of the `left` CSS value
  * @param {Number}  y   The y position, in terms of the `top` CSS value
  */
  changePosition(x, y) {
    this.position = {
      x,
      y,
    };
  },

  /**
   * Change the joystick values in terms of magnitudes
   * @param {Number}  x   The x position, in terms of magnitude
   * @param {Number}  y   The y position, in terms of magnitude
   */
  changeMagnitudes(x, y) {
    this.magnitudes = {
      x,
      y,
    };
  },

  /**
   * Return the joystick to the center of the pad
   */
  returnToCenter() {
    const centerX = this._padWidth / 2;
    const centerY = this._padHeight / 2;

    // Prevent triggering the observers for no reason
    if (this.position.x !== centerX || this.position.x !== centerY) {
      this.changePosition(centerX, centerY);
    }
  },

  // === Private ===
  /**
   * Update the "usable space" dimensions
   */
  _updatePadDimensions() {
    const dims = this.$.joystickContainer.getBoundingClientRect();
    this._padWidth = dims.width;
    this._padHeight = dims.height;
    this._padX = dims.left;
    this._padY = dims.top;
  },

  /**
   * Get the dimensions of the "joystick" el
   */
  _getJoystickDimensions() {
    const dims = this.$.joystick.getBoundingClientRect();
    this._joystickWidth = dims.width;
    this._joystickHeight = dims.height;
  },

  /**
   * When the joystick receives the 'track' event
   */
  _onJoystickContainerTrackReceive(event) {
    switch (event.detail.state) {
      case 'start':
        this._onJoystickContainerDown(event);
        this.transitionDisabled = true;
        break;
      case 'track':
        this._onJoystickContainerTrack(event);
        break;
      case 'end':
        this.transitionDisabled = false;
        this._onJoystickContainerUp(event);
        break;
      default:
        log(`Track event '${event.detail.state}' not handled`);
        break;
    }
  },

  /**
  * When the joystick is pressed
  */
  _onJoystickContainerDown(event) {
    this.active = true;
    this._updatePadDimensions();
    this._trackStartLeft = event.detail.x - this._padX;
    this._trackStartTop = event.detail.y - this._padY;
    this.changePosition(this._trackStartLeft, this._trackStartTop);
  },

  /**
   * When the joystick is to track the pointer
   */
  _onJoystickContainerTrack(event) {
    this.changePosition(this._trackStartLeft + event.detail.dx, this._trackStartTop + event.detail.dy);
  },

  /**
   * When the joystick is unpressed
   */
  _onJoystickContainerUp() {
    this.active = false;
    this.returnToCenter();
  },

  /**
   * On change of position (top and left)
   */
  _onPositionChanged(value) {
    const limitXValue = (value.x > this._padWidth) ? this._padWidth : ((value.x < 0) ? 0 : value.x);
    const leftValue = limitXValue - (this._joystickWidth / 2) - 2;

    const limitYValue = (value.y > this._padHeight) ? this._padHeight : ((value.y < 0) ? 0 : value.y);
    const topValue = limitYValue - (this._joystickHeight / 2) - 2;

    this.changeMagnitudes({
      x: this._posToMagX(limitXValue),
      y: this._posToMagY(limitYValue)
    });
    this.$.joystick.style.left = `${leftValue}px`;
    this.$.joystick.style.top = `${topValue}px`;
  },

  /**
   * When the magnitudes value changes, notify outside elements
   */
  _onMagnitudesChanged(value) {
    this._fireNewMagnitudesEvent(value.x, value.y);
  },

  /**
   * Readjust the position of the joystick on resize (for flexible pad sizes + responsive layouting)
   */
  _onIronResize() {
    this._updatePadDimensions();
    this.returnToCenter();
  },

  /**
   * Fire a `press` event with the correct schema
   */
  _fireNewPressEvent(x, y) {
    this.fire('rover-control-joystick-tweak', {
      type: 'press',
      xMag: this._posToMagX(x),
      yMag: this._posToMagY(y),
    });
  },

  /**
   * Fire a `new-magnitudes` event with the correct schema
   */
  _fireNewMagnitudesEvent(mag) {
    this.fire('rover-control-joystick-tweak', {
      type: 'new-magnitudes',
      xMag: mag.x,
      yMag: mag.y,
    });
  },

  /**
   * Convert the left postion to a magnitude between -1 and 1
   * @return {Number} The magnitude within the bounds above
   */
  _posToMagX(x) {
    return ((x - (0.5 * this._padWidth)) / this._padWidth) * 2;
  },

  /**
   * Convert the top postion to a magnitude between -1 and 1
   * @return {Number} The magnitude within the bounds above
   */
  _posToMagY(y) {
    return ((y - (0.5 * this._padHeight)) / this._padHeight) * 2;
  },
});
