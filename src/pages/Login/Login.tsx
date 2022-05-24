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
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { rootStyles, violetTheme } from '../../style/rootStyles';
import { pathes } from '../../pathes/pathes';
import { Navigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ILoginUser, ISignUpUser } from '../../types/types';
import { signUp, signIn, getUser } from '../../store/api/signApi';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

const styleLink = {
  color: '#0000FF',
  textDecoration: 'underline',
};

export const Login = () => {
  const { signState } = useParams();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.apiReducer);
  const [showHidePass, setShowHidePass] = useState(false);
  const intl = useIntl();

  const validationSchema = yup.object({
    name: yup.string().min(4, 'login.nameValidation'),
    email: yup.string().email('login.emailValidation').required('login.emailReq'),
    password: yup.string().min(8, 'login.passwordValidation').required('login.passwordReq'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      if (signState === 'signUp') {
        dispatch(signUp(signUpUser as ISignUpUser)).then((res) => {
          if (!res.payload) {
            login();
          }
        });
      } else {
        login();
      }
    },
  });

  const signUpUser = {
    name: formik.values.name,
    login: formik.values.email,
    password: formik.values.password,
  };

  const loginUser = {
    login: formik.values.email,
    password: formik.values.password,
  };

  function activeSubmit() {
    if (
      signState === 'signUp' &&
      !(
        formik.values.name &&
        formik.values.email &&
        formik.values.password &&
        !formik.errors.name &&
        !formik.errors.password
      )
    ) {
      return true;
    } else return !(formik.values.email && formik.values.password && !formik.errors.password);
  }

  function hideShowPass() {
    setShowHidePass(!showHidePass);
  }

  function getTranslate(key: string) {
    return intl.formatMessage({ id: key });
  }

  function login() {
    dispatch(signIn(loginUser as ILoginUser)).then(async (res) => {
      if (typeof res.payload === 'object') {
        const id = (await localStorage.getItem('userID')) as string;
        dispatch(getUser(id));
      }
    });
  }

  return token ? (
    <Navigate to={pathes.main} />
  ) : signState === 'signIn' || signState === 'signUp' ? (
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
            {signState ? (
              <FormattedMessage id="login.signIn" defaultMessage="Sign in" />
            ) : (
              <FormattedMessage id="login.signUp" defaultMessage="Sign Up" />
            )}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={formik.handleSubmit}>
            {signState === 'signUp' && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label={<FormattedMessage id="login.name" defaultMessage="Name" />}
                name="name"
                autoFocus
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={
                  formik.touched.name && formik.errors.name && getTranslate(formik.errors.name)
                }
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={<FormattedMessage id="login.email" defaultMessage="Email Address" />}
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={
                formik.touched.email && formik.errors.email && getTranslate(formik.errors.email)
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={<FormattedMessage id="login.password" defaultMessage="Password" />}
              type={showHidePass ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              color="primary"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={
                formik.touched.password &&
                formik.errors.password &&
                getTranslate(formik.errors.password)
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" onClick={hideShowPass} />}
              label={<FormattedMessage id="login.showPass" defaultMessage="Show password" />}
            />
            {signState === 'signUp' ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={activeSubmit()}
                sx={{
                  mt: 3,
                  mb: 2,
                  background: rootStyles.violetLight,
                  ':hover': {
                    background: rootStyles.violetDark,
                  },
                }}
              >
                <FormattedMessage id="login.signUp" defaultMessage="Sign Up" />
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={activeSubmit()}
                sx={{
                  mt: 3,
                  mb: 2,
                  background: rootStyles.violetLight,
                  ':hover': {
                    background: rootStyles.violetDark,
                  },
                }}
              >
                <FormattedMessage id="login.signIn" defaultMessage="Sign in" />
              </Button>
            )}
            <Grid container>
              <Grid item>
                {signState === 'signUp' ? (
                  <Link to={pathes.login + '/signIn'} style={styleLink}>
                    {
                      <FormattedMessage
                        id="login.haveAcc"
                        defaultMessage="Have an account? Sign In"
                      />
                    }
                  </Link>
                ) : (
                  <Link to={pathes.login + '/signUp'} style={styleLink}>
                    {
                      <FormattedMessage
                        id="login.haveNotAcc"
                        defaultMessage="Don't have an account? Sign Up"
                      />
                    }
                  </Link>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  ) : (
    <Navigate to={`/${pathes.error}`} />
  );
};
