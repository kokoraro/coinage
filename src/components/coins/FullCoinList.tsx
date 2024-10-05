import React from 'react';
import LoadingPanel from '../ui/LoadingPanel';
import useCoinDataQuery from '../hooks/useCoinDataQuery';
import PaginatedList from '../ui/pagination/PaginatedList';
import CoinListItem from './CoinListItem';
import { useGlobalStateContext } from '../../utils/GlobalStateProvider';

const FullCoinList = () => {
    const { isLoading, data } = useCoinDataQuery();
    const { state } = useGlobalStateContext();

    if (isLoading) return <LoadingPanel />;

    const coinData = Object.entries(data?.Data || {}).map(([key, coin]) => ({
        id: key,
        name: coin.CoinName,
        imageURL: coin.ImageUrl,
        code: key,
    }));

    return (
        <div className="coin-list">
            <PaginatedList
                data={coinData}
                renderItem={({ item }) => (
                    <CoinListItem
                        coin={item}
                        isCurrencyDollar={state.isCurrencyDollar}
                        key={item.id}
                        isFavourite={state.activeCoinCodes.includes(item.code)}
                    />
                )}
            />
        </div>
    );
}

export default FullCoinList;