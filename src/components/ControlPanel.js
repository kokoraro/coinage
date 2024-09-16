import React, { Component } from 'react';
import AddCoinListItem from './AddCoinListItem'

class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectCoins: null 
    }
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {selectCoins} = this.props;
    if (nextProps.selectCoins !== selectCoins) {
      this.setState({ selectCoins });
    }
  }
    
  componentDidMount() {
    const selectCoins = this.props.selectCoins;
    this.setState({ selectCoins });
  }

  handleAddCoinClick(id) {
    const selectCoins = this.state.selectCoins.map(c => (
      c.id === id ? {...c, showing: !c.showing } : c
    ));
    this.setState({ selectCoins });
  }

  handleAddSubmit() {
    const selectCoins = this.state.selectCoins
      .filter(c => c.showing)
      .map(c => c.id);
    this.props.handleAddCoins(selectCoins);
  }

  render() {
    const {addOpen} = this.props;
    const form = addOpen ? (
      <div>
        <h4>choose coins to add...</h4>
        <button
          onClick={this.handleAddSubmit}
          className="add-coins-submit"
        >
        Submit
        </button>
        <div className="add-coins"> 
          {this.state.selectCoins.map(c => (
            <AddCoinListItem 
              handleAddCoinClick={() => this.handleAddCoinClick(c.id)} 
              key={c.id} 
              data={c} 
            />
          ))}
        </div>
        <button 
          onClick={this.handleAddSubmit} 
          className="add-coins-submit"
        >
        Submit
        </button>
      </div>
    ) : null;

    return (
      <div>
        <div className="control-panel">    
          <button 
            className="add-button"
            onClick={this.props.toggleAddOpen} >
            Edit
          </button>    
          <button onClick={this.props.handleCurrency}>Currency</button>
          <button onClick={this.props.handleRefresh}>Refresh</button>
        </div>
        {form}
      </div>
    )
  }
}

export default ControlPanel;