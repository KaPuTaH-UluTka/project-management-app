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
  const {
    createBoardModal,
    confirmModal,
    createColumnModal,
    createTaskModal,
    deleteUserModal,
    updateTaskModal,
  } = useAppSelector((state) => state.openModalReducer);
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
  if (deleteUserModal) {
    title = 'Confirm account deletion';
    modal = deleteUserModal;
  }
  if (updateTaskModal) {
    title = 'Update Task Information';
    modal = updateTaskModal;
  }

  function chooseDeleteModal() {
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

  return (
    <Modal open={modal} onClose={chooseDeleteModal} sx={{ width: '100vw', height: '100vh' }}>
      <Box sx={style}>
        <Button onClick={chooseDeleteModal} style={{ position: 'absolute', right: 5, top: 5 }}>
          <Icon>
            <CloseIcon fontSize="medium" color="inherit" style={{ color: '#000' }} />
          </Icon>
        </Button>
        <Typography id="modal-modal-title" variant="h5" component="h2" style={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {confirmModal || deleteUserModal ? <ConfirmationModal /> : <CreateBoardModal />}
      </Box>
    </Modal>
  );
};

export default BasicModal;
