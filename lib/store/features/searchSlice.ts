import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRepository } from '@/lib/models/IRepository';

export type SortOption = 'stars' | 'forks' | 'updated' | '';

interface SearchState {
  currentQuery: string;
  isLoading: boolean;
  error: string | null;
  sortBy: SortOption;
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  totalCount: number;
  itemsPerPage: number;
  repositories: IRepository[];
}

const initialState: SearchState = {
  currentQuery: '',
  isLoading: false,
  error: null,
  sortBy: '',
  sortOrder: 'desc',
  currentPage: 1,
  totalCount: 0,
  itemsPerPage: 10,
  repositories: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCurrentQuery: (state, action: PayloadAction<string>) => {
      state.currentQuery = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetSearch: (state) => {
      state.currentQuery = '';
      state.error = null;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setRepositories: (state, action: PayloadAction<IRepository[]>) => {
      state.repositories = action.payload;
    },
  },
});

export const {
  setCurrentQuery,
  setLoading,
  setError,
  resetSearch,
  setSortBy,
  setSortOrder,
  setCurrentPage,
  setTotalCount,
  setRepositories
} = searchSlice.actions;

export default searchSlice.reducer; 