import { useState } from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Typography,
} from '@mui/material';

function AddDialog({ open, onCancel, onOK }) {
  const [value, setValue] = useState('');

  const handleOK = () => {
    onOK(value);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Add Location</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="caption">
            Enter the location as either a ZIP code or as City, State.
          </Typography>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Location"
          type="text"
          fullWidth
          variant="standard"
          value={value}
          onChange={handleValueChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleOK}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddDialog;
