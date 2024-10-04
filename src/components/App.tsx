import React from 'react';
import Header from './Header';
import CoinList from './coins/CoinList';
import Footer from './Footer';
import NewsFeed from './news/NewsFeed';
import FullCoinList from './coins/FullCoinList';
import { useGlobalStateContext } from '../utils/GlobalStateProvider';


const App = () => {
    const { state } = useGlobalStateContext();
    const { isFavouritesView } = state;

    return (
        <div className="container">
            <Header />

            <div className="main">
                <div className="list">
                    {isFavouritesView ? <CoinList /> : <FullCoinList />}
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
