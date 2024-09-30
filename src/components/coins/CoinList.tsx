import React from 'react';
import CoinItem from './Coin';
import { Coin } from '../../redux/coins/types';
import LoadingPanel from '../ui/LoadingPanel';

interface CoinList {
    coinData: Coin[];
    currDollar: boolean;
    loading: boolean;
    isFavouritesView: boolean;
}

const CoinList = ({
    coinData,
    currDollar,
    loading,
    isFavouritesView,
}: CoinList) => {
    if (loading) return <LoadingPanel />;

    const selectedCoins = coinData.filter(coin => coin.showing);

    return (
        <div className="coin-list">
            {selectedCoins.map(coin => (
                <CoinItem
                    coinData={coin}
                    currDollar={currDollar}
                    key={coin.id}
                    isFavouritesView={isFavouritesView}
                />
            ))}
        </div>
    );
}


export default CoinList;
