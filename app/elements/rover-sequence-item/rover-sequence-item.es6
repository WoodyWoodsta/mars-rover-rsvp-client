/* rover-sequence-item.es6 */

Polymer({
  is: 'rover-sequence-item',

  properties: {
    data: {
      type: Object,
    },

    // === Private ===
    _icon: {
      type: String,
      value: 'rsvp:directions-run',
    },

    _cmdParamArray: {
      type: Array,
      computed: '_computeCmdParamArray(data)',
    },
  },

  // === Private ===
  _computeCmdParamArray(newValue) {
    return Object.keys(newValue.params).map(val => newValue.params[val]);
  },
});
