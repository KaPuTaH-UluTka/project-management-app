import { createSlice } from '@reduxjs/toolkit';
const openModalState = {
  modal: false,
  headerBar: false,
  deleteBoardId: '',
};
const openModalSlice = createSlice({
  name: 'openModal',
  initialState: { ...openModalState },
  reducers: {
    openModal: (state, action) => {
      state.modal = true;
      state.deleteBoardId = action.payload.id;
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
