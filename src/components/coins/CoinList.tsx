import React from 'react';
import CoinListItem from './CoinListItem';
import LoadingPanel from '../ui/LoadingPanel';
import { useQuery } from 'react-query';
import { Coin, fetchCoinPrice } from '../api/coins';

interface CoinListProps {
    coinData: Coin[];
    isCurrencyDollar: boolean;
    loading: boolean;
    isFavouritesView: boolean;
    activeCoinCodes: string[];
    setActiveCoinCodes: (coinCodes: string[]) => void;
}

type CoinPriceResponse = { [key: string]: { GBP: string; USD: string } };

const CoinList = ({
    coinData,
    isCurrencyDollar,
    loading,
    isFavouritesView,
    activeCoinCodes,
    setActiveCoinCodes,
}: CoinListProps) => {
    const { isLoading: isLoadingPrice, data: priceData } = useQuery<CoinPriceResponse, Error>('coinsPrice', () => fetchCoinPrice(activeCoinCodes));

    if (loading || isLoadingPrice) return <LoadingPanel />;

    const handleFavouriteClick = (coinCode: string) => {
        if (activeCoinCodes.includes(coinCode)) {
            const newCoinCodes = activeCoinCodes.filter(code => coinCode !== code);
            setActiveCoinCodes(newCoinCodes);
            return;
        }
        setActiveCoinCodes([...activeCoinCodes, coinCode]);
    }

    const favouriteCoins = coinData.filter(coin => activeCoinCodes.includes(coin.code));
    const coinsWithPrices = favouriteCoins.map(coin => ({ ...coin, price: priceData?.[coin.code] || { GBP: '0', USD: '0' }}));

    return (
        <div className="coin-list">
            {coinsWithPrices.map(coin => (
                <CoinListItem
                    coin={coin}
                    isCurrencyDollar={isCurrencyDollar}
                    key={coin.id}
                    isFavouritesView={isFavouritesView}
                    handleFavouriteClick={handleFavouriteClick}
                />
            ))}
        </div>
    );
}


export default CoinList;
