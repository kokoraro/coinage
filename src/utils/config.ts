export const DEFAULT_FAVOURITE_COINS = ['BTC', 'XRP', 'LTC', 'ETH', 'XMR', 'ZEC', 'DSH', 'GNT', 'ADA', 'XVG'];

const config = {
    apiUrl: import.meta.env.REACT_APP_API_ENDPOINT || 'https://min-api.cryptocompare.com',
    defaultFavouriteCoins: DEFAULT_FAVOURITE_COINS,
};

export default config;
