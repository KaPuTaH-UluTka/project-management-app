import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { checkBoards, addBoard, deleteBoard, openBoard } from '../../api/boardApi';
import { BoardType, ITaskFilesInfo } from '../../../types/types';
import { addColumn, deleteColumn, updateColumn } from '../../api/columnApi';
import { ColumnType, TaskType, SearchTaskType } from '../../../types/types';
import {
  addTask,
  deleteTask,
  downloadFile,
  getTask,
  updateTask,
  updateTaskViaModal,
  takeAllTasks,
} from '../../api/taskApi';
import { delUser, getUser, signIn, signUp, updateUser } from '../../api/signApi';

const apiState = {
  token: localStorage.getItem('token'),
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
  taskFilesInfo: [] as ITaskFilesInfo[],
  taskFiles: [] as Blob[],
  tasks: [] as Array<SearchTaskType>,
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
      if (action.payload.updateLs) localStorage.setItem('userName', user.name);
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
      if (action.payload === 'error.unauthorized') state.token = '';
    },
    [checkBoards.pending.type]: (state) => {
      state.process = 'loading';
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
    [openBoard.pending.type]: (state) => {
      state.process = 'loading';
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
          const currentColumn = { ...state.board.columns[indexColumn] };
          currentColumn.title = title;
          state.board.columns[indexColumn] = { ...currentColumn };
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
    [updateColumn.rejected.type]: (state, action) => {
      state.apiErrors.push(`${action.payload}`);
    },
    [updateTask.rejected.type]: (state, action) => {
      state.apiErrors.push(`${action.payload}`);
    },
    [updateTaskViaModal.rejected.type]: (state, action) => {
      state.apiErrors.push(`${action.payload}`);
    },
    [getTask.fulfilled.type]: (state, action) => {
      state.taskFiles = [];
      const taskInfo = action.payload.data;
      state.taskTitle = taskInfo.title;
      state.taskDesc = taskInfo.description;
      state.taskFilesInfo = taskInfo.files;
    },
    [getTask.rejected.type]: (state, action) => {
      state.apiErrors.push(`${action.payload}`);
    },
    [downloadFile.fulfilled.type]: (state, action) => {
      const response = action.payload.data;
      if (state.taskFilesInfo.length !== state.taskFiles.length) {
        state.taskFiles.push(response);
      }
    },
    [downloadFile.rejected.type]: (state, action) => {
      state.apiErrors.push(`${action.payload}`);
    },
    [takeAllTasks.pending.type]: (state) => {
      state.process = 'loading';
    },
    [takeAllTasks.fulfilled.type]: (state, action) => {
      const { data, searchValue, select } = action.payload;
      let tasks;
      switch (select) {
        case 'user':
          tasks = data.filter(
            (task: SearchTaskType) => task.user.name.toUpperCase() === searchValue.toUpperCase()
          );
          break;
        case 'description':
          tasks = data.filter((task: SearchTaskType) => task.description.includes(searchValue));
          break;
        case 'title':
          tasks = data.filter(
            (task: SearchTaskType) => task.title.toUpperCase() === searchValue.toUpperCase()
          );
          break;
      }
      state.tasks = [...tasks];
      state.process = 'confirmed';
    },
    [takeAllTasks.rejected.type]: (state, action) => {
      state.apiErrors.push(`${action.payload}`);
    },
  },
});

export default apiSlice.reducer;
export const { addToken, logout, endDragnColumn, endDragnTask, shiftApiErrors } = apiSlice.actions;
