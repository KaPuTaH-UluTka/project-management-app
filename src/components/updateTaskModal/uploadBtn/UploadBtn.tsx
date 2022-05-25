import React, { FormEvent } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const UploadBtn = (props: { handleUpload: (e: FormEvent<HTMLInputElement>) => Promise<void> }) => {
  return (
    <label htmlFor="upload-photo">
      <input
        style={{ display: 'none' }}
        id="upload-photo"
        name="upload-photo"
        type="file"
        accept="image/*"
        onChange={(e) => props.handleUpload(e)}
      />
      <Fab
        color="secondary"
        size="small"
        component="span"
        aria-label="add"
        variant="extended"
        sx={{ lineHeight: '20px' }}
      >
        <AddIcon />
        Upload picture
      </Fab>
    </label>
  );
};

export default UploadBtn;
