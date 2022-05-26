import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@mui/material/Button';
import { closeModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useFormik } from 'formik';
import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  Input,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { downloadFile, updateTaskViaModal, uploadFile } from '../../store/api/taskApi';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import {
  btnContainerStyle,
  descContainerStyle,
  descInputStyle,
  modalBoxStyle,
  titleContainerStyle,
  titleInputStyle,
  titleStyle,
} from './updateTaskModalStyles';
import { rootStyles, violetTheme } from '../../style/rootStyles';
import { ITaskFilesInfo } from '../../types/types';
import UploadBtn from './uploadBtn/UploadBtn';

const UpdateTaskModal = () => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const { order, taskId, columnId, done } = useAppSelector((state) => state.openModalReducer);
  const { taskTitle, taskDesc, taskFilesInfo, taskFiles } = useAppSelector(
    (state) => state.apiReducer
  );
  const [titleState, setTitleState] = useState(false);
  const [descState, setDescState] = useState(false);
  useEffect(() => {
    taskFilesInfo.forEach((e: ITaskFilesInfo) =>
      dispatch(downloadFile({ taskId: taskId, filename: e.filename }))
    );
  }, []);
  const updateTaskSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
  });
  const updateTaskForm = useFormik({
    initialValues: {
      title: taskTitle,
      prevTitle: taskTitle,
      description: taskDesc,
      prevDescription: taskDesc,
    },
    validationSchema: updateTaskSchema,
    onSubmit: () => {
      const userId = localStorage.getItem('userID') || '';
      dispatch(
        updateTaskViaModal({
          title: `${updateTaskForm.values.title}`,
          description: `${updateTaskForm.values.description}`,
          order,
          columnId,
          userId,
          taskId,
          boardId: boardId as string,
          done,
        })
      );
      dispatch(closeModal('updateTaskModal'));
    },
  });

  function changeTitle() {
    setTitleState(!titleState);
  }

  function changeDesc() {
    setDescState(!descState);
  }

  function cancelChangeTitle() {
    updateTaskForm.values.title = updateTaskForm.values.prevTitle;
    changeTitle();
  }

  function cancelChangeDesc() {
    updateTaskForm.values.description = updateTaskForm.values.prevDescription;
    changeDesc();
  }
  async function handleUpload(e: React.FormEvent) {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      const formData = new FormData();
      formData.append('taskId', taskId);
      formData.append('file', target.files[0]);
      dispatch(uploadFile(formData));
    }
  }

  return (
    <>
      <ThemeProvider theme={violetTheme}>
        <Box component="form" noValidate sx={modalBoxStyle} onSubmit={updateTaskForm.handleSubmit}>
          <Container sx={titleContainerStyle}>
            {titleState ? (
              <>
                <Input
                  id="title"
                  sx={titleInputStyle}
                  value={updateTaskForm.values.title}
                  onChange={updateTaskForm.handleChange}
                  error={updateTaskForm.touched.title && Boolean(updateTaskForm.errors.title)}
                />
                <IconButton onClick={changeTitle}>
                  <CheckIcon />
                </IconButton>
                <IconButton onClick={cancelChangeTitle}>
                  <ClearIcon />
                </IconButton>
              </>
            ) : (
              <Typography sx={titleStyle} onClick={changeTitle}>
                {updateTaskForm.values.title}
              </Typography>
            )}
          </Container>
          <Container sx={descContainerStyle}>
            <Typography sx={{ pr: 1, fontSize: 18 }}>
              <FormattedMessage id="updateModal.description" defaultMessage="Description:" />
            </Typography>
            {descState ? (
              <>
                <TextField
                  id="description"
                  variant="standard"
                  multiline
                  rows={3}
                  sx={descInputStyle}
                  value={updateTaskForm.values.description}
                  onChange={updateTaskForm.handleChange}
                  error={
                    updateTaskForm.touched.description && Boolean(updateTaskForm.errors.description)
                  }
                />
                <IconButton onClick={changeDesc}>
                  <CheckIcon />
                </IconButton>
                <IconButton onClick={cancelChangeDesc}>
                  <ClearIcon />
                </IconButton>
              </>
            ) : (
              <Typography sx={{ wordWrap: 'break-word' }} onClick={changeDesc}>
                {updateTaskForm.values.description}
              </Typography>
            )}
          </Container>
          <Container>
            <Typography sx={{ pr: 1, fontSize: 18 }}>
              <FormattedMessage id="updateModal.attachment" defaultMessage="Attachments:" />
            </Typography>
            <ImageList
              sx={{ height: 298, backgroundColor: rootStyles.gray, padding: 1 }}
              cols={1}
              gap={5}
            >
              {taskFiles.map((e, i) => {
                return (
                  <ImageListItem key={i}>
                    <img src={`${e}`} alt={'taskImage'} loading="lazy" />
                  </ImageListItem>
                );
              })}
            </ImageList>
            <UploadBtn handleUpload={handleUpload} />
          </Container>
          <Container sx={btnContainerStyle}>
            <Button variant="contained" color="primary" sx={{ marginRight: 1 }} type="submit">
              <FormattedMessage id="updateModal.save" defaultMessage="Save" />
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                dispatch(closeModal('updateTaskModal'));
              }}
            >
              <FormattedMessage id="confirmModal.return" defaultMessage="Return" />
            </Button>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default UpdateTaskModal;
