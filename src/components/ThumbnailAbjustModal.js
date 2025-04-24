import { useState, useEffect } from "react";
import "../styles/thumbnailAdjust.css";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


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

  

let openThumbnailModalCallback;


export function openThumbnailModal(param) {
    if (openThumbnailModalCallback) {
      openThumbnailModalCallback(param);
    }
}
  

const ThumbnailAdjustModal = ({ imageSrc, onApply }) => {
  const [vertical, setVertical] = useState(50);
  const [horizontal, setHorizontal] = useState(50);

  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // 작은 화면 감지
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    openThumbnailModalCallback = handleOpen;
  }, []);


  const handleReset = () => {
    setVertical(50);
    setHorizontal(50);
  };

  const handleApply = () => {
    onApply({ vertical, horizontal });
    handleClose();
  };

  const modalStyle = isSmallScreen
  ? {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      bgcolor: '#fcfbfa',
      overflowY: 'auto', // 세로 스크롤 활성화
      p: 4,
    }
  : {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      maxHeight: '80vh', // 최대 높이 제한
      overflowY: 'auto', // 세로 스크롤 활성화
      bgcolor: '#fcfbfa',
      boxShadow: 24,
      p: 4,
    };

  return (
    <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <div className="thumbnail-modal">
                    <button className="close-btn" onClick={handleClose}>✕</button>
                    <h2>썸네일 위치조정</h2>
                    <div className="image-container">
                        <img
                            src={imageSrc}
                            alt="preview"
                            style={{
                            objectFit: "cover",
                            objectPosition: `${horizontal}% ${vertical}%`,
                            }}
                        />
                    </div>
                    <div className="sliders">
                        <label>세로 위치</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={vertical}
                            onChange={(e) => setVertical(Number(e.target.value))}
                        />
                        <label>가로 위치</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={horizontal}
                            onChange={(e) => setHorizontal(Number(e.target.value))}
                        />
                    </div>
                    <div className="thumbnail-buttons">
                        <button onClick={handleApply}>적용</button>
                        <button onClick={handleReset}>초기화</button>
                    </div>
                </div>
            </Box>
            

        </Modal>
    </>
    
  );
};

export default ThumbnailAdjustModal;