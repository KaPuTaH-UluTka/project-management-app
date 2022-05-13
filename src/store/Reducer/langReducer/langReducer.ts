import { createSlice } from '@reduxjs/toolkit';

const langState = {
  lang: 'En',
};

const langSlice = createSlice({
  name: 'login',
  initialState: { ...langState },
  reducers: {
    setLangRu: (state) => {
      state.lang = 'Ru';
    },
    setLangEn: (state) => {
      state.lang = 'En';
    },
  },
});

export default langSlice.reducer;
export const { setLangRu, setLangEn } = langSlice.actions;
