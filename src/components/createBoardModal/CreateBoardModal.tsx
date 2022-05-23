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
import { addColumn } from '../../store/api/columnApi';
import { useParams } from 'react-router-dom';
import { addTask } from '../../store/api/taskApi';
import { FormattedMessage } from 'react-intl';

const CreateBoardModal = () => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const { createBoardModal, createColumnModal, createTaskModal, order, userId, columnId } =
    useAppSelector((state) => state.openModalReducer);

  const validationSchema =
    createBoardModal || createTaskModal
      ? yup.object({
          title: yup.string().required('Title is required'),
          description: yup.string().required('Title is required'),
        })
      : yup.object({
          title: yup.string().required('Title is required'),
        });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      if (createBoardModal) {
        dispatch(
          addBoard({ title: `${formik.values.title}`, description: `${formik.values.description}` })
        );
      } else if (createColumnModal) {
        dispatch(addColumn({ title: `${formik.values.title}`, order, boardId: boardId as string }));
      } else if (createTaskModal) {
        dispatch(
          addTask({
            title: `${formik.values.title}`,
            description: `${formik.values.description}`,
            order,
            columnId,
            userId,
            boardId: boardId as string,
          })
        );
      }
      dispatch(
        closeModal(
          createBoardModal || createColumnModal || createTaskModal
            ? 'closeCreateModal'
            : 'confirmModal'
        )
      );
    },
  });

  const activeSubmit = () => {
    return formik.errors.title != undefined;
  };

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <Box sx={{ padding: '10px 0' }}>
        <TextField
          label={<FormattedMessage id="boardModal.title" defaultMessage="Title" />}
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
        {createBoardModal || createTaskModal ? (
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
        ) : null}
        <div className="form__button">
          <Button
            variant="contained"
            color="success"
            type="submit"
            endIcon={<AddIcon />}
            disabled={activeSubmit()}
          >
            <FormattedMessage id="boardModal.create" defaultMessage="Create" />
          </Button>
        </div>
      </Box>
    </form>
  );
};

export default CreateBoardModal;
