import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from '@mui/material';

function DeleteDialog({ location, open, onCancel, onOK }) {
  return (
    <Dialog open={open} fullWidth>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {location}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onOK(location)}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
