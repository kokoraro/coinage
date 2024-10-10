import { it, describe } from 'vitest';
import { formatCoinPrice } from './utils';

describe('formatCoinPrice util', () => {
    const coinPrice = { USD: '9.99', GBP: '6.66' };

    it('should show correct price for dollar', () => {
        expect(formatCoinPrice(coinPrice, true)).toBe('$9.99');
    });

    it('should show correct price for sterling', () => {
        expect(formatCoinPrice(coinPrice, false)).toBe('£6.66');
    });
});
