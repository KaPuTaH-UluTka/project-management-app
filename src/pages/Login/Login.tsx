import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import * as yup from 'yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useState } from 'react';
import { rootStyles, violetTheme } from '../../style/rootStyles';
import { pathes } from '../../pathes/pathes';
import { Navigate } from 'react-router-dom';
import { signIn, signUp } from '../../store/Thunk/api';
import { useFormik } from 'formik';
import { ILoginUser, ISignUpUser } from '../../types/types';

export const Login = () => {
  const dispatch = useAppDispatch();
  const { isLogined } = useAppSelector((state) => state.loginReducer);
  const [isSignUp, setSignUp] = useState(false);

  function changeForm() {
    setSignUp(!isSignUp);
  }

  const validationSchema = yup.object({
    name: yup.string().min(4, 'Name should be of minimum 8 characters length'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      if (isSignUp) {
        signUp(signUpUser as ISignUpUser);
      } else signIn(loginUser as ILoginUser);
    },
  });

  const signUpUser = {
    name: formik.values.name,
    email: formik.values.email,
    password: formik.values.password,
  };

  const loginUser = {
    email: formik.values.email,
    password: formik.values.password,
  };

  return isLogined ? (
    <Navigate to={pathes.main} />
  ) : (
    <ThemeProvider theme={violetTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={formik.handleSubmit}>
            {isSignUp && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color="primary"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {isSignUp ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: rootStyles.violetLight,
                  ':hover': {
                    background: rootStyles.violetDark,
                  },
                }}
                // onClick={() => signUp(signUpUser as ISignUpUser)}
              >
                Sign Up
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: rootStyles.violetLight,
                  ':hover': {
                    background: rootStyles.violetDark,
                  },
                }}
                // onClick={() => signIn(loginUser as ILoginUser)}
              >
                Sign In
              </Button>
            )}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={changeForm}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
