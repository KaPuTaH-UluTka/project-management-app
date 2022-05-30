import { createSlice } from '@reduxjs/toolkit';

const langState = {
  lang: localStorage.getItem('lang') || 'En',
};

const langSlice = createSlice({
  name: 'login',
  initialState: { ...langState },
  reducers: {
    setLangRu: (state) => {
      state.lang = 'Ru';
      localStorage.setItem('lang', 'Ru');
    },
    setLangEn: (state) => {
      state.lang = 'En';
      localStorage.setItem('lang', 'En');
    },
  },
});

export default langSlice.reducer;
export const { setLangRu, setLangEn } = langSlice.actions;
