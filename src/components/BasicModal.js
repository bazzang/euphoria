import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

// Callback을 전역 변수로 관리
let openBasicModalCallback;

export function openBasicModal(param) {
  if (openBasicModalCallback) {
    openBasicModalCallback(param);
  }
}

export default function BasicModal() {
  const [open, setOpen] = useState(false); // `useState`를 컴포넌트 내부로 이동
  const [selectedImage, setSelectedImage] = useState(null); // 내부에서 상태 관리
  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // 콜백을 업데이트
  openBasicModalCallback = handleOpen;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {selectedImage ? (
              <img src={selectedImage} alt="Preview" style={{ width: '100%' }} />
            ) : (
              '이미지를 선택하세요.'
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
