import { violetTheme } from '../../style/rootStyles';
import { Avatar, Box, Container, ThemeProvider, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState } from 'react';
import { useFormik } from 'formik';

export const Edit = () => {
  const [nameState, setNameState] = useState(false);
  function changeName() {
    setNameState(!nameState);
  }
  function cancelChange() {
    formik.values.name = formik.values.prevName;
    changeName();
  }
  const formik = useFormik({
    initialValues: {
      name: 'name',
      prevName: 'name',
    },
    onSubmit: () => {
      formik.values.prevName = formik.values.name;
      changeName();
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
          <Avatar sx={{ m: 1, width: 100, height: 100 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit profile
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={formik.handleSubmit}>
            {nameState ? (
              <input id="name" value={formik.values.name} onChange={formik.handleChange} />
            ) : (
              <p onClick={changeName}>{formik.values.name}</p>
            )}
            {nameState ? (
              <>
                <button type="submit">+</button>
                <button onClick={cancelChange}>-</button>
              </>
            ) : null}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
