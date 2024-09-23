import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCoinData, getCoinPrice, addCoins, removeCoin } from '../redux/coins/actions';
import { Coin } from '../redux/coins/types';
import { ApplicationState } from '../redux';
import Header from './Header';
import CoinList from './CoinList';
import ControlPanel from './ControlPanel';
import Footer from './Footer';

const getActiveCoinCodes = (coins: Coin[]) => coins
    .filter(coin => coin.showing)
    .map(coin => coin.code);

const App = () => {
    const { data: coins, loading, loadingPrice } = useSelector((state: ApplicationState) => state.coins);
    const [currDollar, setCurrDollar] = useState<boolean>(true);
    const [addOpen, setAddOpen] = useState<boolean>(false);
    const dispatch = useDispatch();

    const updateCoins = useCallback(() => {
        const action = getCoinPrice(getActiveCoinCodes(coins));
        dispatch(action);
    }, [coins, dispatch])

    useEffect(() => {
        const action = getCoinData();
        dispatch(action);
    }, [dispatch]);

    useEffect(() => {
        if (!loading && loadingPrice) updateCoins();
    }, [loading, loadingPrice, updateCoins]);

    const handleAddCoins = async (ids: number[]) => {
        const action = addCoins(ids);
        dispatch(action);
        // updateCoins();
    }

    const handleDelete = (id: number) => {
        const action = removeCoin(id);
        dispatch(action);
    }

    const addCoinList = coins.filter(coin => !coin.showing);
    const selectedCoins = coins.filter(coin => coin.showing);

    return (
        <div className="container">
            <Header />

            <div className="main">
                <div className="list">
                    <CoinList
                        coinData={selectedCoins}
                        currDollar={currDollar}
                        addOpen={addOpen}
                        handleDelete={handleDelete}
                    />
                    <ControlPanel
                        selectCoins={addCoinList}
                        handleRefresh={updateCoins}
                        handleAddCoins={handleAddCoins}
                        addOpen={addOpen}
                        toggleAddOpen={() => setAddOpen(!addOpen)}
                        handleCurrency={() => setCurrDollar(!currDollar)}
                    />
                </div>
                <div className="detail">

                </div>
            </div>

            <Footer />
        </div>
    );
}

export default App;
