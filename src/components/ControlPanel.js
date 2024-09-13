import React, { Component } from 'react';
import AddCoinListItem from './AddCoinListItem'

class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addOpen: false
    }
  }

  render() {
    const {addOpen} = this.state;
    const form = addOpen ? (
      <ul> 
        {this.props.altCoins.map(c => (
          <AddCoinListItem key={c.id} name={c.name} />
        ))}
      </ul>
    ) : null;

    return (
      <div>
        <div className="control-panel">    
          <button 
            className="add-button"
            onClick={() => this.setState({addOpen: !addOpen})}
          >Add</button>    
          <button onClick={this.props.handleCurrency}>Currency</button>
          <button onClick={this.props.handleRefresh}>Refresh</button>
        </div>
        {form}
      </div>
    )
  }
}

export default ControlPanel;