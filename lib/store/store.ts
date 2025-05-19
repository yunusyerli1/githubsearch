import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './features/tableSlice';
import modalReducer from './features/modalSlice';
import campaignReducer from './features/campaignSlice';

export const store = configureStore({
  reducer: {
    table: tableReducer,
    modal: modalReducer,
    campaign: campaignReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
