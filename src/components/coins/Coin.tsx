import React from 'react';
import { Coin } from '../../redux/coins/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CoinProps {
    coinData: Coin;
    currDollar: boolean;
    isFavouritesView: boolean
}

const formatCoinPrice = (coinData: Coin, currDollar: boolean) => {
    const currency = currDollar ? 'USD' : 'GBP';
    const currSymbol = currDollar ? '$' : '£';
    const price = Number(coinData.price[currency]);
    const value = price >= 1 ? price.toFixed(2) : price.toFixed(4);

    return `${currSymbol}${value}`;
}


const CoinItem = ({
    coinData,
    currDollar,
    isFavouritesView,
}: CoinProps) => {


    return (
        <div className="coin">
            <img src={coinData.imageURL && `https://www.cryptocompare.com${coinData.imageURL}`} alt={coinData.name} />
            <div className="coin-code">{coinData.code}</div>
            <div className="coin-name">{coinData.name}</div>
            {isFavouritesView ? (
                <FontAwesomeIcon icon="star" />
            ) : (
                <div className="coin-price">{formatCoinPrice(coinData, currDollar)}</div>
            )}
        </div>
    );
};

export default CoinItem;
