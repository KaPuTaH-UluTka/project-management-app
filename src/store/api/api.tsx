import { ISignUpUser, ILoginUser } from '../../types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
const url = 'https://rs-trello.herokuapp.com/';

export const checkBoards = createAsyncThunk(
  'chekBoards',
  async (action: null, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const data: Array<{ title: string; id: string }> = await fetch(url + 'boards', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ` + token,
        },
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error();
        }
        return await response.text().then((res) => JSON.parse(res));
      });

      return { data };
    } catch (err) {
      return rejectWithValue({});
    }
  }
);

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
        return await response.text().then((res) => JSON.parse(res).token);
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
      await fetch(`${url}signup`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(action),
      });
    } catch {
      return rejectWithValue({});
    }
  }
);
