import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardReducer/boardReducer';
import loginReducer from './loginReducer/loginReducer';
import openModalReducer from './confirmationReducer/confirmationReducer';

const rootReducer = combineReducers({
  boardReducer,
  loginReducer,
  openModalReducer,
});
export const store = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export type RootStore = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type appDispatch = AppStore['dispatch'];
