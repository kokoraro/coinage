import { useQuery } from "react-query";
import { fetchCoinData } from "../api/coins";

interface CoinResponse {
    CoinName: string;
    ImageUrl: string;
}

interface CoinDataResponse {
    Data: Record<string, CoinResponse>;
}

const useCoinDataQuery = () => {
    return useQuery<CoinDataResponse, Error>('coins', fetchCoinData, { staleTime: 1000 * 60 * 5 });
}

export default useCoinDataQuery;
