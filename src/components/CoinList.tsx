import React from 'react';
import CoinItem from './Coin';
import { Coin } from '../reducers/coins';

interface CoinList {
    coinData: Coin[];
    currDollar: boolean;
    addOpen: boolean;
    handleDelete: (id: number) => void;
}

const CoinList = ({
    coinData,
    currDollar,
    addOpen,
    handleDelete,
}: CoinList) => (
    <div className="coin-list">
        {coinData.map(c => (
            <CoinItem
                coinData={c}
                currDollar={currDollar}
                key={c.id}
                addOpen={addOpen}
                handleDelete={handleDelete}
            />
        ))}
    </div>
);

export default CoinList;
