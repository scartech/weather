import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Link,
} from '@mui/material';

function KeyDialog({ open, onCancel, onOK }) {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const key = localStorage.getItem('apiKey');
    setApiKey(key);
  }, []);

  const handleOK = () => {
    onOK(apiKey);
  };

  const handleKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Weatherbit API</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="caption">
            Sign up for a free Weatherbit.io API account &nbsp;
            <Link
              href="https://www.weatherbit.io/account/create"
              target="_blank"
            >
              here
            </Link>
            .
          </Typography>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="API Key"
          type="text"
          fullWidth
          variant="standard"
          value={apiKey}
          onChange={handleKeyChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleOK}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

KeyDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOK: PropTypes.func.isRequired,
};

export default KeyDialog;
