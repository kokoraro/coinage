import React from 'react';
import CoinListItem from './CoinListItem';
import LoadingPanel from '../ui/LoadingPanel';
import { useQuery } from 'react-query';
import { Coin, fetchCoinPrice } from '../api/coins';
import { useGlobalStateContext } from '../../utils/GlobalStateProvider';

interface CoinListProps {
    coinData: Coin[];
    loading: boolean;
}

type CoinPriceResponse = { [key: string]: { GBP: string; USD: string } };

const DEFAULT_COIN_PRICE = { GBP: '0', USD: '0' };

const CoinList = ({
    coinData,
    loading,
}: CoinListProps) => {
    const { state } = useGlobalStateContext();
    const { activeCoinCodes } = state;
    const { isLoading: isLoadingPrice, data: priceData } = useQuery<CoinPriceResponse, Error>('coinsPrice', () => fetchCoinPrice(activeCoinCodes), { refetchOnMount: false });

    if (loading || isLoadingPrice) return <LoadingPanel />;

    const favouriteCoins = coinData.filter(coin => activeCoinCodes.includes(coin.code));

    return (
        <div className="coin-list">
            {favouriteCoins.map(coin => (
                <CoinListItem
                    coin={coin}
                    isCurrencyDollar={state.isCurrencyDollar}
                    key={coin.id}
                    coinPrice={priceData?.[coin.code] || DEFAULT_COIN_PRICE}
                />
            ))}
        </div>
    );
}

export default CoinList;
