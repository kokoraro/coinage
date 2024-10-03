import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Coin } from '../api/coins';

interface CoinListItemProps {
    coin: Coin;
    isCurrencyDollar: boolean;
    isFavouritesView: boolean;
    handleFavouriteClick?: (coinCode: string) => void;
}

const formatCoinPrice = (coin: Coin, isCurrencyDollar: boolean) => {
    const currency = isCurrencyDollar ? 'USD' : 'GBP';
    const currSymbol = isCurrencyDollar ? '$' : '£';
    const price = Number(coin.price[currency]);
    const value = price >= 1 ? price.toFixed(2) : price.toFixed(4);

    return `${currSymbol}${value}`;
}

const CoinListItem = ({
    coin,
    isCurrencyDollar,
    isFavouritesView,
    handleFavouriteClick,
}: CoinListItemProps) => {
    return (
        <div className="coin">
            <img src={coin.imageURL && `https://www.cryptocompare.com${coin.imageURL}`} alt={coin.name} />
            <div className="coin-code">{coin.code}</div>
            <div className="coin-name">{coin.name}</div>
            {!isFavouritesView ? (
                <FontAwesomeIcon
                    className="coin-star"
                    icon={[coin.showing ? 'fas' : 'far', 'star']}
                    onClick={() => {
                        if (handleFavouriteClick) handleFavouriteClick(coin.code)
                    }}
                />
            ) : (
                <div className="coin-price">{formatCoinPrice(coin, isCurrencyDollar)}</div>
            )}
        </div>
    );
};

export default CoinListItem;
