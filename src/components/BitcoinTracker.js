import React, { Component } from 'react';
import CoinList from './CoinList';

class BitcoinTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [
        { id: 1, type: 'btc', name: "Bitcoin", price: 2000 },
        { id: 2, type: 'eth', name: "Etherium", price: 500 },
        { id: 3, type: 'ltc', name: "Litecoin", price: 100 }
      ],
    }
  }

  render() {
    return (
      <div>
        <h1>COIN</h1>
        <CoinList coinData={ this.state.coins } />
      </div>
    )
  }
}

export default BitcoinTracker;