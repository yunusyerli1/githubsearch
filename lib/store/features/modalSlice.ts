import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

interface OpenModalPayload {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

const initialState: ModalState = {
  isOpen: false,
  title: '',
  content: null,
  onClose: () => {},
  onConfirm: () => {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<OpenModalPayload>) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.onClose = action.payload.onClose;
      state.onConfirm = action.payload.onConfirm;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = '';
      state.content = null;
      state.onClose = () => {};
      state.onConfirm = () => {};
    },
  },
});

export const {
  openModal,
  closeModal
} = modalSlice.actions;

export default modalSlice.reducer; 