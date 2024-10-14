import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import type { WritableAtom } from 'jotai/vanilla';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyWritableAtom = WritableAtom<unknown, any[], any>;
type AtomTuple<A = AnyWritableAtom, V = unknown> = readonly [A, V];

interface TestProviderProps {
    initialValues: AtomTuple<AnyWritableAtom, unknown>[];
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
