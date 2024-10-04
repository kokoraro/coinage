import React from 'react';
import CoinListItem from './CoinListItem';
import LoadingPanel from '../ui/LoadingPanel';
import { useQuery } from 'react-query';
import { fetchCoinData, fetchCoinPrice } from '../api/coins';
import { useGlobalStateContext } from '../../utils/GlobalStateProvider';

interface CoinResponse {
    CoinName: string;
    ImageUrl: string;
}
interface CoinDataResponse {
    Data: { [key: string]: CoinResponse }
}

type CoinPriceResponse = { [key: string]: { GBP: string; USD: string } };

const DEFAULT_COIN_PRICE = { GBP: '0', USD: '0' };

const CoinList = () => {
    const { state } = useGlobalStateContext();
    const { activeCoinCodes } = state;
    // TODO: Make this optimistic
    const { isLoading, data } = useQuery<CoinDataResponse, Error>('coins', fetchCoinData);
    const { isLoading: isLoadingPrice, data: priceData } = useQuery<CoinPriceResponse, Error>(['coinsPrice', activeCoinCodes], () => fetchCoinPrice(activeCoinCodes));

    if (isLoading || isLoadingPrice) return <LoadingPanel />;

    const coinData = Object.entries(data?.Data || {}).map(([key, coin], index) => ({
        id: index,
        name: coin.CoinName,
        imageURL: coin.ImageUrl,
        code: key,
        showing: state.activeCoinCodes.includes(key),
        price: { GBP: '0', USD: '0' },
    }));

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
