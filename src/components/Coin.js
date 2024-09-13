import React from 'react';

const Coin = ({ coinData, currDollar }) => {
  const currency = currDollar ? 'USD' : 'GBP';
  const currSymbol = currDollar ? '$' : '£';
  const value = Number(coinData.price[currency]).toFixed(2);
  const price = `${currSymbol}${value}`;

  // const firstDiv = null; 

  return (
    <li className="coin">
      <div className="coin-id">{coinData.id}</div>
      <div className="coin-code">{coinData.code}</div>
      <div className="coin-name">{coinData.name}</div>
      <div className="coin-price">{price}</div>
    </li>
  )
}

export default Coin;