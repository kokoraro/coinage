import React from 'react';
import CoinListItem from './CoinListItem';
import LoadingPanel from '../ui/LoadingPanel';
import { useQuery } from 'react-query';
import { fetchCoinPrice } from '../api/coins';
import { useGlobalStateContext } from '../../utils/GlobalStateProvider';
import useCoinDataQuery from '../hooks/useCoinDataQuery';

type CoinPriceResponse = { [key: string]: { GBP: string; USD: string } };

const DEFAULT_COIN_PRICE = { GBP: '0', USD: '0' };

const CoinList = () => {
    const { state } = useGlobalStateContext();
    const { activeCoinCodes } = state;
    const { isLoading, data } = useCoinDataQuery();
    const { isLoading: isLoadingPrice, data: priceData } = useQuery<CoinPriceResponse, Error>(['coinsPrice', activeCoinCodes], () => fetchCoinPrice(activeCoinCodes));

    if (isLoading || isLoadingPrice) return <LoadingPanel />;

    return (
        <div className="coin-list">
            {activeCoinCodes.map(coinCode => {
                const coinData = data?.Data[coinCode];
                if (!coinData) return null;
                const coin = {
                    id: coinCode,
                    name: coinData.CoinName,
                    imageURL: coinData.ImageUrl,
                    code: coinCode,
                }

                return (
                    <CoinListItem
                        coin={coin}
                        isCurrencyDollar={state.isCurrencyDollar}
                        key={coin.id}
                        coinPrice={priceData?.[coin.code] || DEFAULT_COIN_PRICE}
                        isFavourite
                    />
                );
            })}
        </div>
    );
}

export default CoinList;
