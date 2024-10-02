import React from 'react';
import CoinItem from './Coin';
import { Coin } from '../redux/coins/types';
import LoadingPanel from './ui/LoadingPanel';

interface CoinList {
    coinData: Coin[];
    currDollar: boolean;
    loading: boolean;
}

const CoinList = ({
    coinData,
    currDollar,
    loading,
}: CoinList) => {
    if (loading) return <LoadingPanel />
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
