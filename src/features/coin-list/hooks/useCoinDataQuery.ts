import { useQuery } from 'react-query';
import { fetchCoinData } from '../api/coins';
import queryKeys from '@/config/query-keys';

const FIVE_MINUTES_IN_MILLISECONDS = 1000 * 60 * 5;

const useCoinDataQuery = () => {
    return useQuery(queryKeys.coins, fetchCoinData, { staleTime: FIVE_MINUTES_IN_MILLISECONDS });
};

export default useCoinDataQuery;
