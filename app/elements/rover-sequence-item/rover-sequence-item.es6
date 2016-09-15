/* rover-sequence-item.es6 */

Polymer({
  is: 'rover-sequence-item',

  properties: {
    data: {
      type: Object,
    },

    index: {
      type: Number,
    },

    // === Private ===
    _icon: {
      type: String,
      computed: '_computeCmdIcon(data)',
    },

    _cmdParamArray: {
      type: Array,
      computed: '_computeCmdParamArray(data)',
    },
  },

  // === Private ===
  _computeCmdIcon(newValue) {
    switch (newValue.type) {
      case 'low':
        return 'rsvp:remove-from-queue';
      case 'high':
        return 'rsvp:dvr';
      case 'macro':
        return 'rsvp:subscriptions';
      default:
    }
  },

  _computeCmdParamArray(newValue) {
    return Object.keys(newValue.params).map(val => newValue.params[val]);
  },

  _onDeleteTap() {
    this.fire('rover-sequence-item-delete', { index: this.index });
  },

  _onEditTap() {
    this.fire('rover-sequence-item-edit', { index: this.index });
  },
});
