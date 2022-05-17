import { createSlice, current } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { checkBoards, addBoard, deleteBoard, openBoard } from '../../api/boardApi';
import { BoardType } from '../../../types/types';
import { addColumn, deleteColumn, updateColumn } from '../../api/columnApi';
import { ColumnType, TaskType } from '../../../types/types';
import { addTask, deleteTask } from '../../api/taskApi';
import { getUser, signIn, updateUser } from '../../api/signApi';

const apiState = {
  token: '',
  boards: [] as Array<{ title: string; id: string }>,
  deleteBoardId: '',
  deleteColumnId: '',
  deleteTaskId: '',
  board: { id: '', title: '', columns: [] } as BoardType,
  oldOrder: '',
  column: {} as ColumnType,
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
      state.board.columns = action.payload.currentColumns;
      // const { destination, source, draggableId } = action.payload.result;
      // const beforeIndex = source.index;
      // const currentIndex = destination.index;
      // const currentState = [...state.board.columns];

      // currentState.splice(beforeIndex, 1);
      // currentState.splice(currentIndex, 0, action.payload.currentColumn);
      // state.board.columns = currentState.map((column, index) => {
      //   if (index >= beforeIndex && index <= currentIndex) {
      //     column.order -= 1;
      //   }
      //   return column;
      // });
    },

    endDragnTask: (state, action) => {
      const { destination, source, draggableId } = action.payload.result;
      const currentTask = action.payload.currentTask[0];
      const currentState = [...state.board.columns];
      const oldColumnIndex = currentState.findIndex((column) => column.id === source.droppableId);
      currentState[oldColumnIndex].tasks = currentState[oldColumnIndex].tasks.map((task, index) => {
        if (task.id !== currentTask.id) {
          if (index > source.index) {
            task.order -= 1;
          }
          return task;
        }
        return;
      }) as Array<TaskType>;
      currentState[oldColumnIndex].tasks = currentState[oldColumnIndex].tasks.filter(
        (task) => task !== undefined
      );
      const newColumnIndex = currentState.findIndex(
        (column) => column.id === destination.droppableId
      );
      currentState[newColumnIndex].tasks.length > 0
        ? currentState[newColumnIndex].tasks.splice(destination.index, 0, { ...currentTask })
        : (currentState[newColumnIndex].tasks = [{ ...currentTask }]);
      currentState[newColumnIndex].tasks = currentState[newColumnIndex].tasks.map((task, index) => {
        const currentOrder =
          index !== 0
            ? index + 1 !== currentState[newColumnIndex].tasks.length
              ? currentState[newColumnIndex].tasks[index + 1].order
              : currentState[newColumnIndex].tasks[index - 1].order + 1
            : 1;
        if (index === destination.index && currentOrder !== task.order) {
          task.order = currentOrder;
        } else if (index > destination.index) {
          task.order += 1;
        }
        return task;
      }) as Array<TaskType>;

      state.board.columns = currentState;
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
    [checkBoards.fulfilled.type]: (state, action) => {
      state.boards = [...action.payload.data];
    },
    [checkBoards.rejected.type]: (state) => {
      localStorage.setItem('token', '');
      state.token = '';
    },
    [addBoard.fulfilled.type]: (state, action) => {
      state.boards.push({ ...action.payload.data });
    },
    [addBoard.rejected.type]: (state) => {
      localStorage.setItem('token', '');
      state.token = '';
    },
    [deleteBoard.fulfilled.type]: (state, action) => {
      const boards = state.boards.filter((item) => action.payload.boardId !== item.id) as Array<{
        title: string;
        id: string;
      }>;
      state.deleteBoardId = '';
      state.boards = boards;
    },
    [deleteBoard.rejected.type]: (state) => {
      localStorage.setItem('token', '');
      state.token = '';
    },
    [openBoard.fulfilled.type]: (state, action) => {
      const board = { ...action.payload.data };
      board.columns = board.columns.sort((a: ColumnType, b: ColumnType) => a.order - b.order);
      board.columns = board.columns.map((column: ColumnType) => {
        column.tasks = [...column.tasks?.sort((a: TaskType, b: TaskType) => a.order - b.order)];
        return column;
      });
      state.board = board;
    },
    [openBoard.rejected.type]: (state) => {
      // localStorage.setItem('token', '');
      // state.token = '';
    },
    [addColumn.fulfilled.type]: (state, action) => {
      state.board.columns.push(action.payload.data);
      console.log(state.board.columns);
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
          console.log('changeName');
          const indexColumn = state.board.columns.findIndex((item) => item.id === columnId);
          state.board.columns[indexColumn].title = title;
          break;
        case 'addEndPosition':
          console.log('addEndPosition');
          break;
        case 'changePosition':
          console.log('changePosition');
          break;
      }
    },
  },
});

export default apiSlice.reducer;
export const { addToken, logout, endDragnColumn, endDragnTask } = apiSlice.actions;
