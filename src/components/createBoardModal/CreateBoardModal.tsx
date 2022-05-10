import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';

import './createBoardModal.scss';

const style = {
  padding: '20px 0',
};

const CreateBoardModal = () => {
  return (
    <form className="form">
      <Box sx={style}>
        <input type="text" className="form__title" placeholder="Title" />
        <textarea className="form__descr" placeholder="Description" />
        <div className="form__button">
          <Button variant="contained" color="success" endIcon={<AddIcon />}>
            Create
          </Button>
        </div>
      </Box>
    </form>
  );
};

export default CreateBoardModal;
