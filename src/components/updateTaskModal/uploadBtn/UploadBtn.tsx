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
        onChange={(e) => props.handleUpload(e)}
        accept="image/*"
      />
      <Fab
        color="secondary"
        size="small"
        aria-label="add"
        variant="extended"
        sx={{ lineHeight: 20 }}
      >
        <AddIcon />
        Upload picture
      </Fab>
    </label>
  );
};

export default UploadBtn;
