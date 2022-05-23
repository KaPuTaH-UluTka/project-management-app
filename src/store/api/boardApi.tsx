import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from './url';

export const checkBoards = createAsyncThunk('chekBoards', async (action, { rejectWithValue }) => {
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
    if (message === '401') return rejectWithValue('error.unauthorized');
    else return rejectWithValue(message);
  }
});

export const addBoard = createAsyncThunk(
  'addBoard',
  async (action: { title: string; description: string }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const data = await fetch(`${url}boards`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ` + token,
        },
        body: JSON.stringify(action),
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
      if (message === '401') return rejectWithValue('error.unauthorized');
      else return rejectWithValue(message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'deleteBoard',
  async (action: { boardId: string }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    const { boardId } = action;
    try {
      const data = await fetch(`${url}boards/${boardId}`, {
        method: 'DELETE',
        headers: {
          accept: '*/*',
          Authorization: `Bearer ` + token,
        },
      });
      if (!data.ok) {
        throw new Error(data.status.toString());
      } else {
        return { boardId };
      }
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      if (message === '401') return rejectWithValue('error.unauthorized');
      else return rejectWithValue(message);
    }
  }
);

export const openBoard = createAsyncThunk(
  'openBoard',
  async (action: { boardId: string }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    const { boardId } = action;
    try {
      const data = await fetch(`${url}boards/${boardId}`, {
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
      if (message === '401') return rejectWithValue('error.unauthorized');
      else return rejectWithValue(message);
    }
  }
);
