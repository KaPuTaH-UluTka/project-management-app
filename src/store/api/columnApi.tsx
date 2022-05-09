import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from './url';

export const addColumn = createAsyncThunk(
  'deleteBoard',
  async (action: { title: string; id: string; order: number }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    const { id, title, order } = action;
    try {
      const data = await fetch(`${url}boards/${id}/columns`, {
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
      // console.log(data);
      return { data };
    } catch {
      return rejectWithValue({});
    }
  }
);
