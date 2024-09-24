import React from 'react';
import { Coin } from '../redux/coins/types';

interface CoinProps {
    coinData: Coin;
    currDollar: boolean;
}

const CoinItem = ({
    coinData,
    currDollar,
}: CoinProps) => {
    const currency = currDollar ? 'USD' : 'GBP';
    const currSymbol = currDollar ? '$' : '£';
    const price = Number(coinData.price[currency]);
    const value = price >= 1 ? price.toFixed(2) : price.toFixed(4);

    return (
        <div className="coin">
            <img src={coinData.imageURL && `https://www.cryptocompare.com${coinData.imageURL}`} alt={coinData.name} />
            <div className="coin-code">{coinData.code}</div>
            <div className="coin-name">{coinData.name}</div>
            <div className="coin-price">{`${currSymbol}${value}`}</div>
        </div>
    );
};

export default CoinItem;
