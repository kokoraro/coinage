import { useCallback, useEffect } from 'react';
import { atom, useAtom } from 'jotai';

export enum ThemeMode {
    Light = 'light',
    Dark = 'dark',
}

export const themeModeAtom = atom(ThemeMode.Dark);

const useTheme = () => {
    const [themeMode, setThemeMode] = useAtom(themeModeAtom);

    const handleSetTheme = useCallback(
        (newTheme: ThemeMode) => {
            document.documentElement.setAttribute('color-mode', newTheme);
            setThemeMode(newTheme);
        },
        [setThemeMode],
    );

    const handleToggleThemeMode = useCallback(() => {
        const newThemeMode = themeMode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;
        handleSetTheme(newThemeMode);
    }, [themeMode, handleSetTheme]);

    useEffect(() => {
        const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const defaultTheme = userPrefersDark ? ThemeMode.Dark : ThemeMode.Light;
        handleSetTheme(defaultTheme);
    }, [handleSetTheme]);

    return {
        handleToggleThemeMode,
        themeMode,
    };
};

export default useTheme;
