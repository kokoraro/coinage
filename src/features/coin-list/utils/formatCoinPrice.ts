import { CoinPrice } from '../types/';

/**
 * Formats coin price object for human readability
 * @example formatCoinPrice({ USD: 2.2223434, GBP: 1.3124354 }, true) // returns '$2.22'
 */
export function formatCoinPrice(coinPrice: CoinPrice, isCurrencyDollar: boolean) {
    const currency = isCurrencyDollar ? 'USD' : 'GBP';
    const currSymbol = isCurrencyDollar ? '$' : '£';
    const price = Number(coinPrice[currency]);
    const value = price >= 1 ? price.toFixed(2) : price.toFixed(5);

    return `${currSymbol}${value}`;
}
