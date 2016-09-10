/* app-state-row.es6 */

Polymer({
  is: 'app-state-row',
  properties: {
    positivity: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
    },

    description: {
      type: String,
      value: '',
    },

    state: {
      type: String,
      value: '',
    },

    icon: {
      type: String,
      computed: '_computeIcon(positivity)',
    },
  },


  // === Private ===
  _computeIcon(value) {
    return (value) ? 'rsvp:radio-button-checked' : 'rsvp:radio-button-unchecked';
  },
});
