import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { getUser, signIn, updateUser } from '../../api/signApi';
import { checkBoards, addBoard, deleteBoard } from '../../api/boardApi';

const apiState = {
  token: '',
  boards: [] as Array<{ title: string; id: string }>,
  deleteBoardId: '',
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
  },
});

export default apiSlice.reducer;
export const { addToken, logout } = apiSlice.actions;
