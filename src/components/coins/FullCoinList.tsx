import React, { useState } from 'react';
import CoinListItem from './CoinListItem';
import LoadingPanel from '../ui/LoadingPanel';
import PageNumbers from '../ui/Pagination';
import { Coin } from '../api/coins';

interface FullCoinListProps {
    coinData: Coin[];
    isCurrencyDollar: boolean;
    loading: boolean;
    activeCoinCodes: string[];
    setActiveCoinCodes: (coinCodes: string[]) => void;
}

const FullCoinList = ({
    coinData,
    isCurrencyDollar,
    loading,
    activeCoinCodes,
    setActiveCoinCodes,
}: FullCoinListProps) => {
    const [pageIndex, setPageIndex] = useState<number>(0);

    if (loading) return <LoadingPanel />;

    let currentIndex = 0

    const handleFavouriteClick = (coinCode: string) => {
        if (activeCoinCodes.includes(coinCode)) {
            const newCoinCodes = activeCoinCodes.filter(code => coinCode !== code);
            setActiveCoinCodes(newCoinCodes);
            return;
        }
        setActiveCoinCodes([...activeCoinCodes, coinCode]);
    }

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
                    isCurrencyDollar={isCurrencyDollar}
                    key={coin.id}
                    isFavouritesView={false}
                    handleFavouriteClick={handleFavouriteClick}
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