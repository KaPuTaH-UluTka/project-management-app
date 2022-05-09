import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import { pathes } from '../../pathes/pathes';
import { Link } from 'react-router-dom';
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
import { toggleBar } from '../../store/Reducer/confirmationReducer/confirmationReducer';
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
const Header = () => {
  const { modal, headerBar } = useAppSelector((state) => state.openModalReducer);
  const { token } = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();
  const [posTop, setPosTop] = useState(0);
  const [bgStyle, setBgColor] = useState('#6751f6');
  useEffect(() => {
    if (posTop > 1) {
      setBgColor('black');
    } else {
      setBgColor('#6751f6');
    }
  }, [posTop]);
  window.addEventListener('scroll', () => {
    setPosTop(window.pageYOffset);
  });

  return (
    <AppBar
      position="sticky"
      style={{
        backgroundColor: bgStyle,
        width: modal ? '100vw' : '100%',
        transition: 'background 1s linear',
      }}
    >
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

          {token ? (
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
                      <Typography textAlign="center">Home</Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={toggleBar} className="header__bar-item">
                    <Typography textAlign="center">Add Board</Typography>
                  </MenuItem>
                  <Link to={pathes.edit}>
                    <MenuItem onClick={toggleBar} className="header__bar-item">
                      <Typography textAlign="center">Edit profile</Typography>
                    </MenuItem>
                  </Link>
                </div>
              ) : null}
            </Box>
          ) : null}
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
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
          {token ? (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link to={pathes.main}>
                <div className="header__nav-link">Home</div>
              </Link>
              <div className="header__nav-link">Add board</div>
              <Link to={pathes.edit}>
                <div className="header__nav-link">Edit Profile</div>
              </Link>
            </Box>
          ) : null}

          {token ? (
            <Box sx={{ flexGrow: 0 }}>
              <button className="header__user-entry output" onClick={() => dispatch(logout())}>
                <LoginIcon />
                Logout
              </button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', position: 'absolute', right: 0 }}>
              <Link to={pathes.login + '/signIn'}>
                <button className="header__user-entry">
                  <LoginIcon />
                  Login
                </button>
              </Link>
              <Link to={pathes.login + '/signUp'}>
                <button className="header__user-registr">
                  <PersonIcon />
                  Sign up
                </button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
