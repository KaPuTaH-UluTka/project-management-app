import { ISignUpUser, ILoginUser } from '../../types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from './url';

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
