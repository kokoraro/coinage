import React from 'react';

const Coin = ({ coinData }) => {
  return (
    <li>
      <span className="coin-name">{coinData.name}</span>
      <span className="coin-price">{coinData.price}</span>
    </li>
  )
}

export default Coin;