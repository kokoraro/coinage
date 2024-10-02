import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCoinData, getCoinPrice } from '../redux/coins/actions';
import { Coin } from '../redux/coins/types';
import { ApplicationState } from '../redux';
import Header from './Header';
import CoinList from './coins/CoinList';
import Footer from './Footer';
import NewsFeed from './news/NewsFeed';
import FullCoinList from './coins/FullCoinList';

const getActiveCoinCodes = (coins: Coin[]) => coins
    .filter(coin => coin.showing)
    .map(coin => coin.code);

const App = () => {
    const { data: coins, loading, loadingPrice } = useSelector((state: ApplicationState) => state.coins);
    const [isFavouritesView, setIsFavouritesView] = useState<boolean>(false);
    const [isCurrencyDollar, setCurrDollar] = useState<boolean>(true);
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

    return (
        <div className="container">
            <Header
                onRefresh={updateCoins}
                loadingPrice={loadingPrice}
                onSelectFavourites={() => setIsFavouritesView(true)}
                onSelectList={() => setIsFavouritesView(false)}
                onClickCurrency={() => setCurrDollar(!isCurrencyDollar)}
                isFavouritesView={isFavouritesView}
                isCurrencyDollar={isCurrencyDollar}
            />

            <div className="main">
                <div className="list">
                    {isFavouritesView ? (
                        <CoinList
                            coinData={coins}
                            isCurrencyDollar={isCurrencyDollar}
                            loading={loading}
                            isFavouritesView={isFavouritesView}
                        />
                    ) : (
                        <FullCoinList
                            coinData={coins}
                            isCurrencyDollar={isCurrencyDollar}
                            loading={loading}
                        />
                    )}
                </div>
                <div className="detail">
                    <NewsFeed />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default App;
