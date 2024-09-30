import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCoinData, getCoinPrice } from '../redux/coins/actions';
import { Coin } from '../redux/coins/types';
import { ApplicationState } from '../redux';
import Header from './Header';
import CoinList from './CoinList';
import Footer from './Footer';

const getActiveCoinCodes = (coins: Coin[]) => coins
    .filter(coin => coin.showing)
    .map(coin => coin.code);

const App = () => {
    const { data: coins, loading, loadingPrice } = useSelector((state: ApplicationState) => state.coins);
    const [currDollar, setCurrDollar] = useState<boolean>(true);
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

    // const handleAddCoins = async (ids: number[]) => {
    //     const action = addCoins(ids);
    //     dispatch(action);
    //     // updateCoins();
    // }

    // const handleDelete = (id: number) => {
    //     const action = removeCoin(id);
    //     dispatch(action);
    // }

    const selectedCoins = coins.filter(coin => coin.showing);

    return (
        <div className="container">
            <Header onRefresh={updateCoins} loadingPrice={loadingPrice} />

            <div className="main">
                <div className="list">
                    <CoinList
                        coinData={selectedCoins}
                        currDollar={currDollar}
                        loading={loading}
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
