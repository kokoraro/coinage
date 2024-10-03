import React, { useState } from 'react';
import { useQuery } from 'react-query';

import Header from './Header';
import CoinList from './coins/CoinList';
import Footer from './Footer';
import NewsFeed from './news/NewsFeed';
import FullCoinList from './coins/FullCoinList';
import { fetchCoinData } from './api/coins';
import { DEFAULT_FAVOURITE_COINS } from '../utils/config';

interface CoinResponse {
    CoinName: string;
    ImageUrl: string;
}
interface CoinDataResponse {
    Data: { [key: string]: CoinResponse }
}

const App = () => {
    const [activeCoinCodes, setActiveCoinCodes] = useState(DEFAULT_FAVOURITE_COINS);
    const { isLoading, data } = useQuery<CoinDataResponse, Error>('coins', fetchCoinData);

    const [isFavouritesView, setIsFavouritesView] = useState<boolean>(true);
    const [isCurrencyDollar, setCurrDollar] = useState<boolean>(true);

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
            <Header
                activeCoinCodes={activeCoinCodes}
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
                            coinData={coinData}
                            isCurrencyDollar={isCurrencyDollar}
                            loading={isLoading}
                            isFavouritesView={isFavouritesView}
                            activeCoinCodes={activeCoinCodes}
                            setActiveCoinCodes={setActiveCoinCodes}
                        />
                    ) : (
                        <FullCoinList
                            coinData={coinData}
                            isCurrencyDollar={isCurrencyDollar}
                            loading={isLoading}
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
