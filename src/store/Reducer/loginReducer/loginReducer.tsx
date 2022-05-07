import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ILoginUser, ISignUpUser } from '../../../types/types';
const loginState = {
  isLogined: false,
  user: {
    name: '',
    login: '',
    password: '',
  },
};

const url = 'https://rs-trello.herokuapp.com/';

export const signIn = createAsyncThunk(
  'signIn',
  async (action: ILoginUser, { rejectWithValue }) => {
    console.log(action);
    try {
      //   const data = axios.post(`${url}signin`, {
      //     headers: {
      //       accept: 'application/json',
      //       body: JSON.stringify(action),
      //       'content-type': 'application/json',
      //     },
      //   });
      const data = await fetch(`${url}signin`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(action),
      }).then((res) => res.json());
      console.log(data);
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
      // const data = await axios.post(`${url}signup`, {
      //   headers: {
      //     accept: 'application/json',
      //     'content-type': 'application/json',
      //   },
      //   body: JSON.stringify(action),
      // });
      const data = await fetch(`${url}signup`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(action),
      }).then((res) => res.json());
      console.log(data);
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
      console.log(action.data);
    },
    [signUp.fulfilled.type]: (state, action) => {
      console.log(action.data);
    },
  },
});

export default loginSlice.reducer;
export const { addLogin } = loginSlice.actions;
