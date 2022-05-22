import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { closeModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';
import { deleteBoard } from '../../store/api/boardApi';
import { deleteColumn } from '../../store/api/columnApi';
import { deleteTask } from '../../store/api/taskApi';
import { FormattedMessage } from 'react-intl';
import { delUser } from '../../store/api/signApi';

export default function ConfirmationModal() {
  const dispatch = useAppDispatch();
  const { deleteBoardId, deleteColumnId, deleteTaskId, userId } = useAppSelector(
    (state) => state.openModalReducer
  );

  function chooseDeleteModal() {
    userId ? dispatch(closeModal('deleteUserModal')) : dispatch(closeModal('confirmModal'));
  }

  return (
    <>
      <Typography id="modal-modal-description" sx={{ mt: 2, marginBottom: 2 }}>
        <FormattedMessage
          id="confirmModal.action"
          defaultMessage="Confirm the action on the page"
        />
      </Typography>
      <Button
        variant="contained"
        color="error"
        sx={{ marginRight: 1 }}
        onClick={() => {
          chooseDeleteModal();
          if (deleteBoardId && deleteColumnId && deleteTaskId) {
            dispatch(
              deleteTask({
                boardId: deleteBoardId,
                columnId: deleteColumnId,
                taskId: deleteTaskId,
              })
            );
          } else if (deleteBoardId && deleteColumnId) {
            dispatch(deleteColumn({ boardId: deleteBoardId, columnId: deleteColumnId }));
          } else if (deleteBoardId) {
            dispatch(deleteBoard({ boardId: deleteBoardId }));
          } else if (userId) {
            dispatch(delUser(userId));
          }
        }}
      >
        <FormattedMessage id="confirmModal.agree" defaultMessage="Agree" />
      </Button>
      <Button variant="contained" color="success" onClick={chooseDeleteModal}>
        <FormattedMessage id="confirmModal.return" defaultMessage="Return" />
      </Button>
    </>
  );
}
