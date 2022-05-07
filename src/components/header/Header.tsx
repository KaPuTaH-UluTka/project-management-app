import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import { pathes } from '../../pathes/pathes';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { addLogin } from '../../store/Reducer/loginReducer/loginReducer';
import './header.scss';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
const Header = () => {
  const { open } = useAppSelector((state) => state.openModalReducer);
  const { isLogined } = useAppSelector((state) => state.loginReducer);
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
        width: open ? '100vw' : '100%',
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

          {isLogined ? (
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" color="inherit">
                <MenuIcon />
              </IconButton>
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
          {isLogined ? (
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

          {isLogined ? (
            <Box sx={{ flexGrow: 0 }}>
              <button className="header__user-entry output" onClick={() => dispatch(addLogin())}>
                <LoginIcon />
                Logout
              </button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', position: 'absolute', right: 0 }}>
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
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
