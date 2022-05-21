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
        if (!response.ok) {
          throw new Error(response.status.toString());
        } else {
          return await response.text().then((res) => JSON.parse(res).token);
        }
      });
      return { data };
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      if (message === '403') return rejectWithValue('error.signIn.403');
      else return rejectWithValue(message);
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
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error(response.status.toString());
        }
      });
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      if (message === '409') return rejectWithValue('error.signUp.409');
      else return rejectWithValue(message);
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
          throw new Error(response.status.toString());
        } else {
          return await response.text().then((res) => JSON.parse(res));
        }
      });
      return { data };
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      if (message === '404') return rejectWithValue('error.updateUser.404');
      else return rejectWithValue(message);
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
        throw new Error(response.status.toString());
      } else {
        return await response.text().then((res) => JSON.parse(res));
      }
    });
    return { data };
  } catch (err) {
    let message;
    if (err instanceof Error) message = err.message;
    else message = String(err);
    if (message === '404') return rejectWithValue('error.getUser.404');
    else return rejectWithValue(message);
  }
});
