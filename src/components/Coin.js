import React from 'react';

const Coin = ({ coinData, currDollar, addOpen, handleDelete }) => {
  const currency = currDollar ? 'USD' : 'GBP';
  const currSymbol = currDollar ? '$' : '£';
  const value = Number(coinData.price[currency]).toFixed(2);
  const price = `${currSymbol}${value}`;

  const firstDiv = addOpen ? (
    <div className="coin-delete" onClick={() => handleDelete(coinData.id)} >
      <i className="fa fa-trash"></i>
    </div>
  ) : (
    <div className="coin-id">{coinData.id}</div>
  ) 

  return (
    <li className="coin">
      {firstDiv}
      <div className="coin-code">{coinData.code}</div>
      <div className="coin-name">{coinData.name}</div>
      <div className="coin-price">{price}</div>
    </li>
  )
}

export default Coin;