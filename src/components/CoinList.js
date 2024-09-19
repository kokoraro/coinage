import React from 'react';
import Coin from './Coin';
import './CoinList.sass';

const CoinList = ({
    coinData,
    currDollar,
    addOpen,
    handleDelete,
}) => (
    <ul className="coin-list">
        {coinData.map(c => (
            <Coin
                coinData={c}
                currDollar={currDollar}
                key={c.id}
                addOpen={addOpen}
                handleDelete={handleDelete}
            />
        ))}
    </ul>
);


export default CoinList;
