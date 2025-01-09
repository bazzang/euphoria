// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { width } from '@mui/system';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: "100%",
//   boxShadow: 24,
//   p: 4,
// };

// // Callback을 전역 변수로 관리
// let openBasicModalCallback;

// export function openBasicModal(param, idx) {
//   if (openBasicModalCallback) {
//     openBasicModalCallback(param, idx);
//   }
// }

// export default function BasicModal() {
//   const [open, setOpen] = useState(false); // `useState`를 컴포넌트 내부로 이동
//   const [selectedImage, setSelectedImage] = useState([]); // 내부에서 상태 관리
//   const [idx, setIdx] = useState(0);
//   const handleOpen = (images, idx) => {

//     setSelectedImage(images);
//     setOpen(true);
//   };
//   const handleClose = () => setOpen(false);

//   var settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     width:"100%",
//     lazyLoad: true,
//     initialSlide: 2
//   };

//   // 콜백을 업데이트
//   openBasicModalCallback = handleOpen;

//   return (
//     <div>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
            
//             <div className="slider-container" style={{top:"50%", bottom:"50%"}}>
//                 <Slider {...settings}>
//                 {Array.isArray(selectedImage) &&
//                 selectedImage.map((image, index) => (
//                     <div key={index}>
//                     <img
//                         src={image}
//                         alt={`gallery-${index}`}
//                         style={{
//                         width: "100%",
//                         maxHeight: "100%",
//                         objectFit: "contain",
//                         }}
//                     />
//                     </div>
//                 ))}
//                 </Slider>
//             </div>
//         </Box>
        
        
//       </Modal>
//     </div>
//   );
// }
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
