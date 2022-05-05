import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardReducer/boardReducer';
import loginReducer from './loginReducer/loginReducer';

const rootReducer = combineReducers({
  boardReducer,
  loginReducer,
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
