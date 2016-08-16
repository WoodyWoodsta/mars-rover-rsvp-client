/* app-drawer-controls.es6 */

import { kurentoBehavior } from 'app-behaviors';

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

  listeners: {
    'presenterButton.tap': '_onPresenterButtonTap',
    'viewerButton.tap': '_onViewerButtonTap',
    'disconnectButton.tap': '_onDisconnectButtonTap',
  },

  // === Private ===
  _computeCollapseButtonIcon(isParentExpandedValue) {
    return (isParentExpandedValue) ? 'icons:chevron-left' : 'icons:chevron-right';
  },

  _onPresenterButtonTap() {
    kurentoBehavior.presenter();
  },

  _onViewerButtonTap() {
    kurentoBehavior.viewer();
  },

  _onDisconnectButtonTap() {
    kurentoBehavior.stop();
  },
});
