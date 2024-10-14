import { useCallback, useEffect } from 'react';
import { atom, useAtom } from 'jotai';

const THEME_STORAGE_KEY = '@coinage/theme';

export enum ThemeMode {
    Light = 'light',
    Dark = 'dark',
}

export const themeModeAtom = atom(ThemeMode.Dark);

/** Handles color theming modes */
const useTheme = () => {
    const [themeMode, setThemeMode] = useAtom(themeModeAtom);

    /** Sets the theme mode on html attribute, local storage and state */
    const handleSetTheme = useCallback(
        (newTheme: ThemeMode) => {
            document.documentElement.setAttribute('color-mode', newTheme);
            localStorage.setItem(THEME_STORAGE_KEY, newTheme);
            setThemeMode(newTheme);
        },
        [setThemeMode],
    );

    /** Toggles theme mode between light and dark modes */
    const handleToggleThemeMode = useCallback(() => {
        const newThemeMode = themeMode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;
        handleSetTheme(newThemeMode);
    }, [themeMode, handleSetTheme]);

    // check previous settings and user preference and set default accordingly
    useEffect(() => {
        const userPreviousThemeSetting = localStorage.getItem(THEME_STORAGE_KEY);
        const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const defaultToDark = userPreviousThemeSetting === 'dark' || (userPrefersDark && !userPreviousThemeSetting);
        const defaultTheme = defaultToDark ? ThemeMode.Dark : ThemeMode.Light;
        handleSetTheme(defaultTheme);
    }, [handleSetTheme]);

    return {
        handleToggleThemeMode,
        themeMode,
    };
};

export default useTheme;
