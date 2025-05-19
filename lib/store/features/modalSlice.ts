import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  title: string;
  contentType: string | null; // Instead of ReactNode
  contentProps: any; // Props for the component
  modalType?: string;
}

interface OpenModalPayload {
  title: string;
  contentType: string;
  contentProps: any;
  modalType?: string;
}

const initialState: ModalState = {
  isOpen: false,
  title: '',
  contentType: null,
  contentProps: null,
  modalType: undefined,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state: ModalState, action: PayloadAction<OpenModalPayload>) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.contentType = action.payload.contentType;
      state.contentProps = action.payload.contentProps;
      state.modalType = action.payload.modalType;
    },
    closeModal: (state: ModalState) => {
      state.isOpen = false;
      state.title = '';
      state.contentType = null;
      state.contentProps = null;
      state.modalType = undefined;
    },
  },
});

export const {
  openModal,
  closeModal
} = modalSlice.actions;

export default modalSlice.reducer; 