import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const boardState = {
  boards: [
    { title: 'First task', id: '2' },
    { title: 'Secont task', id: '2' },
    { title: 'First task', id: '2' },
    { title: 'Secont task', id: '2' },
    { title: 'First task', id: '2' },
    { title: 'Secont task', id: '2' },
    { title: 'First task', id: '2' },
    { title: 'Secont task', id: '2' },
    { title: 'First task', id: '2' },
    { title: 'Secont task', id: '2' },
    { title: 'First task', id: '2' },
    { title: 'Secont task', id: '2' },
  ],
};

const token = '';
const URL = 'http://localhost:3000';
export const checkBoards = createAsyncThunk(
  'chekBoards',
  async function (action, { rejectWithValue }) {
    try {
      const data = axios.get(URL + '/boards', {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ` + token,
        },
      });
      return { data };
    } catch {
      return rejectWithValue({});
    }
  }
);
const boardSlice = createSlice({
  name: 'board',
  initialState: { ...boardState },
  reducers: {},
  extraReducers: {
    [checkBoards.fulfilled as unknown as string]: (state, action) => {
      state.boards = [...action.payload.data];
    },
  },
});

export default boardSlice.reducer;
