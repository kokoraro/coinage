const DEFAULT_FAVOURITE_COINS = [
    'BTC', 'XRP', 'LTC', 'ETH', 'XMR',
    'ZEC', 'DSH', 'GNT', 'ADA', 'XVG',
];

export default {
    apiUrl: process.env.REACT_APP_API_ENDPOINT || 'https://min-api.cryptocompare.com',
    defaultFavouriteCoins: DEFAULT_FAVOURITE_COINS,
}