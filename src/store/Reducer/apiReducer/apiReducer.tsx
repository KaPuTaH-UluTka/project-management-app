import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { checkBoards, addBoard, deleteBoard, openBoard } from '../../api/boardApi';
import { BoardType, ITaskFiles } from '../../../types/types';
import { addColumn, deleteColumn, updateColumn } from '../../api/columnApi';
import { ColumnType, TaskType } from '../../../types/types';
import { addTask, deleteTask, getTask, updateTask, updateTaskViaModal } from '../../api/taskApi';
import { delUser, getUser, signIn, signUp, updateUser } from '../../api/signApi';

const apiState = {
  token: '',
  boards: [] as Array<{ title: string; description: string; id: string }>,
  deleteBoardId: '',
  deleteColumnId: '',
  deleteTaskId: '',
  board: { id: '', title: '', description: '', columns: [] } as BoardType,
  oldOrder: '',
  column: {} as ColumnType,
  process: 'loading',
  apiErrors: [] as Array<string>,
  taskTitle: '',
  taskDesc: '',
  taskFiles: [] as ITaskFiles[],
};

const apiSlice = createSlice({
  name: 'login',
  initialState: { ...apiState },
  reducers: {
    addToken: (state) => {
      state.token = localStorage.getItem('token')
        ? (localStorage.getItem('token') as string)
        : ('' as string);
    },
    logout: (state) => {
      localStorage.setItem('token', '');
      state.token = '';
    },

    endDragnColumn: (state, action) => {
      state.board.columns = [...action.payload.currentColumns];
    },

    endDragnTask: (state, action) => {
      const { newColumnIndex, oldColumnIndex, oldColumnTasks, currentColumnTasks } = action.payload;
      state.board.columns[oldColumnIndex].tasks = [...oldColumnTasks];
      state.board.columns[newColumnIndex].tasks = [...currentColumnTasks];
    },

    shiftApiErrors: (state) => {
      state.apiErrors.shift();
    },
  },
  extraReducers: {
    [signIn.fulfilled.type]: (state, action) => {
      const token = action.payload.data;
      const decoderData: { userId: string; login: string } = jwt_decode(token);
      const { userId, login } = decoderData;
      localStorage.setItem('token', token);
      localStorage.setItem('userID', userId);
      localStorage.setItem('login', login);
      state.token = token;
    },
    [signIn.rejected.type]: (state, action) => {
      state.apiErrors.push(`${action.payload}`);
    },
    [signUp.rejected.type]: (state, action) => {
      state.apiErrors.push(`${action.payload}`);
    },
    [getUser.fulfilled.type]: (state, action) => {
      const user = action.payload.data;
      localStorage.setItem('userName', user.name);
    },
    [getUser.rejected.type]: (state, action) => {
      state.apiErrors.push(`${action.payload}`);
    },
    [delUser.fulfilled.type]: (state) => {
      localStorage.setItem('token', '');
      state.token = '';
    },
    [updateUser.fulfilled.type]: (state, action) => {
      const updatedUser = action.payload.data;
      localStorage.setItem('userName', updatedUser.name);
      localStorage.setItem('login', updatedUser.login);
    },
    [updateUser.rejected.type]: (state, action) => {
      state.apiErrors.push(`${action.payload}`);
    },
    [checkBoards.fulfilled.type]: (state, action) => {
      state.boards = [...action.payload.data];
      state.process = 'confirmed';
    },
    [checkBoards.rejected.type]: (state, action) => {
      state.apiErrors.push(`${action.payload}`);
      localStorage.setItem('token', '');
      state.token = '';
      state.process = 'error';
    },
    [addBoard.fulfilled.type]: (state, action) => {
      state.boards.push({ ...action.payload.data });
    },
    [addBoard.rejected.type]: (state, action) => {
      state.apiErrors.push(`${action.payload}`);
      localStorage.setItem('token', '');
      state.token = '';
      state.process = 'error';
    },
    [deleteBoard.fulfilled.type]: (state, action) => {
      const boards = state.boards.filter((item) => action.payload.boardId !== item.id) as Array<{
        title: string;
        description: string;
        id: string;
      }>;
      state.deleteBoardId = '';
      state.process = 'confirmed';
      state.boards = boards;
    },
    [deleteBoard.rejected.type]: (state, action) => {
      state.apiErrors.push(`${action.payload}`);
      localStorage.setItem('token', '');
      state.token = '';
      state.process = 'error';
    },
    [openBoard.fulfilled.type]: (state, action) => {
      const board = { ...action.payload.data };
      board.columns = board.columns.sort((a: ColumnType, b: ColumnType) => a.order - b.order);
      board.columns = board.columns.map((column: ColumnType) => {
        column.tasks = [...column.tasks?.sort((a: TaskType, b: TaskType) => a.order - b.order)];
        return column;
      });
      state.board = board;
      state.process = 'confirmed';
    },
    [openBoard.rejected.type]: (state, action) => {
      state.apiErrors.push(`${action.payload}`);
      // localStorage.setItem('token', '');
      // state.token = '';
      // state.process = 'error';
    },
    [addColumn.fulfilled.type]: (state, action) => {
      const column = action.payload.data;
      column.tasks = [];
      state.board.columns.push(column);
    },
    [addColumn.rejected.type]: (state, action) => {
      state.apiErrors.push(`${action.payload}`);
    },
    [deleteColumn.fulfilled.type]: (state, action) => {
      const columnId = action.payload.columnId;
      const columns = state.board.columns.filter((column) => columnId !== column.id);
      state.deleteColumnId = '';
      state.board.columns = columns;
    },
    [deleteColumn.rejected.type]: (state, action) => {
      state.apiErrors.push(`${action.payload}`);
    },
    [addTask.fulfilled.type]: (state, action) => {
      const columnId = action.payload.data.columnId;
      const indexColumnChanges = state.board.columns.findIndex((item) => item.id === columnId);
      if (state.board.columns[indexColumnChanges].tasks) {
        state.board.columns[indexColumnChanges].tasks.push(action.payload.data);
      } else {
        state.board.columns[indexColumnChanges].tasks = [action.payload.data];
      }
    },
    [addTask.rejected.type]: (state, action) => {
      state.apiErrors.push(`${action.payload}`);
    },
    [deleteTask.fulfilled.type]: (state, action) => {
      const { columnId, taskId } = action.payload;
      const indexColumn = state.board.columns.findIndex((item) => item.id === columnId);
      const indexTask = state.board.columns[indexColumn].tasks?.findIndex(
        (item) => item.id === taskId
      );
      state.deleteColumnId = '';
      state.deleteTaskId = '';
      if (indexTask !== -1) {
        state.board.columns[indexColumn].tasks?.splice(indexTask, 1);
      }
    },
    [deleteTask.rejected.type]: (state, action) => {
      state.apiErrors.push(`${action.payload}`);
    },
    [updateColumn.fulfilled.type]: (state, action) => {
      const columnId = action.payload.data.id;
      const { title } = action.payload.data;
      switch (action.payload.event) {
        case 'changeName':
          const indexColumn = state.board.columns.findIndex((item) => item.id === columnId);
          state.board.columns[indexColumn].title = title;
          break;
        case 'addEndPosition':
          break;
        case 'changePosition':
          break;
      }
    },
    [updateColumn.rejected.type]: (state, action) => {
      state.apiErrors.push(`${action.payload}`);
    },
    [updateTask.fulfilled.type]: () => {},
    [updateTaskViaModal.fulfilled.type]: () => {},
    [getTask.fulfilled.type]: (state, action) => {
      const taskInfo = action.payload.data;
      state.taskTitle = taskInfo.title;
      state.taskDesc = taskInfo.description;
      state.taskFiles = taskInfo.files;
    },
  },
});

export default apiSlice.reducer;
export const { addToken, logout, endDragnColumn, endDragnTask, shiftApiErrors } = apiSlice.actions;
