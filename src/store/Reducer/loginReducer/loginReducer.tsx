import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { checkBoards, signIn } from '../../api/api';

const loginState = {
  token: '',
  boards: [] as Array<{ title: string; id: string }>,
};

const loginSlice = createSlice({
  name: 'login',
  initialState: { ...loginState },
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
      state.boards = [...action.payload.data];
    },
    [checkBoards.rejected.type]: (state) => {
      localStorage.setItem('token', '');
      state.token = '';
    },
  },
});

export default loginSlice.reducer;
export const { addToken, logout } = loginSlice.actions;
