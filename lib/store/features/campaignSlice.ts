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
    },
    addCampaign: (state, action: PayloadAction<ICampaign>) => {
      state.campaigns.push(action.payload);
    },
    updateCampaign: (state, action: PayloadAction<ICampaign>) => {
      const index = state.campaigns.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.campaigns[index] = action.payload;
      }
    },
    deleteCampaign: (state, action: PayloadAction<number>) => {
      state.campaigns = state.campaigns.filter(c => c.id !== action.payload);
    },
  },
});

export const { 
  setCampaigns, 
  setLoading, 
  setError,
  addCampaign,
  updateCampaign,
  deleteCampaign
} = campaignSlice.actions;

export default campaignSlice.reducer; 