import React, { Component } from 'react';
import { connect } from 'react-redux';
import CoinList from './CoinList';
import ControlPanel from './ControlPanel';
import Footer from './Footer';
import {
    getCoinData,
    getCoinPrice,
    addCoins,
    removeCoin,
} from '../actions';
import './BitcoinTracker.sass';

class BitcoinTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currDollar: true,
            addOpen: false,
        };
    }

    componentDidMount = async () => {
        const { fetchCoinData } = this.props;
        await fetchCoinData();
        this.updateCoins();
    }

    updateCoins = () => {
        const { coinList, fetchCoinPrice } = this.props;
        const codes = coinList.filter(c => c.showing).map(c => c.code);
        fetchCoinPrice(codes);
    }

    handleAddCoins = async (ids) => {
        const { addCoinsHandler } = this.props;
        await addCoinsHandler(ids);
        this.updateCoins();
    }

    handleDelete = (id) => {
        const { removeCoinHandler } = this.props;
        removeCoinHandler(id);
        this.updateCoins();
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
    removeCoinHandler: id => dispatch(removeCoin(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BitcoinTracker);
