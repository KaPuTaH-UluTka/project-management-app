import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import { pathes } from '../../pathes/pathes';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { addLogin } from '../../store/Reducer/loginReducer/loginReducer';
import './header.scss';

const Header = () => {
  const { isLogined } = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <div className="header__left">
            <div className="header__logo">
              <h1>Trello</h1>
            </div>

            {isLogined ? (
              <nav className="header__nav">
                <Link to={pathes.main}>
                  <div className="header__nav-link">Home</div>
                </Link>
                <Link to={pathes.board}>
                  <div className="header__nav-link">Add board</div>
                </Link>
                <Link to={pathes.edit}>
                  <div className="header__nav-link">Edit Profile</div>
                </Link>
              </nav>
            ) : null}
          </div>

          {!isLogined ? (
            <div className="header__user">
              <Link to={pathes.login}>
                <button className="header__user-entry">
                  <LoginIcon />
                  Login
                </button>
              </Link>
              <Link to={pathes.login}>
                <button className="header__user-registr">
                  <PersonIcon />
                  Sign up
                </button>
              </Link>
            </div>
          ) : (
            <button className="header__user-entry output" onClick={() => dispatch(addLogin())}>
              <LoginIcon />
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
