import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main/Main';
import { Board } from './pages/Board/Board';
import { Error } from './pages/Error/Error';
import { Edit } from './pages/Edit/Edit';
import { Login } from './pages/Login/Login';
import { Private } from './hoc/Private';
import { Welcome } from './pages/Welcome/Welcome';
import { pathes } from './pathes/pathes';

const App = () => {
  return (
    <Routes>
      <Route
        path={pathes.main}
        element={
          <Private>
            <Main />
          </Private>
        }
      />
      <Route
        path={pathes.board}
        element={
          <Private>
            <Board />
          </Private>
        }
      />
      <Route
        path={pathes.edit}
        element={
          <Private>
            <Edit />
          </Private>
        }
      />
      <Route path={pathes.welcome} element={<Welcome />} />
      <Route path={pathes.login} element={<Login />} />
      <Route path={pathes.error} element={<Error />} />
    </Routes>
  );
};

export default App;
