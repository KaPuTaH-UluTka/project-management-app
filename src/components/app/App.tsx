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

const App = () => {
  return (
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
        path={pathes.board + '/:id'}
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
        path={pathes.login}
        element={
          <FullPage>
            <Login />
          </FullPage>
        }
      />
      <Route path={pathes.error} element={<Error />} />
    </Routes>
  );
};

export default App;
