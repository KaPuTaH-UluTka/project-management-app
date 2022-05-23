import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@mui/material/Button';
import { closeModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useFormik } from 'formik';
import { Box, Container, Input, TextField } from '@mui/material';
import { getTask, updateTaskViaModal } from '../../store/api/taskApi';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';

const UpdateTaskModal = () => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const { order, taskId, columnId, done } = useAppSelector((state) => state.openModalReducer);
  const [editMode, setEditMode] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const updateTaskSchema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Title is required'),
  });
  useEffect(() => {
    dispatch(getTask({ boardId: boardId as string, columnId, taskId }));
  });
  const updateTaskForm = useFormik({
    initialValues: {
      title: '',
      description: '',
      file: Blob,
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

  function handleUpload(e: React.FormEvent) {
    const target = e.target as HTMLInputElement;
    const fileReader = new FileReader();
    if (target.files) {
      fileReader.readAsDataURL(target.files[0]);
      updateTaskForm.setFieldValue('file', target.files[0]);
    }
  }

  return (
    <>
      <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={updateTaskForm.handleSubmit}>
        <TextField
          label={<FormattedMessage id="boardModal.title" defaultMessage="Title" />}
          variant="outlined"
          id="title"
          name="title"
          fullWidth
          value={updateTaskForm.values.title}
          onChange={(e) => {
            updateTaskForm.handleChange(e);
          }}
          error={updateTaskForm.touched.title}
        />
        <TextField
          style={{ marginTop: 20 }}
          label="Description"
          variant="outlined"
          id="description"
          name="description"
          fullWidth
          value={updateTaskForm.values.description}
          onChange={(e) => {
            updateTaskForm.handleChange(e);
          }}
          error={updateTaskForm.touched.title}
        />
        <Input id="avatar" type="file" onChange={(e) => handleUpload(e)} />
        <Container>
          <Button variant="contained" color="error" sx={{ marginRight: 1 }} type="submit">
            <FormattedMessage id="confirmModal.agree" defaultMessage="Agree" />
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
    </>
  );
};

export default UpdateTaskModal;
