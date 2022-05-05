import { createSlice } from '@reduxjs/toolkit';
const boardState = {
  boards: [''],
};

const boardSlice = createSlice({
  name: 'board',
  initialState: { ...boardState },
  reducers: {
    addBoards: (state, action: { payload: { name: string } }) => {
      state.boards.push(action.payload.name);
    },
  },
});

export default boardSlice.reducer;
