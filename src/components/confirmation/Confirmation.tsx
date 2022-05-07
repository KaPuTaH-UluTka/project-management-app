import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { closeModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';

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
  p: 4,
};

export default function BasicModal() {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((state) => state.openModalReducer);
  if (open) {
    console.log(document);
    document.body.style.overflow = 'none !important';
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={() => dispatch(closeModal())}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
