import { memo, useCallback } from 'react';
import { useAtom } from 'jotai';
import { useIsFetching, useQueryClient } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ThemeMode, isCurrencyDollarAtom, isFavouritesViewAtom } from '@/store/global';
import queryKeys from '@/config/query-keys';
import useTheme from '@/hooks/useTheme';

interface ControlItemProps {
    icon: IconProp;
    text?: string;
    onClick: () => void;
    iconSpin?: boolean;
    active?: boolean;
    testIdPrefix?: string;
}

const ControlItem = memo(({ icon, text, onClick, iconSpin, active, testIdPrefix }: ControlItemProps) => (
    <div
        className={`control-item ${active ? 'active' : ''}`}
        onClick={onClick}
        data-testid={testIdPrefix ? `${testIdPrefix}${active ? '-active' : ''}` : icon}
    >
        <FontAwesomeIcon icon={icon} spin={iconSpin} data-testid={iconSpin ? 'loading-spinner' : ''} />
        {text && <p className="control-item-text">{text}</p>}
    </div>
));

ControlItem.displayName = 'ControlItem';

const Header = (): JSX.Element => {
    const [isFavouritesView, setIsFavouritesView] = useAtom(isFavouritesViewAtom);
    const [isCurrencyDollar, setIsCurrencyDollar] = useAtom(isCurrencyDollarAtom);
    const { themeMode, handleToggleThemeMode } = useTheme();

    const queryClient = useQueryClient();
    const isFetchingCount = useIsFetching({ queryKey: queryKeys.coinPrices });
    const isLoadingPrices = isFetchingCount > 0;

    const handleToggleFavourites = useCallback(() => {
        setIsFavouritesView(!isFavouritesView);
    }, [isFavouritesView, setIsFavouritesView]);

    const handleToggleIsDollar = useCallback(() => {
        setIsCurrencyDollar(!isCurrencyDollar);
    }, [isCurrencyDollar, setIsCurrencyDollar]);

    const handleRefresh = useCallback(() => {
        void queryClient.invalidateQueries([queryKeys.news, queryKeys.coinPrices]);
    }, [queryClient]);

    return (
        <div className="header">
            <h1>coinage</h1>

            <div className="controls">
                <ControlItem icon="star" active={isFavouritesView} text="Favourites" onClick={handleToggleFavourites} testIdPrefix="favourites" />
                <ControlItem icon="list" active={!isFavouritesView} text="Full List" onClick={handleToggleFavourites} testIdPrefix="full-list" />
                <ControlItem icon={isCurrencyDollar ? 'pound-sign' : 'dollar-sign'} onClick={handleToggleIsDollar} />
                <ControlItem icon={themeMode === ThemeMode.Light ? 'sun' : 'moon'} onClick={handleToggleThemeMode} />
                <ControlItem icon="sync" onClick={handleRefresh} iconSpin={isLoadingPrices} />
            </div>
        </div>
    );
};

export default memo(Header);
