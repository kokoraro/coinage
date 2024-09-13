import React, { Component } from 'react';
import AddCoinListItem from './AddCoinListItem'

class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addOpen: false,
      selectCoinsIds: null 
    }
  }

  componentDidMount() {
    const selectCoinsIds = this.props.altCoins;
    this.setState({ selectCoinsIds });
  }

  handleAddCoinClick(id) {
    const selectCoinsIds = this.state.selectCoinsIds.map(c => (
      c.id === id ? {...c, showing: !c.showing } : c
    ));
    this.setState({ selectCoinsIds });
  }

  render() {
    const {addOpen} = this.state;
    const form = addOpen ? (
      <div>
        <div className="add-coins"> 
          {this.state.selectCoinsIds.map(c => (
            <AddCoinListItem 
              handleAddCoinClick={() => this.handleAddCoinClick(c.id)} 
              key={c.id} 
              data={c} 
            />
          ))}
        </div>
        <button className="add-coins-submit">Submit</button>
      </div>
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