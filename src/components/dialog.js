// FormDialog.js
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PositionedSnackbar from "./PositionedSnackbar";
import axios from 'axios';

let openDialogCallback;

export function openDialog() {
  if (openDialogCallback) {
    openDialogCallback();
  }
}

export default function FormDialog({ onClose, disableBackdropClick = false, onSave, hideCancelButton = false }) {
  const [open, setOpen] = useState(false);
  const [ordererName, setOrdererName] = useState("");
  const [ordererCall, setOrdererCall] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태

  const handleClickOpen = () => {
    setOpen(true);
  };

  openDialogCallback = handleClickOpen;

  const handleClose = (event, reason) => {
    if (disableBackdropClick && (reason === "backdropClick" || reason === "escapeKeyDown")) {
      return; // 외부 클릭이나 ESC 키로 닫지 않음
    }
    setOpen(false);
    if (onClose) onClose(event, reason); 
  };
  
  const handleHistoryBack = (event, reason) => {
    if (disableBackdropClick && (reason === "backdropClick" || reason === "escapeKeyDown")) {
      return; // 외부 클릭이나 ESC 키로 닫지 않음
    }
    window.history.back();
  }

  const handleSave = async() => {
    // 유효성 검사
    if (!ordererName.trim()) {
      setErrorMessage("주문자명을 입력해 주세요.");
      return;
    }
  
    if (!ordererCall.trim()) {
      setErrorMessage("휴대폰 번호를 입력해 주세요.('-'를 제외하고 입력해 주세요.)");
      return;
    }

    sessionStorage.setItem('ordererName', ordererName);
    sessionStorage.setItem('ordererCall', ordererCall);

    onSave({ ordererName, ordererCall });
    handleClose();
    
  };


  return (
    <>
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <DialogContent>
        {!hideCancelButton && ( 
          <DialogContentText sx={{fontSize : '1.5rem'}}>
          주문 시 사용하실 주문자명과 연락 가능한 휴대폰 번호를 입력해주세요.
          </DialogContentText>
        )}
        {hideCancelButton && ( 
          <DialogContentText sx={{fontSize : '1.5rem'}}>
            청첩장 제작 시 입력하신 주문자명과 휴대폰 번호를 입력해주세요.
          </DialogContentText>
        )}
          <TextField
            InputProps={{
                // sx: { fontSize: "1.5rem" }, // 입력 필드의 폰트 크기
                
              }}
              sx={{
                '& .MuiInputLabel-root': {
                    fontSize: '1.2rem', // label 텍스트 크기 조절
                },
                }}
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="주문자명"
            type="name"
            value={ordererName}
            onChange={(e) => setOrdererName(e.target.value)}
            fullWidth
            variant="standard"
          />
          <TextField
            InputProps={{
                sx: { fontSize: "1.5rem" }, // 입력 필드의 폰트 크기
            }}
            sx={{
                '& .MuiInputLabel-root': {
                  fontSize: '1.2rem', // label 텍스트 크기 조절
                },
              }}
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="휴대폰 번호"
            value={ordererCall}
            onChange={(e) => setOrdererCall(e.target.value)}
            type="phone"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        {hideCancelButton && ( // hideCancelButton이 true일 경우 '취소' 버튼 숨김
          <DialogActions>
            <Button sx={{fontSize : '1.5rem'}} onClick={handleHistoryBack}>취소</Button>
            <Button type="submit" sx={{fontSize : '1.5rem'}} onClick={handleSave}>저장</Button>
          </DialogActions>
        )}
        {!hideCancelButton && ( 
        <DialogActions>
            <Button sx={{fontSize : '1.5rem'}} onClick={handleClose}>취소</Button>
            <Button type="submit" sx={{fontSize : '1.5rem'}} onClick={handleSave}>저장</Button>
        </DialogActions>
        )}
      </Dialog>
    </React.Fragment>

    <PositionedSnackbar
        message={errorMessage}
        onClose={() => setErrorMessage("")}
      />
    </>
  );
}