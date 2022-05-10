import robot from '../../assets/robot.gif';
import { NavLink } from 'react-router-dom';
import { pathes } from '../../pathes/pathes';
import Button from '@mui/material/Button';

import './error.scss';

export const Error = () => {
  return (
    <div className="error">
      <div className="error__block">
        <img className="error__block-img" src={robot} alt="Error 404" />
        <p>Ooops...</p>
        <p>Anything want wrong...</p>
        <NavLink to={pathes.main}>
          <Button variant="contained" color="warning">
            Return
          </Button>
        </NavLink>
      </div>
    </div>
  );
};
