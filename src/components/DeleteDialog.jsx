import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';

function DeleteDialog({ location, open, onCancel, onOK }) {
  return (
    /* eslint-disable react/jsx-one-expression-per-line */
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
    /* eslint-enable react/jsx-one-expression-per-line */
  );
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOK: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
};

export default DeleteDialog;
