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

    cmdTypeIsSelected: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
    },

    currentCmd: {
      type: Object,
    },

    // === Private ===

    _cmdDefArray: {
      type: Array,
    },

    _cmdTypeSelection: {
      type: Object,
      observer: '_onCmdTypeSelectionChanged',
    },

    _cmdTypeName: {
      type: Object,
      value: {},
    },

    _newCmdDialogCommitButtonText: {
      type: String,
      value: 'Create',
    },
  },

  listeners: {
    'addButton.tap': '_onAddButtonTap',
    'cmdDialog.iron-overlay-closed': '_onNewCmdDialogIronOverlayClosed',
  },

  attached() {
    this._cmdDefArray = this._getCmdDefArray();
  },

  // === Private ===
  _onAddButtonTap() {
    this.$.cmdDialog.open();
  },

  _sortCmdDefArray(a, b) {
    const aPos = this._getCmdDefPosition(a);
    const bPos = this._getCmdDefPosition(b);

    if (aPos < bPos) {
      return 1;
    }

    if (aPos > bPos) {
      return -1;
    }

    return 0;
  },

  _getCmdDefPosition(defObj) {
    switch (defObj.def.type) {
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

  /**
   * Create an array of *example* commands to use in selecting a type
   */
  _getCmdDefArray() {
    return Object.keys(sequenceBehavior.cmdDefinitions).map((val) => {
      return {
        def: sequenceBehavior.cmdDefinitions[val],
        key: val,
      };
    });
  },

  _onCmdTypeSelectionChanged(newValue) {
    this.cmdTypeIsSelected = (newValue !== null);
    this._cmdTypeName = {};
    if (newValue) {
      this.set(`_cmdTypeName.${newValue.item.key}`, {});

      const SelectedCmdClass = this._getCmdClassByKey(newValue.item.key);
      this.currentCmd = new SelectedCmdClass();
    }
  },

  _onNewCmdDialogIronOverlayClosed(event) {
    if (event.detail.canceled) {
      this.cmdTypeIsSelected = false;
      this.$.cmdTypeDropdown.contentElement.selected = null;
      this._cmdTypeName = {};
      this.currentCmd = {};
    }
  },

  _getCmdClassByKey(key) {
    let className;

    switch (key) {
      case 'pause':
        className = 'PauseCmd';
        break;
      default:
    }

    return sequenceBehavior[className];
  },
});
