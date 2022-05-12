import { createSlice } from '@reduxjs/toolkit';
const openModalState = {
  createBoardModal: false,
  confirmModal: false,
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
          createBoardModal?: string;
          confirmModal?: string;
        };
      }
    ) => {
      if (action.payload.createBoardModal == 'createBoardModal') {
        state.createBoardModal = true;
      }
      if (action.payload.confirmModal == 'confirmModal') {
        state.confirmModal = true;
      }
      state.deleteBoardId = action.payload.boardId || '';
      state.deleteColumnId = action.payload.columnId || '';
      state.deleteTaskId = action.payload.taskId || '';
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
