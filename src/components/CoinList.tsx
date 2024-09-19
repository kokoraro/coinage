import React from 'react';
import Coin from './Coin';
import '../styles/CoinList.sass';

interface CoinList {
    coinData: any[];
    currDollar: boolean;
    addOpen: boolean;
    handleDelete: any;
}

const CoinList = ({
    coinData,
    currDollar,
    addOpen,
    handleDelete,
}: CoinList) => (
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
