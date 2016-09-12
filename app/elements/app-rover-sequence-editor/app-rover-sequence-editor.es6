/* app-rover-sequence-editor.es6 */

import { sequenceBehavior } from 'app-behaviors';

Polymer({
  is: 'app-rover-sequence-editor',

  properties: {
    sequence: {
      type: Array,
      value: [
        {
          name: 'Hardcore sequence item 1',
        },
        {
          name: 'Hardcore sequence item 2',
        },
        {
          name: 'Hardcore sequence item 3',
        },
        {
          name: 'Hardcore sequence item 4',
        },
      ],
    },

    _seqDefArray: {
      type: Array,
    },
  },

  listeners: {
    'addButton.tap': '_onAddButtonTap',
  },

  attached() {
    this._seqDefArray = this._getSeqDefArray();
  },

  // === Private ===
  _onAddButtonTap() {
    this.$.newSequenceDialog.open();
  },

  _sortSeqDefArray(a, b) {
    const aPos = this._getSeqDefPosition(a);
    const bPos = this._getSeqDefPosition(b);

    if (aPos < bPos) {
      return 1;
    }

    if (aPos > bPos) {
      return -1;
    }

    return 0;
  },

  _getSeqDefPosition(def) {
    switch (def.type) {
      case 'low':
        return 0;
      case 'high':
        return 1;
      case 'macro':
        return 2;
      default:
        return 3;
    }
  },

  _getSeqDefArray() {
    return Object.keys(sequenceBehavior.seqDefinitions).map((val) => sequenceBehavior.seqDefinitions[val]);
  },
});
