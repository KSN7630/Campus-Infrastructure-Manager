import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Success icon
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Error icon
import WarningIcon from '@mui/icons-material/Warning'; // Warning icon
import InfoIcon from '@mui/icons-material/Info'; // Info icon

const AlertPopup = ({ open, onClose, severity, title, message }) => {
  // Define icons and colors based on severity
  let icon = null;
  let color = 'primary';

  switch (severity) {
    case 'success':
      icon = <CheckCircleOutlineIcon fontSize="large" />;
      color = 'success';
      break;
    case 'error':
      icon = <ErrorOutlineIcon fontSize="large" />;
      color = 'error';
      break;
    case 'warning':
      icon = <WarningIcon fontSize="large" />;
      color = 'warning';
      break;
    case 'info':
      icon = <InfoIcon fontSize="large" />;
      color = 'info';
      break;
    default:
      break;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {icon && (
            <div style={{ marginRight: '16px', color: color }}>{icon}</div>
          )}
          <div>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1">{message}</Typography>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color={color}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertPopup;
