import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { ThemeMode, themeModeAtom } from '@/store/global';

const useTheme = () => {
    const [themeMode, setThemeMode] = useAtom(themeModeAtom);

    const handleSetThemeAttribute = useCallback((newColorMode: 'light' | 'dark') => {
        document.documentElement.setAttribute('color-mode', newColorMode);
    }, []);

    const handleToggleThemeMode = useCallback(() => {
        const newThemeMode = themeMode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;
        handleSetThemeAttribute(newThemeMode);
        setThemeMode(newThemeMode);
    }, [themeMode, setThemeMode, handleSetThemeAttribute]);

    return {
        handleToggleThemeMode,
        themeMode,
    };
};

export default useTheme;
