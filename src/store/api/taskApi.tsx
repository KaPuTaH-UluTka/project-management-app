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
    console.log({ title, order, description, userId });
    try {
      const data = await fetch(`${url}boards/${boardId}/columns/${columnId}/tasks`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ` + token,
        },
        body: JSON.stringify({ title, order, description, userId, done: false }),
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

export const updateTask = createAsyncThunk(
  'updateTask',
  async (
    action: {
      boardId?: string;
      oldColumnId?: string;
      newColumnId?: string;
      title?: string;
      order?: number;
      event?: string;
      description?: string;
      userId?: string;
      taskId?: string;
      done: boolean;
    },
    { rejectWithValue }
  ) => {
    const token = localStorage.getItem('token');
    const {
      boardId,
      oldColumnId,
      newColumnId,
      title,
      order,
      event,
      description,
      userId,
      taskId,
      done,
    } = action;
    try {
      const data = await fetch(`${url}boards/${boardId}/columns/${oldColumnId}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ` + token,
        },
        body: JSON.stringify({
          title,
          order,
          description,
          userId,
          boardId,
          columnId: newColumnId,
          done,
        }),
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

export const takeAllTasks = createAsyncThunk(
  'takeAllTasks',
  async (action: { select: string; searchValue: string }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    const { select, searchValue } = action;
    try {
      const data = await fetch(`${url}search/tasks`, {
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
      return { data, select, searchValue };
    } catch {
      return rejectWithValue({});
    }
  }
);
