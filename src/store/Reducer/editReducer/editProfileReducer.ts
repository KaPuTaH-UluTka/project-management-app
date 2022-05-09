import { createSlice } from '@reduxjs/toolkit';

const editProfileState = {
  user: {
    name: '',
    login: '',
    token: '',
    id: '',
  },
};

const editProfileSlice = createSlice({
  name: 'login',
  initialState: { ...editProfileState },
  reducers: {},
  extraReducers: {},
});

export default editProfileSlice.reducer;
