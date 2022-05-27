import { NavLink } from 'react-router-dom';
import { pathes } from '../../pathes/pathes';
import Button from '@mui/material/Button';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';

import './error.scss';

const Error = () => {
  return (
    <div className="error__wrapper">
      <div className="error__block">
        <ErrorMessage />
        <NavLink to={pathes.main}>
          <Button variant="contained" color="warning">
            Return
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default Error;
