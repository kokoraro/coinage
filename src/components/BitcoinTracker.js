import React, { Component } from 'react';
import CoinList from './CoinList';
import ControlPanel from './ControlPanel';
import { getPrice } from '../getCoins';

class BitcoinTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [
        { id: 1, type: 'btc', name: "Bitcoin", price: 0 },
        { id: 2, type: 'eth', name: "Etherium", price: 0 },
        { id: 3, type: 'ltc', name: "Litecoin", price: 0 }
      ],
    }
  }

  updateCoins() {
    const prices = this.state.coins.map(obj => {
      return getPrice(obj.type).then(result => {
        obj.price = result;
        return obj;
      })
    });

    Promise.all(prices).then(coins => {
      this.setState({ coins });
    });
  }

  componentDidMount() {
    this.updateCoins()
  }

  render() {
    return (
      <div className="container">
        <h1>coinage</h1>
        <CoinList coinData={ this.state.coins } />
        <ControlPanel />
      </div>
    )
  }
}

export default BitcoinTracker;