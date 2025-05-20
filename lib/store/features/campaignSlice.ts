import { ICampaign } from '@/lib/models/ICampaign';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CampaignState {
  campaigns: ICampaign[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CampaignState = {
  campaigns: [],
  isLoading: false,
  error: null,
};

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    setCampaigns: (state, action: PayloadAction<ICampaign[]>) => {
      state.campaigns = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
});

export const { 
  setCampaigns, 
  setLoading, 
  setError
} = campaignSlice.actions;

export default campaignSlice.reducer; 