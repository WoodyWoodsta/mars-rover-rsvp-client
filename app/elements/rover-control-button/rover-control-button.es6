/* rover-control-button.es6 */

Polymer({
  is: 'rover-control-button',

  behaviors: [
    Polymer.IronButtonState,
  ],

  properties: {
    /**
     * The icon, if any, to place on the button
     */
    icon: {
      type: String,
      value: undefined,
    },

    /**
     * The tooltip, if any, to include with the button
     */
    toolTip: {
      type: String,
      value: undefined,
    },

    /**
     * The tooltip position
     */
    toolTipPosition: {
      type: String,
      value: 'top',
    },
  },
});
