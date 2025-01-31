import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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

// Callback을 전역 변수로 관리
let openSalModalCallback;

export function openSalModal(param) {
  if (openSalModalCallback) {
    openSalModalCallback(param);
  }
}

export default function SalModal({ onSalSelect }) {
  const [open, setOpen] = useState(false); // `useState`를 컴포넌트 내부로 이동
  const [selectedSal, setSelectedSal] = useState(null); // 내부에서 상태 관리

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // 작은 화면 감지



  const Sals = [
    {
        content : 
                  "오랜 기다림 속에서 저희 두 사람,<br/>"+
                  "한 마음 되어 참된 사랑의 결실을<br/>"+
                  "맺게 되었습니다.<br/><br/>"+
                  "오셔서 축복해 주시면 큰 기쁨이겠습니다."
    },
    {
      content :  
                "두 사람이 만나<br/>"+
                "미래를 함께하고자 합니다.<br/>"+
                "서로 모르고 살아온 어제보다<br/>"+
                "함께 할 내일이 많다는 사실에<br/>"+
                "감사합니다.<br/><br/>"+
                "부부라는 이름으로<br/>"+
                "새로이 시작하는 오늘,<br/>"+
                "가까이에서 축복해 주시면<br/>"+
                "감사하겠습니다.<br/>"
    },
    {
      content :   
                  "귀한 마음으로 결혼식에 찾아오셔서<br/>" +
                  "축복의 말씀과 따뜻함을 나눠주세요.<br/>"+ 
                  "더 없는 격려와 기쁨으로 간직하겠습니다.<br/>"
    },
    {
      content :    
                  "작은 인연으로 만나 연인이 된 저희가<br/>"+
                  "이제는 더 큰 열매를 맺고자<br/>"+
                  "저희 두사람 결혼합니다.<br/>​<br/>"+
                  "귀한 걸음으로 축하하여 주시면<br/>"+
                  "더 없는 기쁨으로 간직하겠습니다."
    },
    {
      content :    "저희 두 사람이<br/>"+
                  "이제 믿음과 사랑으로<br/>"+
                  "한 가정을 이루게 되었습니다.​<br/>​"+
                  "부디 함께 하시어 축복해 주시기 바랍니다.<br/>"
    },
    {
      content :    
                  "기쁨이 가득한 날<br/>"+
                  "하나의 매듭이 되고 하나의 길이 되어<br/>"+
                  "하나의 보금자리를 이루려 합니다.<br/>​"+
                  "변함없는 믿음과 사랑으로 축복해 주십시오.<br/>"
    },
    {
      content :    "모든 것이 새로 와지는 봄날,<br/>"+
                  "사랑하는 두 사람이<br/>"+
                  "새 인생을 시작하려 합니다.<br/><br/>​"+
                  "바쁘시더라도 와 주셔서<br/>"+
                  "두 사람의 결혼을 축복해 주시고​<br/>"+
                  "따뜻한 마음으로 격려해 주신다면<br/>"+
                  "큰 힘이 되겠습니다."
    },
    {
      content :    
                  "물빛 푸른 여름날에<br/>"+
                  "두 사람이 하나가 될<br/>"+
                  "새인생을 시작합니다.<br/>​<br/>"+
                  "사랑으로 가득 채워 즐거움은 나누고<br/>"+
                  "어려움은 이겨내는<br/>"+
                  "함께 나아가는 삶을 꾸리겠습니다.<br/><br/>"+
                  "걸음하시어 축복하여 주시면<br/>"+
                  "더없는 기쁨이 되겠습니다.<br/>"
    },
    {
      content :    
                  "깊어가는 가을의 길목에서<br/>"+
                  "단풍만큼 곱게<br/>"+
                  "저희 두 사람의 마음을<br/>​"+
                  "합하고자 합니다.<br/><br/>"+
                  "귀한 걸음으로 축하하여 주시면<br/>"+
                  "더없는 격려와 기쁨으로<br/>"+
                  "간직하겠습니다.<br/>"
    },
    {
      content :    
                  "눈꽃 송이 기다리는 계절에,<br/>"+
                  "뽀얀 눈송이 같은 순수한 사랑 모아<br/>"+
                  "저희 두 사람<br/>​"+
                  "하나가 되는 약속의 시간에<br/>"+
                  "여러분을 모시고자 합니다.<br/>"+
                  "서로 보듬으며 세상을 아름답게 살겠습니다.<br/>"
    },
    {
      content :    
                  "딸을 얻는 기쁨으로<br/>"+
                  "아들을 얻는 행복으로<br/>"+
                  "두 집안이 가약을 맺고자 합니다.<br/>​"+
                  "아름다운 사랑으로 날개를 펴는 이들에게<br/>"+
                  "축복과 격려 부탁드립니다.<br/>"
    },
    {
      content :    
                  "긴 세월을 함께한 아이들을<br/>"+
                  "품에서 떠나보내지만<br/>"+
                  "서운함 보다는<br/>​"+
                  "대견스러운 마음이 앞섭니다.<br/><br/>"+
                  "부디 함께 하시어<br/>"+
                  "따뜻한 보금자리를 이루도록<br/>"+
                  "기원해 주시고 축복해 주시면<br/>"+
                  "감사하겠습니다."
    },

    
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSalClick = (Sal) => {
    onSalSelect(Sal);
    handleClose();
  };

  const handleClose = () => setOpen(false);
  
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

  // 콜백을 업데이트
  openSalModalCallback = handleOpen;

  return (
    <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
              {Sals.map((item, index) => (
                <Card key={index} sx={{ minWidth: 275, mb: 2 }}>
                    <CardContent>
                        
                          <Typography variant="h5" component="div">
                            <p
                            key={index}
                            style={{ fontSize:"13px", lineHeight:"1.6"}}
                            className="info"
                            onClick={() => handleSalClick(item.content)}
                            dangerouslySetInnerHTML={{ __html: item.content}}
                            ></p>
                          </Typography>
                        
                        
                    </CardContent>
                </Card>
              ))}
            </Box>
        </Modal>
    </div>
  );
}
