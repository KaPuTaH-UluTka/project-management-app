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
    const token = localStorage.getItem('token');
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
      else if (message === '401') return rejectWithValue('error.unauthorized');
      else if (message === '500') return rejectWithValue('error.updateUser.500');
      else return rejectWithValue(message);
    }
  }
);

export const getUser = createAsyncThunk(
  'getUser',
  async (action: { id: string; updateLs?: boolean }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (action.id === null) return false;
    try {
      const data = await fetch(`${url}users/${action.id}`, {
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
      return { data: data, updateLs: action.updateLs };
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      if (message === '404') return rejectWithValue('error.getUser.404');
      else if (message === '401') return rejectWithValue('error.unauthorized');
      else return rejectWithValue(message);
    }
  }
);

export const delUser = createAsyncThunk('delUser', async (id: string, { rejectWithValue }) => {
  const token = localStorage.getItem('token');
  try {
    await fetch(`${url}users/${id}`, {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ` + token,
      },
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
    });
  } catch (err) {
    let message;
    if (err instanceof Error) message = err.message;
    else message = String(err);
    if (message === '404') return rejectWithValue('error.delUser.404');
    else if (message === '401') return rejectWithValue('error.unauthorized');
    else return rejectWithValue(message);
  }
});
