import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../hooks/hooks';
import { closeModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';

export default function ConfirmationModal() {
  const dispatch = useAppDispatch();

  return (
    <>
      <Typography id="modal-modal-description" sx={{ mt: 2, marginBottom: 2 }}>
        Сonfirm the action on the page
      </Typography>
      <Button
        variant="contained"
        color="error"
        sx={{ marginRight: 1 }}
        onClick={() => {
          dispatch(closeModal('confirmModal'));
          // add delet board functional
        }}
      >
        Agree
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={() => dispatch(closeModal('confirmModal'))}
      >
        Return
      </Button>
    </>
  );
}
