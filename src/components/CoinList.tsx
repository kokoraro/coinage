import React from 'react';
import CoinItem from './Coin';
import { Coin } from '../redux/coins/types';

interface CoinList {
    coinData: Coin[];
    currDollar: boolean;
}

const CoinList = ({
    coinData,
    currDollar,
}: CoinList) => {
    return (
        <div className="coin-list">
            {coinData.map(c => (
                <CoinItem
                    coinData={c}
                    currDollar={currDollar}
                    key={c.id}
                />
            ))}
        </div>
    );
}


export default CoinList;
