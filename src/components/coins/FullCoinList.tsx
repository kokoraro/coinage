import React from 'react';
import LoadingPanel from '../ui/LoadingPanel';
import PageNumbers from '../ui/Pagination';
import { Coin } from '../api/coins';
import { useGlobalStateContext } from '../../utils/GlobalStateProvider';
import useCoinDataQuery from '../hooks/useCoinDataQuery';




const FullCoinList = () => {
    const { isLoading, data } = useCoinDataQuery();
    const { state } = useGlobalStateContext();
    const { isLoading, data } = useCoinDataQuery();

    if (isLoading) return <LoadingPanel />;

    let currentIndex = 0;

    const coinData = Object.entries(data?.Data || {}).map(([key, coin]) => ({
        id: key,
        name: coin.CoinName,
        imageURL: coin.ImageUrl,
        code: key,
    }));

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
                    isFavourite={state.activeCoinCodes.includes(coin.code)}
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