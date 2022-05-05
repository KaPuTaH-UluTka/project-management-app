import { createSlice } from '@reduxjs/toolkit';
const loginState = {
  isLogined: true,
};

const loginSlice = createSlice({
  name: 'login',
  initialState: { ...loginState },
  reducers: {
    addLogin: (state, action) => {
      state.isLogined = action.payload;
    },
  },
});

export default loginSlice.reducer;
