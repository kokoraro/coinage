import { atom } from 'jotai';
import { DEFAULT_FAVOURITE_COINS } from '../utils/config';

export const isFavouritesViewAtom = atom(true);
export const isCurrencyDollarAtom = atom(true);
export const favouriteCoinCodesAtom = atom(DEFAULT_FAVOURITE_COINS);

export const favouriteCoinCodesDerivedAtom = atom(
    (get) => get(favouriteCoinCodesAtom),
    (get, set, code: string) => {
        const currentCodes = get(favouriteCoinCodesAtom);
        if (currentCodes.includes(code)) {
            const updatedCodes = currentCodes.filter((item) => item !== code);
            set(favouriteCoinCodesAtom, updatedCodes);
        } else {
            set(favouriteCoinCodesAtom, [...currentCodes, code]);
        }
    },
);
