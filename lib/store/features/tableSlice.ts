import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TableState {
  currentPage: number;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  recordsPerPage: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: TableState = {
  currentPage: 1,
  sortField: '',
  sortDirection: 'asc',
  recordsPerPage: 15,
  isLoading: false,
  error: null,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSortField: (state, action: PayloadAction<string>) => {
      state.sortField = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortDirection = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentPage,
  setSortField,
  setSortDirection,
  setLoading,
  setError,
} = tableSlice.actions;

export default tableSlice.reducer; 