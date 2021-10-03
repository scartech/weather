import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';

function AddDialog({ open, onCancel, onOK }) {
  const [value, setValue] = useState('');

  const handleOK = () => {
    onOK(value);
    setValue('');
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Add Location</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the location as either a ZIP code or as City, State.
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

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOK: PropTypes.func.isRequired,
};

export default AddDialog;
