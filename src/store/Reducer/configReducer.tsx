import { combineReducers, configureStore } from '@reduxjs/toolkit';
import apiReducer from './apiReducer/apiReducer';
import openModalReducer from './confirmationReducer/confirmationReducer';
import langReducer from './langReducer/langReducer';

const rootReducer = combineReducers({
  apiReducer,
  openModalReducer,
  langReducer,
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
