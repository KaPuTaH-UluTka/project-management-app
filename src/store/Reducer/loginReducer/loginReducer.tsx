import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ILoginUser, ISignUpUser } from '../../../types/types';
const loginState = {
  isLogined: false,
  user: {
    id: '',
    name: '',
    login: '',
  },
};

const url = 'http://localhost:4000/';

export const signIn = createAsyncThunk(
  'signIn',
  async (action: ILoginUser, { rejectWithValue }) => {
    try {
      const data = axios.get(`${url}/signin`, {
        headers: {
          accept: 'application/json',
          body: JSON.stringify(action),
          'content-type': 'application/json',
        },
      });
      return { data };
    } catch {
      return rejectWithValue({});
    }
  }
);

export const signUp = createAsyncThunk(
  'signUp',
  async (action: ISignUpUser, { rejectWithValue }) => {
    try {
      const data = axios.get(`${url}/signup`, {
        headers: {
          accept: 'application/json',
          body: JSON.stringify(action),
          'content-type': 'application/json',
        },
      });
      return { data };
    } catch {
      return rejectWithValue({});
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: { ...loginState },
  reducers: {
    addLogin: (state) => {
      state.isLogined = !state.isLogined;
    },
  },
  extraReducers: {
    [signIn.fulfilled.type]: (state, action) => {
      state.user = action.payload.data;
    },
    [signUp.fulfilled.type]: (state, action) => {},
  },
});

export default loginSlice.reducer;
export const { addLogin } = loginSlice.actions;
