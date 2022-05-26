import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Modal, Button, Icon } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { closeModal } from '../store/Reducer/confirmationReducer/confirmationReducer';
import ConfirmationModal from '../components/confirmationModal/ConfirmationModal';
import CreateBoardModal from '../components/createBoardModal/CreateBoardModal';
import UpdateTaskModal from '../components/updateTaskModal/UpdateTaskModal';
import { TasksModal } from '../components/SearchTasksModal/SearchTasksModal';

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
  overflowY: 'scroll',
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
    searchTasksModal,
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
  if (searchTasksModal) {
    title = 'Tasks';
    modal = searchTasksModal;
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
    title = '';
    modal = updateTaskModal;
  }

  function chooseDeleteModal() {
    let modalStatus;
    if (createBoardModal || createColumnModal || createTaskModal || searchTasksModal) {
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
        {updateTaskModal && <UpdateTaskModal />}
        {(confirmModal || deleteUserModal) && <ConfirmationModal />}
        {(createBoardModal || createColumnModal || createTaskModal) && <CreateBoardModal />}
        {searchTasksModal && <TasksModal />}
      </Box>
    </Modal>
  );
};

export default BasicModal;
