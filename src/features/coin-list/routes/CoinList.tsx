import { useQuery } from 'react-query';
import { useAtom } from 'jotai';
import { favouriteCoinCodesDerivedAtom } from '@/store/global';
import LoadingPanel from '@/components/ui/LoadingPanel';
import CoinListItem from '../components/CoinListItem';
import { fetchCoinPrice } from '../api/coins';
import useCoinDataQuery from '../hooks/useCoinDataQuery';
import queryKeys from '@/config/query-keys';

const DEFAULT_COIN_PRICE = { GBP: '0', USD: '0' };

export const CoinList = () => {
    const [activeCoinCodes] = useAtom(favouriteCoinCodesDerivedAtom);
    const { isLoading, data } = useCoinDataQuery();
    const { isLoading: isLoadingPrice, data: priceData } = useQuery([queryKeys.coinPrices, activeCoinCodes], () => fetchCoinPrice(activeCoinCodes));

    if (isLoading || isLoadingPrice) return <LoadingPanel />;

    return (
        <div className="coin-list">
            {activeCoinCodes.map((coinCode) => {
                const coinData = data?.Data[coinCode];
                if (!coinData) return null;
                const coin = {
                    id: coinCode,
                    name: coinData.CoinName,
                    imageURL: coinData.ImageUrl,
                    code: coinCode,
                };

                return <CoinListItem coin={coin} key={coin.id} coinPrice={priceData?.[coin.code] || DEFAULT_COIN_PRICE} isFavourite />;
            })}
        </div>
    );
};
