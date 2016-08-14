/* app-drawer-controls.es6 */

Polymer({
  is: 'app-drawer-controls',
  properties: {
    isParentExpanded: {
      type: Boolean,
    },

    collapseButtonIcon: {
      type: String,
      computed: '_computeCollapseButtonIcon(isParentExpanded)',
    },
  },

  // === Private ===
  _computeCollapseButtonIcon(isParentExpandedValue) {
    return (isParentExpandedValue) ? 'icons:chevron-left' : 'icons:chevron-right';
  },
});
