import { createSlice } from '@reduxjs/toolkit';
const openModalState = {
  modal: false,
  headerBar: false,
  deleteBoardId: '',
  deleteColumnId: '',
  deleteTaskId: '',
};
const openModalSlice = createSlice({
  name: 'openModal',
  initialState: { ...openModalState },
  reducers: {
    openModal: (
      state,
      action: {
        payload: {
          boardId?: string;
          columnId?: string;
          taskId?: string;
        };
      }
    ) => {
      state.modal = true;
      state.deleteBoardId = action.payload.boardId || '';
      state.deleteColumnId = action.payload.columnId || '';
      state.deleteTaskId = action.payload.taskId || '';
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
