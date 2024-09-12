import React, { Component } from 'react';
import CoinList from './CoinList';

class BitcoinTracker extends Component {
  render() {
    return (
      <div>
        <h1>Bitcoin Tracker</h1>
        <CoinList />
      </div>
    )
  }
}

export default BitcoinTracker;