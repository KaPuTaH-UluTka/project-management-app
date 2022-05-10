import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
export interface ISignUpUser {
  name: string;
  login: string;
  password: string;
}

export interface ILoginUser {
  login: string;
  password: string;
}

export interface IDecodedUser {
  iat: number;
  login: string;
  id: string;
}
const loginState = {
  isLogined: false,
  user: {
    login: '',
    token: '',
    id: '',
  },
};

const url = 'https://rs-trello.herokuapp.com/';

export const signIn = createAsyncThunk(
  'signIn',
  async (action: ILoginUser, { rejectWithValue }) => {
    try {
      const data = await fetch(`${url}signin`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(action),
      }).then(async (response) => {
        console.log(response);
        const loginData = {
          ...action,
          token: await response.text().then((res) => JSON.parse(res).token),
        };
        return loginData;
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
      const data = await fetch(`${url}signup`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(action),
      }).then(async (response) => {
        const body = await response.text().then((res) => JSON.parse(res));
        return { ...body };
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
    [signUp.fulfilled.type]: (state, action) => {},
    [signIn.fulfilled.type]: (state, action) => {
      state.user.token = action.payload.data.token;
      const decodedUser: IDecodedUser = jwt_decode(action.payload.data.token);
      state.user.login = decodedUser.login;
      state.user.id = decodedUser.id;
    },
  },
});

export default loginSlice.reducer;
export const { addLogin } = loginSlice.actions;
