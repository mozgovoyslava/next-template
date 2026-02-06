import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { counterReducer } from '@/features/counter/model/counterSlice';
import { baseApi } from '@/shared/api';

const rootReducer = combineReducers({
    counter: counterReducer,
    [baseApi.reducerPath]: baseApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type PreloadedState = Partial<RootState>;

export const makeStore = (preloadedState?: PreloadedState) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(baseApi.middleware),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
