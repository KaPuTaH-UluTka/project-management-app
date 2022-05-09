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
