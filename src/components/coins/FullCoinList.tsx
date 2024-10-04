import React, { useState } from 'react';
import CoinListItem from './CoinListItem';
import LoadingPanel from '../ui/LoadingPanel';
import PageNumbers from '../ui/Pagination';
import { Coin } from '../api/coins';
import { useGlobalStateContext } from '../../utils/GlobalStateProvider';

interface FullCoinListProps {
    coinData: Coin[];
    loading: boolean;
}

const FullCoinList = ({
    coinData,
    loading,
}: FullCoinListProps) => {
    const [pageIndex, setPageIndex] = useState<number>(0);
    const { state } = useGlobalStateContext();

    if (loading) return <LoadingPanel />;

    let currentIndex = 0

    const pages = coinData.reduce((acc: Coin[][], cur: Coin, index) => {
        if (!acc[currentIndex]) acc.push([]);
        acc[currentIndex].push(cur);
    
        if ((index + 1) % 50 === 0) currentIndex += 1;
        return acc;
    }, []);

    return (
        <div className="coin-list">
            {pages[pageIndex].map(coin => (
                <CoinListItem
                    coin={coin}
                    isCurrencyDollar={state.isCurrencyDollar}
                    key={coin.id}
                />
            ))}

            <PageNumbers
                currentPageIndex={pageIndex}
                totalPages={pages.length}
                onChangePage={(newPage) => setPageIndex(newPage)}
            />
        </div>
    );
}

export default FullCoinList;