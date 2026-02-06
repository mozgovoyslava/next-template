import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import type { ReactElement, ReactNode } from 'react';
import { makeStore } from '@/shared/lib/store';
import type { AppStore, PreloadedState } from '@/shared/lib/store';

export interface RenderWithProvidersOptions {
    initialState?: PreloadedState;
    store?: AppStore;
    renderOptions?: Omit<RenderOptions, 'wrapper'>;
}

export const renderWithProviders = (
    ui: ReactElement,
    { initialState, store = makeStore(initialState), renderOptions }: RenderWithProvidersOptions = {},
) => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={store}>{children}</Provider>
    );

    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    };
};
