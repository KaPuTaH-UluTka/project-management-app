import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from './url';

export const addTask = createAsyncThunk(
  'addTask',
  async (
    action: {
      title: string;
      boardId: string;
      order: number;
      columnId: string;
      description: string;
      userId: string;
    },
    { rejectWithValue }
  ) => {
    const token = localStorage.getItem('token');
    const { boardId, title, order, columnId, userId, description } = action;
    try {
      const data = await fetch(`${url}boards/${boardId}/columns/${columnId}/tasks`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ` + token,
        },
        body: JSON.stringify({ title, order, description, userId }),
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error();
        }
        return await response.text().then((res) => JSON.parse(res));
      });
      // console.log(data);
      return { data };
    } catch {
      return rejectWithValue({});
    }
  }
);

export const deleteTask = createAsyncThunk(
  'deleteTask',
  async (action: { boardId: string; columnId: string; taskId: string }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    const { boardId, columnId, taskId } = action;
    try {
      const data = await fetch(`${url}boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          accept: '*/*',
          Authorization: `Bearer ` + token,
        },
      });
      if (!data.ok) {
        throw new Error();
      }
      return { columnId, taskId };
    } catch {
      return rejectWithValue({});
    }
  }
);
