import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { signIn } from '../../api/signApi';
import { checkBoards, addBoard, deleteBoard, openBoard } from '../../api/boardApi';
import { BoardType } from '../../../types/types';

const apiState = {
  token: '',
  boards: [] as Array<{ title: string; id: string }>,
  deleteBoardId: '',
  board: {
    id: '9a111e19-24ec-43e1-b8c4-13776842b8d5',
    title: 'Homework tasks',
    columns: [
      {
        id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f',
        title: 'Done',
        order: 1,
        tasks: [
          {
            id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
            title: 'Task: pet the cat',
            order: 1,
            done: false,
            description: 'Domestic cat needs to be stroked gently',
            userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
            files: [
              {
                filename: 'foto.jpg',
                fileSize: 6105000,
              },
            ],
          },
          {
            id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
            title: 'Task: pet the cat',
            order: 1,
            done: false,
            description: 'Domestic cat needs to be stroked gently',
            userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
            files: [
              {
                filename: 'foto.jpg',
                fileSize: 6105000,
              },
            ],
          },
        ],
      },
    ],
  } as BoardType,
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
    // changeInputValue: (state, action) =>{

    // }
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
      const boards = state.boards.filter((item) => action.payload.id !== item.id) as Array<{
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
      console.log(action);
      // state.boards.push({ ...action.payload.data });
    },
    [openBoard.rejected.type]: (state) => {
      // localStorage.setItem('token', '');
      // state.token = '';
    },
  },
});

export default apiSlice.reducer;
export const { addToken, logout } = apiSlice.actions;
