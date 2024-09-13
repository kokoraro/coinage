import React, { Component } from 'react';
import CoinList from './CoinList';
import ControlPanel from './ControlPanel';
import { getPrice } from '../getCoins';

class BitcoinTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [
        { id: 0, code: 'BTC', name: "Bitcoin", price: 0 },
        { id: 1, code: 'ETH', name: "Etherium", price: 0 },
        { id: 2, code: 'LTC', name: "Litecoin", price: 0 }
      ],
      currDollar: true
    }
    this.updateCoins = this.updateCoins.bind(this);
  }

  async updateCoins() {
    const codes = this.state.coins.map(c => c.code);
    
    const prices = await getPrice(codes);

    const coins = this.state.coins.map(c => {
      return {...c, price: prices[c.code]};
    })

    this.setState({coins});
  }

  componentDidMount() {
    this.updateCoins()
  }

  render() {
    return (
      <div className="container">
        <h1>coinage</h1>
        <CoinList 
          coinData={this.state.coins}
          currDollar={this.state.currDollar}
        />
        <ControlPanel 
          handleRefresh={this.updateCoins} 
          handleCurrency={() => this.setState({
            currDollar: !this.state.currDollar}
          )} 
        />
      </div>
    )
  }
}

export default BitcoinTracker;