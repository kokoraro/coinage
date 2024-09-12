import React from 'react';

const Coin = ({ coinData }) => {
  const price = `$${Number(coinData.price).toFixed(2)}`;

  return (
    <li className="coin">
      <div className="coin-id">{coinData.id}</div>
      <div className="coin-code">{coinData.type}</div>
      <div className="coin-name">{coinData.name}</div>
      <div className="coin-price">{price}</div>
    </li>
  )
}

export default Coin;