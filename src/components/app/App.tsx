import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from '../../pages/Main/Main';
import { Board } from '../../pages/Board/Board';
import { Error } from '../../pages/Error/Error';
import { Edit } from '../../pages/Edit/Edit';
import { Login } from '../../pages/Login/Login';
import { Private } from '../../hoc/Private';
import { Welcome } from '../../pages/Welcome/Welcome';
import { pathes } from '../../pathes/pathes';
import { FullPage } from '../FullPage';
import { useEffect } from 'react';
import { addToken } from '../../store/Reducer/apiReducer/apiReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Loading from '../loading/Loading';
import ApiError from '../apiError/ApiError';

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(addToken());
  });
  const errors = useAppSelector((state) => state.apiReducer.apiErrors);
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path={pathes.main}
          element={
            <Private>
              <FullPage>
                <Main />
              </FullPage>
            </Private>
          }
        />
        <Route
          path={pathes.board + '/:boardId'}
          element={
            <Private>
              <FullPage>
                <Board />
              </FullPage>
            </Private>
          }
        />
        <Route
          path={pathes.edit}
          element={
            <Private>
              <FullPage>
                <Edit />
              </FullPage>
            </Private>
          }
        />
        <Route
          path={pathes.welcome}
          element={
            <FullPage>
              <Welcome />
            </FullPage>
          }
        />
        <Route
          path={pathes.login + '/:signState'}
          element={
            <FullPage>
              <Login />
            </FullPage>
          }
        />
        <Route path={pathes.error} element={<Error />} />
      </Routes>
      <ApiError errors={errors} />
    </Suspense>
  );
};

export default App;
