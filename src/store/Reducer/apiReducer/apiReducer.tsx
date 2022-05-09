import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { signIn } from '../../api/signApi';
import { checkBoards } from '../../api/boardApi';

const apiState = {
  token: '',
  boards: [] as Array<{ title: string; id: string }>,
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
    [checkBoards.fulfilled.type]: (state, action) => {
      state.boards = [...state.boards, ...action.payload.data];
    },
    [checkBoards.rejected.type]: (state) => {
      localStorage.setItem('token', '');
      state.token = '';
    },
  },
});

export default apiSlice.reducer;
export const { addToken, logout } = apiSlice.actions;
