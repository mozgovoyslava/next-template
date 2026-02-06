'use client';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { makeStore } from '@/shared/lib/store';
import type { AppStore } from '@/shared/lib/store';

interface ProvidersProps {
    children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
    const [store] = useState<AppStore>(() => makeStore());

    useEffect(() => {
        setupListeners(store.dispatch);
    }, [store]);

    return <Provider store={store}>{children}</Provider>;
};
