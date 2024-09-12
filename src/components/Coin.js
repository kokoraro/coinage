import React from 'react';

const Coin = ({ coinData }) => {
  const price = `$${coinData.price.USD}`;

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