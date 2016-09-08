/* rover-tele-progress-bubble.es6 */

Polymer({
  is: 'rover-tele-progress-bubble',
  properties: {
    value: {
      type: Number,
      value: 0,
    },

    unit: {
      type: String,
      value: '%',
    },
  },

  attached() {
    // Progress bubble startup hack
    setTimeout(() => {
      this.value = 1;
      this.value = 0;
    }, 1000);
  },
});
