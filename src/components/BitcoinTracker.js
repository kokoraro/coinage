import React, { Component } from 'react';
import CoinList from './CoinList';
import ControlPanel from './ControlPanel';
import Footer from './Footer';
import { getPrice } from '../getCoins';

const coinArray = [
  'BTC', 'XRP', 'LTC', 'ETH', 
  'DOGE', 'XMR', 'ZEC', 'DSH', 
  'NEO', 'GNT', 'ADA', 'XVG'
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
      coinList: [
        { id: 0, code: 'BTC',  name: 'Bitcoin',  showing: true   },
        { id: 1, code: 'XRP',  name: 'Ripple',   showing: true   },
        { id: 2, code: 'LTC',  name: 'Litecoin', showing: true   },
        { id: 3, code: 'ETH',  name: 'Etherium', showing: true   },
        { id: 4, code: 'DOGE', name: 'Dogecoin', showing: false  },
        { id: 5, code: 'XMR',  name: 'Monero',   showing: false  },
        { id: 6, code: 'ZEC',  name: 'Zcash',    showing: false  },
        { id: 7, code: 'DSH',  name: 'Dash',     showing: false  },
        { id: 8, code: 'NEO',  name: 'NEO',      showing: false  },
        { id: 9, code: 'GNT',  name: 'Golem',    showing: false  },
        { id: 10, code: 'ADA',  name: 'Cardano',  showing: true  }
      ]
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
      return {...c, price: prices[c.code]};
    });
    this.setState({coins});
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
    this.updateCoins()
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