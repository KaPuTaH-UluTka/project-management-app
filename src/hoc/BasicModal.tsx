import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Modal, Button, Icon } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { closeModal } from '../store/Reducer/confirmationReducer/confirmationReducer';
import ConfirmationModal from '../components/confirmationModal/ConfirmationModal';
import CreateBoardModal from '../components/createBoardModal/CreateBoardModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 500,
  width: '100%',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 2.5,
};

const BasicModal = () => {
  const dispatch = useAppDispatch();
  const { createBoardModal, confirmModal, createColumnModal, createTaskModal, updateTaskModal } =
    useAppSelector((state) => state.openModalReducer);
  let modal = false;
  let title = '';

  if (confirmModal) {
    title = 'Confirmation';
    modal = confirmModal;
  }
  if (createBoardModal) {
    title = 'Create Board';
    modal = createBoardModal;
  }
  if (createColumnModal) {
    title = 'Create new Column';
    modal = createColumnModal;
  }
  if (createTaskModal) {
    title = 'Create new Task';
    modal = createTaskModal;
  }
  if (updateTaskModal) {
    title = 'Update Task Information';
    modal = updateTaskModal;
  }

  return (
    <Modal
      open={modal}
      onClose={() =>
        dispatch(
          closeModal(
            createBoardModal || createColumnModal || createTaskModal || updateTaskModal
              ? 'closeCreateModal'
              : 'confirmModal'
          )
        )
      }
      sx={{ width: '100vw', height: '100vh' }}
    >
      <Box sx={style}>
        <Button
          onClick={() => {
            dispatch(
              closeModal(
                createBoardModal || createColumnModal || createTaskModal || updateTaskModal
                  ? 'closeCreateModal'
                  : 'confirmModal'
              )
            );
          }}
          style={{ position: 'absolute', right: 5, top: 5 }}
        >
          <Icon>
            <CloseIcon fontSize="medium" color="inherit" style={{ color: '#000' }} />
          </Icon>
        </Button>
        <Typography id="modal-modal-title" variant="h5" component="h2" style={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {confirmModal ? <ConfirmationModal /> : <CreateBoardModal />}
      </Box>
    </Modal>
  );
};

export default BasicModal;
