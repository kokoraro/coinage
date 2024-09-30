import React, { useState } from 'react';
import CoinItem from './Coin';
import { Coin } from '../../redux/coins/types';
import LoadingPanel from '../ui/LoadingPanel';
import PageNumbers from '../ui/Pagination';

interface FullCoinListProps {
    coinData: Coin[];
    currDollar: boolean;
    loading: boolean;
}

const FullCoinList = ({
    coinData,
    currDollar,
    loading,
}: FullCoinListProps) => {
    const [pageIndex, setPageIndex] = useState<number>(0);

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
                <CoinItem
                    coinData={coin}
                    currDollar={currDollar}
                    key={coin.id}
                    isFavouritesView={false}
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