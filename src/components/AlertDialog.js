import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

let openDialogCallback;
var param = "";
export function openAlertDialog(params) {
  console.log('params@@@@@', params);
  param = params
  if (openDialogCallback) {
    openDialogCallback();
  }
}

export default function AlertDialog({ onConfirm }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  openDialogCallback = handleClickOpen;

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async() => {
    onConfirm(param);
    handleClose();
    
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {/* {"워터마크를 제거하시겠습니까?"} */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{fontSize : '1.5rem'}}>
            워터마크를 제거하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Button onClick={handleClose} sx={{fontSize : '1.5rem'}} color="primary">취소</Button>
          <Button onClick={handleSave} sx={{fontSize : '1.5rem'}} >확인</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}