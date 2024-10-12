import { useAtom } from 'jotai';
import { favouriteCoinCodesDerivedAtom } from '@/store/global';
import LoadingPanel from '@/components/ui/LoadingPanel';
import PaginatedList from '@/components/ui/pagination/PaginatedList';
import useCoinDataQuery from '../hooks/useCoinDataQuery';
import CoinListItem from '../components/CoinListItem';

export const FullCoinList = () => {
    const { isLoading, data } = useCoinDataQuery();
    const [activeCoinCodes] = useAtom(favouriteCoinCodesDerivedAtom);

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
                renderItem={({ item }) => <CoinListItem coin={item} key={item.id} isFavourite={activeCoinCodes.includes(item.code)} />}
            />
        </div>
    );
};
