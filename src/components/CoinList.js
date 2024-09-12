import React from 'react';
import Coin from './Coin';

const CoinList = ({ coinData }) => {
  const coins = coinData ? (
    coinData.map(c => (
      <Coin coinData={c} key={c.id} />
    ))
  ) : null;
  return (
    <ul className="coin-list">
      {coins} 
    </ul>
  )
}

export default CoinList;