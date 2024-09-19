import React, { Component } from 'react';
import { connect } from 'react-redux';
import CoinList from './CoinList';
import ControlPanel from './ControlPanel';
import Footer from './Footer';
import { getCoinData, getCoinPrice, addCoins } from '../actions';
import './BitcoinTracker.sass';

class BitcoinTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currDollar: true,
            addOpen: false,
            coinList: [],
        };
    }

    componentDidMount = async () => {
        const { fetchCoinData } = this.props;
        await fetchCoinData();
        this.updateCoins();
    }

    updateCoins = () => {
        const { coinList, fetchCoinPrice } = this.props;
        const filtered = coinList.filter(a => a.showing);
        const codes = filtered.map(c => c.code);
        fetchCoinPrice(codes);
    }

    handleAddCoins = async (ids) => {
        const { addCoinsHandler, fetchCoinPrice } = this.props;
        await addCoinsHandler(ids);
        const { coinList } = this.props;
        const codes = coinList.filter(coin => coin.showing).map(c => c.code);
        fetchCoinPrice(codes);
    }

    handleDelete = (id) => {
        const { coinList } = this.state;
        const newCoinList = coinList.map(c => (
            c.id === id ? { ...c, showing: false } : c
        ));
        this.setState({ coinList: newCoinList }, () => this.updateCoins());
    }

    render() {
        const { coinList } = this.props;
        const { currDollar, addOpen } = this.state;

        const addCoinList = coinList.filter(coin => !coin.showing);
        const selectedCoins = coinList.filter(coin => coin.showing);

        return (
            <div>
                <div className="container">
                    <h1>coinage</h1>
                    <CoinList
                        coinData={selectedCoins}
                        currDollar={currDollar}
                        addOpen={addOpen}
                        handleDelete={this.handleDelete}
                    />
                    <ControlPanel
                        selectCoins={addCoinList}
                        handleRefresh={this.updateCoins}
                        handleAddCoins={this.handleAddCoins}
                        addOpen={addOpen}
                        toggleAddOpen={() => this.setState({ addOpen: !addOpen })}
                        handleCurrency={() => this.setState({ currDollar: !currDollar })}
                    />
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errorMessage: state.coins.errorMessage,
    coinList: state.coins.coins,
});

const mapDispatchToProps = dispatch => ({
    fetchCoinData: () => dispatch(getCoinData()),
    fetchCoinPrice: codes => dispatch(getCoinPrice(codes)),
    addCoinsHandler: ids => dispatch(addCoins(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BitcoinTracker);
