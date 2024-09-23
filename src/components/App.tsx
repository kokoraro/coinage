import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';

import { getCoinData, getCoinPrice } from '../redux/coins/actions';
import { Coin } from '../redux/coins/types';
import { ApplicationState } from '../redux';
import Header from './Header';
import CoinList from './CoinList';
import ControlPanel from './ControlPanel';
import Footer from './Footer';


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
        await this.props.getCoinData();
        this.updateCoins();
    }

    updateCoins = () => {
        const { coinList } = this.props;
        const codes = coinList.filter(c => c.showing).map(c => c.code);
        this.props.getCoinPrice(codes);
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
            <div className="container">
                <Header />

                <div className="main">
                    <div className="list">
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
                    <div className="detail">

                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

const mapStateToProps = ({ coins }: ApplicationState) => ({
    errorMessage: coins.errors,
    coinList: coins.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getCoinData: () => dispatch(getCoinData()),
    getCoinPrice: (codes: string[]) => dispatch(getCoinPrice(codes))
})

export default connect(mapStateToProps, mapDispatchToProps)(BitcoinTracker);
