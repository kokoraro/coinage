export interface Coin {
    id: string;
    code: string;
    name: string;
    imageURL: string;
}

export interface CoinPrice {
    GBP: string;
    USD: string;
}

export type CoinPriceResponse = { [key: string]: CoinPrice };

interface CoinResponse {
    CoinName: string;
    ImageUrl: string;
}

export interface CoinDataResponse {
    Data: Record<string, CoinResponse>;
}
