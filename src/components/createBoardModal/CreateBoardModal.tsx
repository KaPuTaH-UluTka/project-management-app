import { closeModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addBoard } from '../../store/api/boardApi';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';

import './createBoardModal.scss';

const CreateBoardModal = () => {
  const dispatch = useAppDispatch();
  const { createBoardModal } = useAppSelector((state) => state.openModalReducer);

  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Title is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      dispatch(
        addBoard({ title: `${formik.values.title}`, description: `${formik.values.description}` })
      );
      dispatch(closeModal(createBoardModal ? 'createBoardModal' : 'confirmModal'));
    },
  });

  const activeSubmit = () => {
    if (formik.errors.title == undefined) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <Box sx={{ padding: '10px 0' }}>
        <TextField
          label="Title"
          variant="outlined"
          id="title"
          name="title"
          fullWidth
          value={formik.values.title}
          onChange={(e) => {
            formik.handleChange(e);
            activeSubmit();
          }}
          error={formik.touched.title}
        />
        <TextField
          style={{ marginTop: 20 }}
          label="Description"
          variant="outlined"
          id="description"
          name="description"
          fullWidth
          value={formik.values.description}
          onChange={(e) => {
            formik.handleChange(e);
            activeSubmit();
          }}
          error={formik.touched.title}
        />
        <div className="form__button">
          <Button
            variant="contained"
            color="success"
            type="submit"
            endIcon={<AddIcon />}
            disabled={activeSubmit()}
          >
            Create
          </Button>
        </div>
      </Box>
    </form>
  );
};

export default CreateBoardModal;
