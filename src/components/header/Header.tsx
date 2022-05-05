import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';

import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <div className="header__left">
            <div className="header__logo">
              <h1>Trello</h1>
            </div>

            <nav className="header__nav">
              <div className="header__nav-link">Home</div>
              <div className="header__nav-link">Boards</div>
              <div className="header__nav-link">Profile</div>
            </nav>
          </div>

          <div className="header__user">
            <button className="header__user-entry">
              <LoginIcon />
              Login
            </button>
            <button className="header__user-registr">
              <PersonIcon />
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
