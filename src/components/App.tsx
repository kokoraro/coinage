import React from 'react';
import { useQuery } from 'react-query';

import Header from './Header';
import CoinList from './coins/CoinList';
import Footer from './Footer';
import NewsFeed from './news/NewsFeed';
import FullCoinList from './coins/FullCoinList';
import { fetchCoinData } from './api/coins';
import { useGlobalStateContext } from '../utils/GlobalStateProvider';

interface CoinResponse {
    CoinName: string;
    ImageUrl: string;
}
interface CoinDataResponse {
    Data: { [key: string]: CoinResponse }
}

const App = () => {
    const { state } = useGlobalStateContext();
    const { activeCoinCodes, isFavouritesView } = state;
    const { isLoading, data } = useQuery<CoinDataResponse, Error>('coins', fetchCoinData);

    const coinData = Object.entries(data?.Data || {}).map(([key, coin], index) => ({
        id: index,
        name: coin.CoinName,
        imageURL: coin.ImageUrl,
        code: key,
        showing: activeCoinCodes.includes(key),
        price: { GBP: '0', USD: '0' },
    }));

    return (
        <div className="container">
            <Header />

            <div className="main">
                <div className="list">
                    {isFavouritesView ? (
                        <CoinList coinData={coinData} loading={isLoading} />
                    ) : (
                        <FullCoinList coinData={coinData} loading={isLoading} />
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
