import React from 'react';
import './Coin.sass';

interface CoinProps {
    coinData: any;
    currDollar: boolean;
    addOpen: boolean;
    handleDelete: any;
}

const Coin = ({
    coinData,
    currDollar,
    addOpen,
    handleDelete,
}: CoinProps) => {
    const currency = currDollar ? 'USD' : 'GBP';
    const currSymbol = currDollar ? '$' : '£';
    const price = Number(coinData.price[currency]);
    const value = price >= 1 ? price.toFixed(2) : price.toFixed(4);

    return (
        <li className="coin">
            {addOpen ? (
                <div
                    role="button"
                    tabIndex={0}
                    className="coin-delete"
                    onClick={() => handleDelete(coinData.id)}
                >
                    <i className="fas fa-trash-alt" />
                </div>
            ) : (
                <img src={coinData.imageURL && `https://www.cryptocompare.com${coinData.imageURL}`} alt={coinData.name} />
            )}
            <div className="coin-code">{coinData.code}</div>
            <div className="coin-name">{coinData.name}</div>
            <div className="coin-price">{`${currSymbol}${value}`}</div>
        </li>
    );
};

export default Coin;
