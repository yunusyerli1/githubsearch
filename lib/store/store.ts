import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './features/tableSlice';
import modalReducer from './features/modalSlice';
import campaignReducer from './features/campaignSlice';
import searchReducer from './features/searchSlice';

export const store = configureStore({
  reducer: {
    table: tableReducer,
    modal: modalReducer,
    campaign: campaignReducer,
    search: searchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
