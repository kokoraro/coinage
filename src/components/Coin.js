import React from 'react';

const Coin = ({
    coinData,
    currDollar,
    addOpen,
    handleDelete,
}) => {
    const currency = currDollar ? 'USD' : 'GBP';
    const currSymbol = currDollar ? '$' : '£';
    let value = Number(coinData.price[currency]);
    value = value >= 1 ? value.toFixed(2) : value.toFixed(4);
    const price = `${currSymbol}${value}`;
    const imgUrl = coinData.imageURL ? `https://www.cryptocompare.com${coinData.imageURL}` : null;

    const firstDiv = addOpen ? (
        <div
            role="button"
            tabIndex={0}
            className="coin-delete"
            onClick={() => handleDelete(coinData.id)}
        >
            <i className="fa fa-trash" />
        </div>
    ) : (
        <img src={imgUrl} alt={coinData.name} />
    );

    return (
        <li className="coin">
            {firstDiv}
            <div className="coin-code">{coinData.code}</div>
            <div className="coin-name">{coinData.name}</div>
            <div className="coin-price">{price}</div>
        </li>
    );
};

export default Coin;
