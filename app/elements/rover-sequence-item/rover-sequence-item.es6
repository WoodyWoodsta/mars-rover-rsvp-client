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
  },
});
