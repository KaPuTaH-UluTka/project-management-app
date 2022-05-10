import { violetTheme } from '../../style/rootStyles';
import { Avatar, Box, Container, TextField, ThemeProvider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import noAvatar from '../../assets/no-avatar.png';
import { getUser, updateUser, uploadAvatar } from '../../store/api/signApi';
import { useAppDispatch } from '../../hooks/hooks';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

export const Edit = () => {
  const dispatch = useAppDispatch();
  const userName = localStorage.getItem('userName') || '';
  const userEmail = localStorage.getItem('login') || '';
  const id = localStorage.getItem('userID');
  useEffect(() => {
    if (typeof id === 'string') {
      dispatch(getUser(id));
    }
  }, []);
  const [nameState, setNameState] = useState(false);
  const [emailState, setEmailState] = useState(false);
  function changeName() {
    setNameState(!nameState);
  }
  function changeEmail() {
    setEmailState(!emailState);
  }
  function cancelChangeName() {
    formik.values.name = formik.values.prevName;
    changeName();
  }
  function cancelChangeEmail() {
    formik.values.email = formik.values.prevEmail;
    changeEmail();
  }
  function handleAvatar(e: React.FormEvent) {
    const target = e.target as HTMLInputElement;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        avatarForm.setFieldValue('avatar', fileReader.result);
      }
    };
    if (target.files) {
      fileReader.readAsDataURL(target.files[0]);
      avatarForm.setFieldValue('avatarFile', target.files[0]);
    }
  }
  const formik = useFormik({
    initialValues: {
      name: userName,
      prevName: userName,
      email: userEmail,
      prevEmail: userEmail,
      password: '',
    },
    onSubmit: () => {
      formik.values.prevName = formik.values.name;
      formik.values.prevEmail = formik.values.email;
      setNameState(false);
      setEmailState(false);
      if (id) {
        const updatedUser = {
          id: id,
          user: {
            name: formik.values.name,
            login: formik.values.email,
            password: formik.values.password,
          },
        };
        dispatch(updateUser(updatedUser));
        formik.values.password = '';
      }
    },
  });
  const avatarForm = useFormik({
    initialValues: {
      avatar: noAvatar,
      avatarFile: Blob,
    },
    onSubmit: () => {
      dispatch(uploadAvatar(URL.createObjectURL(avatarForm.values.avatarFile)));
    },
  });
  return (
    <ThemeProvider theme={violetTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Edit profile
          </Typography>
          <Avatar sx={{ m: 1, width: 100, height: 100 }} src={avatarForm.values.avatar} />
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={avatarForm.handleSubmit}>
            <Input id="avatar" type="file" onChange={(e) => handleAvatar(e)} />
            <button type="submit">+</button>
          </Box>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={formik.handleSubmit}>
            <Container sx={{ mt: 1, width: 200 }}>
              {nameState ? (
                <>
                  <Input id="name" value={formik.values.name} onChange={formik.handleChange} />
                  <button onClick={changeName}>+</button>
                  <button onClick={cancelChangeName}>-</button>
                </>
              ) : (
                <Typography onClick={changeName}>{formik.values.name}</Typography>
              )}
            </Container>
            <Container sx={{ mt: 1, width: 200 }}>
              {emailState ? (
                <>
                  <Input id="email" value={formik.values.email} onChange={formik.handleChange} />
                  <button onClick={changeName}>+</button>
                  <button onClick={cancelChangeEmail}>-</button>
                </>
              ) : (
                <Typography onClick={changeEmail}>{formik.values.email}</Typography>
              )}
            </Container>
            <TextField
              id="password"
              label="Password"
              variant="standard"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <Button variant="contained" type="submit">
              Save changes
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
