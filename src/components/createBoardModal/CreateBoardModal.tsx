import { closeModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addBoard } from '../../store/api/boardApi';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, ThemeProvider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import './createBoardModal.scss';
import { addColumn } from '../../store/api/columnApi';
import { useParams } from 'react-router-dom';
import { addTask } from '../../store/api/taskApi';
import { FormattedMessage, useIntl } from 'react-intl';
import { violetTheme } from '../../style/rootStyles';

const CreateBoardModal = () => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const {
    createBoardModal,
    createColumnModal,
    createTaskModal,
    updateTaskModal,
    deleteUserModal,
    order,
    userId,
    columnId,
  } = useAppSelector((state) => state.openModalReducer);
  const intl = useIntl();

  function chooseCloseModal() {
    let modalStatus;
    if (createBoardModal || createColumnModal || createTaskModal) {
      modalStatus = 'closeCreateModal';
    } else if (deleteUserModal) {
      modalStatus = 'deleteUserModal';
    } else if (updateTaskModal) {
      modalStatus = 'updateTaskModal';
    } else {
      modalStatus = 'confirmModal';
    }
    dispatch(closeModal(modalStatus));
  }

  const validationSchema =
    createBoardModal || createTaskModal
      ? yup.object({
          title: yup
            .string()
            .max(10, 'boardCreateModal.titleLength')
            .required('boardCreateModal.title'),
          description: yup
            .string()
            .max(20, 'boardCreateModal.descLength')
            .required('boardCreateModal.title'),
        })
      : yup.object({
          title: yup
            .string()
            .max(10, 'boardCreateModal.titleLength')
            .required('boardCreateModal.title'),
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

      chooseCloseModal();
    },
  });

  function getTranslate(key: string) {
    return intl.formatMessage({ id: key });
  }

  const activeSubmit = () => {
    if (createBoardModal || createTaskModal) {
      if (
        (formik.values.title === '' || formik.errors.title !== undefined) &&
        (formik.values.description === '' || formik.errors.description !== undefined)
      )
        return true;
    } else {
      if (formik.values.title === '' || formik.errors.title !== undefined) return true;
    }
  };

  return (
    <ThemeProvider theme={violetTheme}>
      <form className="form" onSubmit={formik.handleSubmit}>
        <Box sx={{ padding: '10px 0' }}>
          <TextField
            label={<FormattedMessage id="boardModal.title" defaultMessage="Title" />}
            variant="outlined"
            id="title"
            name="title"
            required
            fullWidth
            value={formik.values.title}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={
              formik.touched.title && formik.errors.title && getTranslate(formik.errors.title)
            }
          />
          {(createBoardModal || createTaskModal || updateTaskModal) && (
            <TextField
              style={{ marginTop: 20 }}
              label={<FormattedMessage id="boardModal.description" defaultMessage="Description" />}
              variant="outlined"
              id="description"
              name="description"
              required
              fullWidth
              value={formik.values.description}
              onChange={(e) => {
                formik.handleChange(e);
              }}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={
                formik.touched.description &&
                formik.errors.description &&
                getTranslate(formik.errors.description)
              }
            />
          )}
          <div className="form__button">
            <Button
              variant="contained"
              color="success"
              type="submit"
              endIcon={<AddIcon />}
              disabled={activeSubmit()}
            >
              <FormattedMessage id={'boardModal.create'} defaultMessage={'Create'} />
            </Button>
          </div>
        </Box>
      </form>
    </ThemeProvider>
  );
};

export default CreateBoardModal;
