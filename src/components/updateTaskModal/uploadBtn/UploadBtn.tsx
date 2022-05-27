import React, { FormEvent } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FormattedMessage } from 'react-intl';

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
        <FormattedMessage id="updateModal.uploadBtn" defaultMessage="Upload picture" />
      </Fab>
    </label>
  );
};

export default UploadBtn;
