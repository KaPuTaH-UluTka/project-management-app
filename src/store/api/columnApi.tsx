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
          throw new Error(response.status.toString());
        }
        return await response.text().then((res) => JSON.parse(res));
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
        throw new Error(data.status.toString());
      }
      return { columnId };
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      if (message === '401') return rejectWithValue('error.unauthorized');
      else return rejectWithValue(message);
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
          throw new Error(response.status.toString());
        }
        return await response.text().then((res) => JSON.parse(res));
      });
      return { data, event };
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      if (message === '401') return rejectWithValue('error.unauthorized');
      else return rejectWithValue(message);
    }
  }
);

export const changePositionColumn = createAsyncThunk(
  'changePositionColumn',
  async (
    action: { boardId?: string; columnId?: string; title?: string; order?: number; event?: string },
    { rejectWithValue }
  ) => {
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
          throw new Error(response.status.toString());
        }
        return await response.text().then((res) => JSON.parse(res));
      });
      return { data, event };
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      if (message === '401') return rejectWithValue('error.unauthorized');
      else return rejectWithValue(message);
    }
  }
);
