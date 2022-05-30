import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import { pathes } from '../../pathes/pathes';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { logout } from '../../store/Reducer/apiReducer/apiReducer';
import './header.scss';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { toggleBar } from '../../store/Reducer/confirmationReducer/confirmationReducer';
import { useEffect, useState } from 'react';
import { openModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';
import BasicModal from '../../hoc/BasicModal';
import LangSwitch from '../langSwitch/LangSwitch';
import { FormattedMessage } from 'react-intl';

import './header.scss';
import { rootStyles } from '../../style/rootStyles';

const Header = () => {
  const { confirmModal, createBoardModal, headerBar } = useAppSelector(
    (state) => state.openModalReducer
  );
  const { token } = useAppSelector((state) => state.apiReducer);
  const dispatch = useAppDispatch();
  const [posTop, setPosTop] = useState(0);
  const [bgStyle, setBgColor] = useState(rootStyles.violetLight);
  const location = useLocation();
  let headerBtns;
  useEffect(() => {
    if (posTop > 1) {
      setBgColor(rootStyles.darkGray);
    } else {
      setBgColor(rootStyles.violetDark);
    }
    window.addEventListener('scroll', () => {
      setPosTop(window.scrollY);
    });
  }, [posTop]);

  if (token && location.pathname === '/welcome') {
    headerBtns = (
      <Box sx={{ position: 'absolute', right: 60 }}>
        <Link to={pathes.login + '/signIn'}>
          <button className="header__user-entry output">
            <Typography sx={{ fontSize: 18, display: { xs: 'none', md: 'flex' } }}>
              <FormattedMessage id="nav.toHome" defaultMessage="Go to Main page" />
            </Typography>
            <Typography sx={{ fontSize: 18, display: { xs: 'flex', md: 'none' } }}>
              <FormattedMessage id="nav.toHomeSmall" defaultMessage="Main page" />
            </Typography>
          </button>
        </Link>
      </Box>
    );
  } else if (token) {
    headerBtns = (
      <Box sx={{ position: 'absolute', right: 80 }}>
        <button className="header__user-entry output" onClick={() => dispatch(logout())}>
          <LoginIcon />
          <Typography sx={{ fontSize: 18, display: { xs: 'none', md: 'flex' } }}>
            <FormattedMessage id="logout" defaultMessage="Logout" />
          </Typography>
        </button>
      </Box>
    );
  } else {
    headerBtns = (
      <Box sx={{ display: 'flex', position: 'absolute', right: 80 }}>
        <Link to={pathes.login + '/signIn'}>
          <button className="header__user-entry">
            <LoginIcon />
            <Typography sx={{ fontSize: 18, display: { xs: 'none', md: 'flex' } }}>
              <FormattedMessage id="nav.login" defaultMessage="Login" />
            </Typography>
          </button>
        </Link>
        <Link to={pathes.login + '/signUp'}>
          <button className="header__user-registr">
            <PersonIcon />
            <Typography sx={{ fontSize: 18, display: { xs: 'none', md: 'flex' } }}>
              <FormattedMessage id="nav.signUp" defaultMessage="Sign up" />
            </Typography>
          </button>
        </Link>
      </Box>
    );
  }

  return (
    <AppBar
      position="sticky"
      style={{
        backgroundColor: bgStyle,
        width: confirmModal || createBoardModal ? '100vw' : '100%',
        transition: 'background 1s linear',
      }}
    >
      <BasicModal />
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 3,
              display: { xs: 'none', md: 'flex' },
              fontSize: 24,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            TRELLO
          </Typography>

          {token && location.pathname !== '/welcome' && (
            <Box
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              onClick={() => {
                dispatch(toggleBar());
              }}
            >
              <IconButton size="large" color="inherit">
                <MenuIcon />
              </IconButton>
              {headerBar ? (
                <div
                  style={{
                    position: 'absolute',
                    top: 50,
                  }}
                >
                  <Link to={pathes.main}>
                    <MenuItem onClick={toggleBar} className="header__bar-item">
                      <Typography textAlign="center">
                        <FormattedMessage id="nav.home" defaultMessage="Home" />
                      </Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={toggleBar} className="header__bar-item">
                    <Typography
                      textAlign="center"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(openModal({ modal: 'createBoardModal' }));
                      }}
                    >
                      <FormattedMessage id="nav.addBoard" defaultMessage="Add board" />
                    </Typography>
                  </MenuItem>
                  <Link to={pathes.edit}>
                    <MenuItem onClick={toggleBar} className="header__bar-item">
                      <Typography textAlign="center">
                        <FormattedMessage id="nav.editProfile" defaultMessage="Edit Profile" />
                      </Typography>
                    </MenuItem>
                  </Link>
                  <Link to={pathes.welcome}>
                    <MenuItem onClick={toggleBar} className="header__bar-item">
                      <Typography textAlign="center">
                        <FormattedMessage id="nav.welcome" defaultMessage="About us" />
                      </Typography>
                    </MenuItem>
                  </Link>
                </div>
              ) : null}
            </Box>
          )}
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 17,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TRELLO
          </Typography>
          {token && location.pathname !== '/welcome' && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link to={pathes.main}>
                <div className="header__nav-link">
                  <FormattedMessage id="nav.home" defaultMessage="Home" />
                </div>
              </Link>
              <div className="header__nav-link">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(openModal({ modal: 'createBoardModal' }));
                  }}
                >
                  <FormattedMessage id="nav.addBoard" defaultMessage="Add board" />
                </Button>
              </div>
              <Link to={pathes.edit}>
                <div className="header__nav-link">
                  <FormattedMessage id="nav.editProfile" defaultMessage="Edit Profile" />
                </div>
              </Link>
              <Link to={pathes.welcome}>
                <div className="header__nav-link">
                  <FormattedMessage id="nav.welcome" defaultMessage="About us" />
                </div>
              </Link>
            </Box>
          )}
          {headerBtns}
          <Box sx={{ position: 'absolute', right: 0 }}>
            <LangSwitch />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
