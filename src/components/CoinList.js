import React from 'react';
import Coin from './Coin';

const CoinList = ({
    coinData,
    currDollar,
    addOpen,
    handleDelete,
}) => {
    const coins = coinData ? (coinData.map(c => (
        <Coin coinData={c} currDollar={currDollar} key={c.id} addOpen={addOpen} handleDelete={handleDelete} />
    ))) : null;
    return (
        <ul className="coin-list">
            {coins}
        </ul>
    );
};

export default CoinList;
