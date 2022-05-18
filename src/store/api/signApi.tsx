import { ISignUpUser, ILoginUser } from '../../types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from './url';

const token = localStorage.getItem('token');

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

export const updateUser = createAsyncThunk(
  'updateUser',
  async (updatedUser: { id: string; user: ISignUpUser }, { rejectWithValue }) => {
    try {
      const data = await fetch(`${url}users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ` + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser.user),
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error();
        }
        return await response.text().then((res) => JSON.parse(res));
      });
      return { data };
    } catch {
      return rejectWithValue({});
    }
  }
);

export const getUser = createAsyncThunk('getUser', async (id: string, { rejectWithValue }) => {
  console.log(token);
  try {
    const data = await fetch(`${url}users/${id}`, {
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
  } catch {
    return rejectWithValue({});
  }
});
