/* app-shell.es6 */

Polymer({
  is: 'app-shell',

  properties: {
    /**
     * Whether or not the side bar is full or narrow
     */
    isExpanded: {
      type: Boolean,
      reflectToAttribute: true,
      value: false,
    },

    // === Private ===
  },

  listeners: {
    'drawerWrapper.mouseenter': '_onDrawerWrapperMouseenter',
    'drawerWrapper.mouseleave': '_onDrawerWrapperMouseleave',
  },

  // === Private ===
  /**
   * When the mouse enters the area depicted by the drawer wrapper
   */
  _onDrawerWrapperMouseenter() {
    if (!this.isExpanded && !this.$.layout.narrow) {
      this.isExpanded = true;
      this.$.appDrawer.customStyle['--app-drawer-width'] = '256px';
      this.updateStyles();
    }
  },

  /**
   * When the mouse leaves the area depicted by the drawer wrapper
   */
  _onDrawerWrapperMouseleave() {
    if (this.isExpanded && !this.$.layout.narrow) {
      this.$.appDrawer.customStyle['--app-drawer-width'] = '60px';
      this.updateStyles();
      this.isExpanded = false;
    }
  },
});
