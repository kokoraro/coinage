import React, { Component } from 'react';
import CoinList from './CoinList';
import ControlPanel from './ControlPanel';
import Footer from './Footer';
import { getPrice } from '../getCoins';
import { getData } from '../getCoinData';

const FAVOURITES = [
  'BTC', 'XRP', 'LTC', 'ETH', 'XMR', 
  'ZEC', 'DSH', 'GNT', 'ADA', 'XVG',
];

class BitcoinTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [
        { id: 0, code: '...', name: "Loading", price: 0 },
      ],
      currDollar: true,
      addOpen: false,
      coinList: []
    }
    this.updateCoins = this.updateCoins.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddCoins = this.handleAddCoins.bind(this);
  }

  async updateCoins() {
    const filtered = this.state.coinList.filter(a => a.showing);
    const codes = filtered.map(c => c.code);
    const prices = await getPrice(codes); 
    const coins = filtered.map(c => {
      return {...c, price: prices[c.code] };
    });
    this.setState({coins});
  }

  async getCoinData() {
    const coinData = await getData();
    const coinList = Object.keys(coinData).map((coin, idx) => (
      { 
        id: idx, 
        name: coinData[coin].CoinName,
        imageURL: coinData[coin].ImageUrl,
        code: coin,
        showing: FAVOURITES.includes(coin)
      }
    ));
    this.setState({ coinList });
    this.updateCoins();
  }

  handleAddCoins(ids) {
    const coinList = this.state.coinList.map(c => (
      ids.includes(c.id) ? { ...c, showing: true } : c
    ));
    this.setState({coinList}, () => this.updateCoins());
  }

  handleDelete(id) {
    const coinList = this.state.coinList.map(c => (
      c.id === id ? { ...c, showing: false } : c
    ));
    this.setState({ coinList }, () => this.updateCoins());
  }

  componentDidMount() {
    this.getCoinData();
  }

  render() {
    const coinList = this.state.coinList.filter(c => !c.showing);
    const { coins, currDollar, addOpen } = this.state;

    return (
      <div>
        <div className="container">
          <h1>coinage</h1>
          <CoinList 
            coinData={coins}
            currDollar={currDollar}
            addOpen={addOpen}
            handleDelete={this.handleDelete}
          />
          <ControlPanel 
            selectCoins={coinList}
            handleRefresh={this.updateCoins}
            handleAddCoins={this.handleAddCoins}
            addOpen={addOpen}
            toggleAddOpen={() => this.setState({addOpen: !addOpen})}
            handleCurrency={() => this.setState({currDollar: !currDollar})} 
          />
        </div>
        <Footer />
      </div>
    )
  }
}

export default BitcoinTracker;