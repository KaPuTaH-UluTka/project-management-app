import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Modal, Button, Icon } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { closeModal } from '../store/Reducer/confirmationReducer/confirmationReducer';

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

interface Props {
  children: JSX.Element;
  title: string;
}

const BasicModal = (props: Props) => {
  const dispatch = useAppDispatch();
  const { createBoardModal, confirmModal } = useAppSelector((state) => state.openModalReducer);
  let modal = false;

  if (props.title == 'Confirmation') {
    modal = confirmModal;
  }
  if (props.title == 'Create Board') {
    modal = createBoardModal;
  }

  return (
    <Modal
      open={modal}
      onClose={() => dispatch(closeModal(createBoardModal ? 'createBoardModal' : 'confirmModal'))}
      sx={{ width: '100vw', height: '100vh' }}
    >
      <Box sx={style}>
        <Button
          onClick={() => {
            dispatch(closeModal(createBoardModal ? 'createBoardModal' : 'confirmModal'));
          }}
          style={{ position: 'absolute', right: 5, top: 5 }}
        >
          <Icon>
            <CloseIcon fontSize="medium" color="inherit" style={{ color: '#000' }} />
          </Icon>
        </Button>
        <Typography id="modal-modal-title" variant="h5" component="h2" style={{ fontWeight: 600 }}>
          {props.title}
        </Typography>
        {props.children}
      </Box>
    </Modal>
  );
};

export default BasicModal;
