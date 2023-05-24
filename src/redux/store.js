import { configureStore } from '@reduxjs/toolkit';
import { globalStoreSlice } from './features/globalStoreSlice';

export const store = configureStore({
  reducer: {
    globalStore: globalStoreSlice.reducer,
  },
});
