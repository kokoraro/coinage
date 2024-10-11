import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

interface TestProviderProps {
    initialValues: any;
    children: JSX.Element;
}

const HydrateAtoms = ({ initialValues, children }: TestProviderProps) => {
    useHydrateAtoms(initialValues);
    return children;
};

export const TestProvider = ({ initialValues, children }: TestProviderProps) => (
    <Provider>
        <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
    </Provider>
);
