import { createSlice } from '@reduxjs/toolkit';
const loginState = {
  isLogined: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState: { ...loginState },
  reducers: {
    addLogin: (state) => {
      state.isLogined = !state.isLogined;
    },
  },
});

export default loginSlice.reducer;
export const { addLogin } = loginSlice.actions;
