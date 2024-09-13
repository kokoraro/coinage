import React from 'react';
import Coin from './Coin';

const CoinList = ({ coinData, currDollar }) => {
  const coins = coinData ? (
    coinData.map(c => (
      <Coin coinData={c} currDollar={currDollar} key={c.id} />
    ))
  ) : null;
  return (
    <ul className="coin-list">
      {coins} 
    </ul>
  )
}

export default CoinList;