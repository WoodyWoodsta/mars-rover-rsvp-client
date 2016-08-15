/* app-shell.es6 */

Polymer({
  is: 'app-shell',

  behaviors: [
    Polymer.IronResizableBehavior,
  ],

  properties: {
    /**
     * Whether or not the side bar is full or narrow
     */
    isExpanded: {
      type: Boolean,
      reflectToAttribute: true,
      observer: '_onIsExpandedChanged',
      value: false,
    },

    narrow: {
      type: Boolean,
      observer: '_onNarrowChanged',
    },

    // === Private ===
  },

  listeners: {
    'iron-resize': '_onIronResize',
  },

  attached() {
    this.listen(this.$.drawerControls.$.collapseButton, 'tap', '_onExpandToggleableTap');
    this.listen(this.$.drawerControls.$.drawerSpacer, 'tap', '_onExpandToggleableTap');
    this._onIsExpandedChanged(this.$.layout.narrow);
  },

  detached() {
    this.unlisten(this.$.drawerControls.$.collapseButton, 'tap', '_onExpandToggleableTap');
    this.unlisten(this.$.drawerControls.$.drawerSpacer, 'tap', '_onExpandToggleableTap');
  },

  expandDrawer() {
    this.set('isExpanded', true);
  },

  collapseDrawer() {
    this.set('isExpanded', false);
  },

  toggleDrawerExpand() {
    this.isExpanded = !this.isExpanded;
  },

  // === Private ===
  _onExpandToggleableTap() {
    if (!this.$.layout.narrow) {
      this.toggleDrawerExpand();
    }
  },

  _onMainContentTap() {
    if (!this.$.layout.narrow) {
      this.collapseDrawer();
      this.unlisten(this.$.mainContent, 'tap', '_onMainContentTap');
    }
  },

  _onIsExpandedChanged(newValue) {
    if (newValue) {
      this.$.appDrawer.customStyle['--app-drawer-width'] = '256px';
      this.updateStyles();
      this.listen(this.$.mainContent, 'tap', '_onMainContentTap');
    } else {
      this.$.appDrawer.customStyle['--app-drawer-width'] = '60px';
      this.updateStyles();
      this.unlisten(this.$.mainContent, 'tap', '_onMainContentTap');
    }
  },

  _onNarrowChanged(value) {
    if (value) {
      this.expandDrawer();
    } else {
      this.collapseDrawer();
    }
  },

  _onIronResize() {
    if (!this.narrow) {
      this.collapseDrawer();
    }
  },
});
