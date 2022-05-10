import { createTheme } from '@mui/material';

export const rootStyles = {
  violetDark: '#6766AB',
  violetLight: '#B8B4FF',
  yellowDark: '#FDC04E',
  yellowLight: '#FFCC57',
  red: '#BD1929',
};

export const violetTheme = createTheme({
  palette: {
    primary: {
      main: rootStyles.violetDark,
    },
    secondary: {
      main: rootStyles.violetLight,
    },
    error: {
      main: rootStyles.red,
    },
  },
});

export const yellowTheme = createTheme({
  palette: {
    primary: {
      main: rootStyles.violetDark,
    },
    secondary: {
      main: rootStyles.violetLight,
    },
  },
});
