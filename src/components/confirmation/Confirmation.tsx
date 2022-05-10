import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { closeModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';
import { deleteBoard } from '../../store/api/boardApi';
import { deleteColumn } from '../../store/api/columnApi';
import { deleteTask } from '../../store/api/taskApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 2.5,
};

export default function BasicModal() {
  const dispatch = useAppDispatch();
  const { modal, deleteBoardId, deleteColumnId, deleteTaskId } = useAppSelector(
    (state) => state.openModalReducer
  );
  return (
    <div>
      <Modal
        open={modal}
        onClose={() => dispatch(closeModal())}
        sx={{ width: '100vw', height: '100vh' }}
      >
        <Box sx={style}>
          <Button
            onClick={() => {
              dispatch(closeModal());
            }}
            style={{ position: 'absolute', right: 5, top: 5 }}
          >
            <CloseIcon fontSize="small" color="inherit" />
          </Button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, marginBottom: 2 }}>
            Сonfirm the action on the page
          </Typography>
          <Button
            variant="contained"
            color="error"
            sx={{ marginRight: 1 }}
            onClick={() => {
              dispatch(closeModal());
              if (deleteBoardId && deleteColumnId && deleteTaskId) {
                dispatch(
                  deleteTask({
                    boardId: deleteBoardId,
                    columnId: deleteColumnId,
                    taskId: deleteTaskId,
                  })
                );
              } else if (deleteBoardId && deleteColumnId) {
                console.log(deleteBoardId, deleteColumnId, deleteTaskId);
                dispatch(deleteColumn({ boardId: deleteBoardId, columnId: deleteColumnId }));
              } else if (deleteBoardId) {
                dispatch(deleteBoard({ boardId: deleteBoardId }));
              }
              // add delet board functional
            }}
          >
            Agree
          </Button>
          <Button variant="contained" color="success" onClick={() => dispatch(closeModal())}>
            Return
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
