import React, { useState } from 'react';
import CoinListItem from './CoinListItem';
import LoadingPanel from '../ui/LoadingPanel';
import PageNumbers from '../ui/Pagination';
import { Coin, fetchCoinData } from '../api/coins';
import { useGlobalStateContext } from '../../utils/GlobalStateProvider';
import { useQuery } from 'react-query';


interface CoinResponse {
    CoinName: string;
    ImageUrl: string;
}
interface CoinDataResponse {
    Data: { [key: string]: CoinResponse }
}

const FullCoinList = () => {
    const [pageIndex, setPageIndex] = useState<number>(0);
    const { state } = useGlobalStateContext();
    const { isLoading, data } = useQuery<CoinDataResponse, Error>('coins', fetchCoinData);

    if (isLoading) return <LoadingPanel />;

    let currentIndex = 0

    const coinData = Object.entries(data?.Data || {}).map(([key, coin], index) => ({
        id: index,
        name: coin.CoinName,
        imageURL: coin.ImageUrl,
        code: key,
        showing: state.activeCoinCodes.includes(key),
        price: { GBP: '0', USD: '0' },
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