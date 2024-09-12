import React, { Component } from 'react';

class ControlPanel extends Component {
  render() {
    return (
      <div className="control-panel">
        <button>Add</button>
        <button>Remove</button>
        <button>Refresh</button>
      </div>
    )
  }
}

export default ControlPanel;