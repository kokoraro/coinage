import React from 'react';
import CoinListItem from './CoinListItem';
import { Coin } from '../../redux/coins/types';
import LoadingPanel from '../ui/LoadingPanel';

interface CoinListProps {
    coinData: Coin[];
    isCurrencyDollar: boolean;
    loading: boolean;
    isFavouritesView: boolean;
}

const CoinList = ({
    coinData,
    isCurrencyDollar,
    loading,
    isFavouritesView,
}: CoinListProps) => {
    if (loading) return <LoadingPanel />;

    const selectedCoins = coinData.filter(coin => coin.showing);

    return (
        <div className="coin-list">
            {selectedCoins.map(coin => (
                <CoinListItem
                    coin={coin}
                    isCurrencyDollar={isCurrencyDollar}
                    key={coin.id}
                    isFavouritesView={isFavouritesView}
                />
            ))}
        </div>
    );
}


export default CoinList;
