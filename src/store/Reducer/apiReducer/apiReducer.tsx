import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { checkBoards, addBoard, deleteBoard, openBoard } from '../../api/boardApi';
import { BoardType } from '../../../types/types';
import { addColumn, deleteColumn, updateColumn } from '../../api/columnApi';
import { ColumnType, TaskType, SearchTaskType } from '../../../types/types';
import { addTask, deleteTask, updateTask, takeAllTasks } from '../../api/taskApi';
import { getUser, signIn, updateUser } from '../../api/signApi';

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
    [getUser.fulfilled.type]: (state, action) => {
      const user = action.payload.data;
      localStorage.setItem('userName', user.name);
    },
    [updateUser.fulfilled.type]: (state, action) => {
      const updatedUser = action.payload.data;
      localStorage.setItem('userName', updatedUser.name);
      localStorage.setItem('login', updatedUser.login);
    },
    [checkBoards.pending.type]: (state) => {
      state.process = 'loading';
    },
    [checkBoards.fulfilled.type]: (state, action) => {
      state.boards = [...action.payload.data];
      state.process = 'confirmed';
    },
    [checkBoards.rejected.type]: (state) => {
      localStorage.setItem('token', '');
      state.token = '';
      state.process = 'error';
    },
    [addBoard.fulfilled.type]: (state, action) => {
      state.boards.push({ ...action.payload.data });
    },
    [addBoard.rejected.type]: (state) => {
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
    [deleteBoard.rejected.type]: (state) => {
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
    [openBoard.rejected.type]: (state) => {
      localStorage.setItem('token', '');
      state.token = '';
      state.process = 'error';
    },
    [addColumn.fulfilled.type]: (state, action) => {
      const column = action.payload.data;
      column.tasks = [];
      state.board.columns.push(column);
    },
    [deleteColumn.fulfilled.type]: (state, action) => {
      const columnId = action.payload.columnId;
      const columns = state.board.columns.filter((column) => columnId !== column.id);
      state.deleteColumnId = '';
      state.board.columns = columns;
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
    [updateColumn.fulfilled.type]: (state, action) => {
      const columnId = action.payload.data.id;
      const { title, order } = action.payload.data;
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
    [updateTask.fulfilled.type]: (state, action) => {},
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
  },
});

export default apiSlice.reducer;
export const { addToken, logout, endDragnColumn, endDragnTask } = apiSlice.actions;
