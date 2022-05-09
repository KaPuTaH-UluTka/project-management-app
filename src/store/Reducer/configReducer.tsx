import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginReducer from './apiReducer/apiReducer';
import openModalReducer from './confirmationReducer/confirmationReducer';

const rootReducer = combineReducers({
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
