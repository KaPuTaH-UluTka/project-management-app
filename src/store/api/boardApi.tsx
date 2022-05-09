import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from './url';

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

export const addBoard = createAsyncThunk(
  'addBoard',
  async (action: { title: string }, { rejectWithValue }) => {
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

export const deleteBoard = createAsyncThunk(
  'deleteBoard',
  async (action: { id: string }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    const { id } = action;
    try {
      const data = await fetch(`${url}boards/${id}`, {
        method: 'DELETE',
        headers: {
          accept: '*/*',
          Authorization: `Bearer ` + token,
        },
      });
      if (!data.ok) {
        throw new Error();
      }
      return { id };
    } catch {
      return rejectWithValue({});
    }
  }
);
