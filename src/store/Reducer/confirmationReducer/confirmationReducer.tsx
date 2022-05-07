import { createSlice } from '@reduxjs/toolkit';
const openModalState = {
  modal: false,
  headerBar: false,
};
const openModalSlice = createSlice({
  name: 'openModal',
  initialState: { ...openModalState },
  reducers: {
    openModal: (state) => {
      state.modal = true;
    },
    closeModal: (state) => {
      state.modal = false;
    },
    toggleBar: (state) => {
      state.headerBar = !state.headerBar;
    },
  },
  extraReducers: {},
});

export default openModalSlice.reducer;
export const { openModal, closeModal, toggleBar } = openModalSlice.actions;
