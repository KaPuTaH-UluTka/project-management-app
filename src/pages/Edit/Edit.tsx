import { violetTheme } from '../../style/rootStyles';
import { Avatar, Box, Container, TextField, ThemeProvider, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import noAvatar from '../../assets/no-avatar.png';
import { delUser, getUser, updateUser } from '../../store/api/signApi';
import { useAppDispatch } from '../../hooks/hooks';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { editProfileContainer, editSection, editSubmitContainer } from './editStyle';
import * as yup from 'yup';
import IconButton from '@mui/material/IconButton';
import { FormattedMessage, useIntl } from 'react-intl';
import { openModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';

export const Edit = () => {
  const dispatch = useAppDispatch();
  const userName = localStorage.getItem('userName') || '';
  const userEmail = localStorage.getItem('login') || '';
  const id = localStorage.getItem('userID');
  const [nameState, setNameState] = useState(false);
  const [emailState, setEmailState] = useState(false);
  const intl = useIntl();

  function changeName() {
    setNameState(!nameState);
  }
  function changeEmail() {
    setEmailState(!emailState);
  }
  function cancelChangeName() {
    editProfileForm.values.name = editProfileForm.values.prevName;
    changeName();
  }
  function cancelChangeEmail() {
    editProfileForm.values.email = editProfileForm.values.prevEmail;
    changeEmail();
  }
  const validationSchema = yup.object({
    name: yup.string().min(4),
    email: yup.string().required(),
    password: yup.string().min(8, 'login.passwordValidation').required('login.passwordReq'),
  });
  const editProfileForm = useFormik({
    initialValues: {
      name: userName,
      prevName: userName,
      email: userEmail,
      prevEmail: userEmail,
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      editProfileForm.values.prevName = editProfileForm.values.name;
      editProfileForm.values.prevEmail = editProfileForm.values.email;
      setNameState(false);
      setEmailState(false);
      if (id) {
        const updatedUser = {
          id: id,
          user: {
            name: editProfileForm.values.name,
            login: editProfileForm.values.email,
            password: editProfileForm.values.password,
          },
        };
        dispatch(updateUser(updatedUser)).then(async (res) => {
          if (res.payload) {
            dispatch(getUser(id));
          }
        });
        editProfileForm.setFieldValue('password', '');
        editProfileForm.touched.password = false;
      }
    },
  });

  function getTranslate(key: string) {
    return intl.formatMessage({ id: key });
  }

  function activeSubmit() {
    return !(
      editProfileForm.values.name &&
      editProfileForm.values.email &&
      editProfileForm.values.password &&
      !editProfileForm.errors.name &&
      !editProfileForm.errors.password
    );
  }

  function deleteAccount() {
    if (typeof id === 'string') {
      dispatch(openModal({ userId: id, modal: 'deleteUserModal' }));
    }
  }

  return (
    <ThemeProvider theme={violetTheme}>
      <Container component="main" maxWidth="xs">
        <Box sx={editSection}>
          <Typography component="h1" variant="h5">
            <FormattedMessage id="editProfile.title" defaultMessage="Edit profile" />
          </Typography>
          <Avatar sx={{ m: 1, width: 100, height: 100 }} src={noAvatar} />
          <Box
            component="form"
            noValidate
            sx={{ mt: 1, width: 1 }}
            onSubmit={editProfileForm.handleSubmit}
          >
            <Container sx={editProfileContainer}>
              <Typography sx={{ pr: 1 }}>
                <FormattedMessage id="editProfile.name" defaultMessage="Name:" />
              </Typography>
              {nameState ? (
                <>
                  <Input
                    id="name"
                    size="small"
                    value={editProfileForm.values.name}
                    onChange={editProfileForm.handleChange}
                    error={editProfileForm.touched.name && Boolean(editProfileForm.errors.name)}
                  />
                  <IconButton onClick={changeName}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton onClick={cancelChangeName}>
                    <ClearIcon />
                  </IconButton>
                </>
              ) : (
                <Typography onClick={changeName}>{editProfileForm.values.name}</Typography>
              )}
            </Container>
            <Container sx={editProfileContainer}>
              <Typography sx={{ pr: 1 }}>
                <FormattedMessage id="editProfile.email" defaultMessage="Email:" />
              </Typography>
              {emailState ? (
                <>
                  <Input
                    id="email"
                    size="small"
                    value={editProfileForm.values.email}
                    onChange={editProfileForm.handleChange}
                    error={editProfileForm.touched.email && Boolean(editProfileForm.errors.email)}
                  />
                  <IconButton onClick={changeEmail}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton onClick={cancelChangeEmail}>
                    <ClearIcon />
                  </IconButton>
                </>
              ) : (
                <Typography onClick={changeEmail}>{editProfileForm.values.email}</Typography>
              )}
            </Container>
            <Container sx={editSubmitContainer}>
              <TextField
                id="password"
                label={<FormattedMessage id="editProfile.password" defaultMessage="Password" />}
                variant="standard"
                name="password"
                type="password"
                value={editProfileForm.values.password}
                onChange={editProfileForm.handleChange}
                error={editProfileForm.touched.password && Boolean(editProfileForm.errors.password)}
                helperText={
                  editProfileForm.touched.password &&
                  editProfileForm.errors.password &&
                  getTranslate(editProfileForm.errors.password)
                }
              />
              <Button variant="contained" size="small" type="submit" disabled={activeSubmit()}>
                <FormattedMessage id="editProfile.saveChanges" defaultMessage="Save changes" />
              </Button>
            </Container>
          </Box>
          <Container>
            <Button
              sx={{ mt: 1, width: '100%' }}
              variant="contained"
              size="small"
              type="submit"
              color={'error'}
              onClick={deleteAccount}
            >
              <FormattedMessage id="editProfile.delUser" defaultMessage="Delete account" />
            </Button>
          </Container>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
