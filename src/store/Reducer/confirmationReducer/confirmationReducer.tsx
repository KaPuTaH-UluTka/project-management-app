import { createSlice } from '@reduxjs/toolkit';
const openModalState = {
  createBoardModal: false,
  confirmModal: false,
  headerBar: false,
  createColumnModal: false,
  createTaskModal: false,
  updateTaskModal: false,
  deleteUserModal: false,
  deleteBoardId: '',
  deleteColumnId: '',
  deleteTaskId: '',
  order: 1,
  columnId: '',
  taskId: '',
  userId: '',
  done: false,
};
const openModalSlice = createSlice({
  name: 'openModal',
  initialState: { ...openModalState },
  reducers: {
    openModal: (
      state,
      action: {
        payload: {
          order?: number;
          boardId?: string;
          columnId?: string;
          taskId?: string;
          modal?: string;
          userId?: string;
          done?: boolean;
        };
      }
    ) => {
      switch (action.payload.modal) {
        case 'createBoardModal':
          state.createBoardModal = true;
          break;
        case 'confirmModal':
          state.confirmModal = true;
          break;
        case 'createColumnModal':
          state.createColumnModal = true;
          state.order = action.payload.order || 1;
          break;
        case 'createTaskModal':
          state.userId = action.payload.userId || '';
          state.columnId = action.payload.columnId || '';
          state.order = action.payload.order || 1;
          state.createTaskModal = true;
          break;
        case 'updateTaskModal':
          state.taskId = action.payload.taskId || '';
          state.columnId = action.payload.columnId || '';
          state.userId = action.payload.userId || '';
          state.done = action.payload.done || false;
          state.updateTaskModal = true;
          state.taskId = action.payload.taskId || '';
          state.columnId = action.payload.columnId || '';
          state.userId = action.payload.userId || '';
          state.done = action.payload.done || false;
          break;
        case 'deleteUserModal':
          state.userId = action.payload.userId || '';
          state.deleteUserModal = true;
          break;
      }
      state.deleteBoardId = action.payload.boardId || '';
      state.deleteColumnId = action.payload.columnId || '';
      state.deleteTaskId = action.payload.taskId || '';
    },
    closeModal: (state, action) => {
      switch (action.payload) {
        case 'closeCreateModal':
          state.createBoardModal = false;
          state.createColumnModal = false;
          state.createTaskModal = false;
          state.updateTaskModal = false;
          break;
        case 'confirmModal':
          state.confirmModal = false;
          break;
        case 'updateTaskModal':
          state.updateTaskModal = false;
          break;
        case 'deleteUserModal':
          state.userId = '';
          state.deleteUserModal = false;
          break;
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
