import React, { Component, Fragment } from 'react';
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
import '../styles/BitcoinTracker.sass';
import { Coin } from '../reducers/coins';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../reducers';
import Header from './Header';

interface Props {
    coinList: Coin[];
}

type BitcoinTrackerProps = Props & AnyAction;

interface BitcoinTrackerState {
    currDollar: boolean;
    addOpen: boolean;
}

class BitcoinTracker extends Component<BitcoinTrackerProps, BitcoinTrackerState> {
    state = {
        currDollar: true,
        addOpen: false,
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

    handleAddCoins = async (ids: number[]) => {
        const { addCoinsHandler } = this.props;
        await addCoinsHandler(ids);
        this.updateCoins();
    }

    handleDelete = (id: number) => {
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
            <Fragment>
                <Header />
                <div className="container">
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
            </Fragment>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    errorMessage: state.coins.errorMessage,
    coinList: state.coins.coins,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
    fetchCoinData: () => dispatch(getCoinData()),
    fetchCoinPrice: (codes: string[]) => dispatch(getCoinPrice(codes)),
    addCoinsHandler: (ids: string[]) => dispatch(addCoins(ids)),
    removeCoinHandler: (id: string) => dispatch(removeCoin(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BitcoinTracker);
