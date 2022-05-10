import { createSlice } from '@reduxjs/toolkit';
const openModalState = {
  createBoardModal: false,
  confirmModal: false,
  headerBar: false,
};
const openModalSlice = createSlice({
  name: 'openModal',
  initialState: { ...openModalState },
  reducers: {
    openModal: (state, action) => {
      if (action.payload == 'createBoardModal') {
        state.createBoardModal = true;
      }
      if (action.payload == 'confirmModal') {
        state.confirmModal = true;
      }
    },
    closeModal: (state, action) => {
      if (action.payload == 'createBoardModal') {
        state.createBoardModal = false;
      }
      if (action.payload == 'confirmModal') {
        state.confirmModal = false;
      }
    },
    toggleBar: (state) => {
      state.headerBar = !state.headerBar;
    },
  },
  extraReducers: {},
});

export default openModalSlice.reducer;
export const { openModal, closeModal, toggleBar } = openModalSlice.actions;
