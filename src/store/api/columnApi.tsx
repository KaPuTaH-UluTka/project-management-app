/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from './url';

export const addColumn = createAsyncThunk(
  'addColumn',
  async (action: { title: string; boardId: string; order: number }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    const { boardId, title, order } = action;
    try {
      const data = await fetch(`${url}boards/${boardId}/columns`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ` + token,
        },
        body: JSON.stringify({ title, order }),
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

export const deleteColumn = createAsyncThunk(
  'deleteColumn',
  async (action: { boardId: string; columnId: string }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    const { boardId, columnId } = action;
    try {
      const data = await fetch(`${url}boards/${boardId}/columns/${columnId}`, {
        method: 'DELETE',
        headers: {
          accept: '*/*',
          Authorization: `Bearer ` + token,
        },
      });
      if (!data.ok) {
        throw new Error();
      }
      return { columnId };
    } catch {
      return rejectWithValue({});
    }
  }
);

export const updateColumn = createAsyncThunk(
  'updateColumn',
  async (
    action: { boardId?: string; columnId?: string; title?: string; order?: number; event?: string },
    { rejectWithValue }
  ) => {
    const token = localStorage.getItem('token');
    const { boardId, columnId, title, order, event } = action;
    try {
      const data = await fetch(`${url}boards/${boardId}/columns/${columnId}`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ` + token,
        },
        body: JSON.stringify({ title, order }),
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error();
        }
        return await response.text().then((res) => JSON.parse(res));
      });
      return { data, event };
    } catch {
      return rejectWithValue({});
    }
  }
);

export const changePositionColumn = async (action: any) => {
  {
    try {
      const token = localStorage.getItem('token');
      const { boardId, columnId, title, order, event } = action;
      const data = await fetch(`${url}boards/${boardId}/columns/${columnId}`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ` + token,
        },
        body: JSON.stringify({ title, order }),
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error();
        }
        return await response.text().then((res) => JSON.parse(res));
      });
      return { data, event };
    } catch {
      console.log('x');
    }
  }
};
