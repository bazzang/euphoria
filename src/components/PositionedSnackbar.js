import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function PositionedSnackbar({ message, onClose }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (message) {
      setOpen(true); // 메시지가 변경되면 Snackbar를 열어줌
    }
  }, [message]);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    //   message={message}
      key="top-center"
      sx={{fontSize : '1.5rem'}}
    >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%', fontSize : '1.5rem' }}
        >{message}</Alert>
    </Snackbar>
  );
}
