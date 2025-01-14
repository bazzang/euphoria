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
let openPhraseModalCallback;

export function openPhraseModal(param) {
  if (openPhraseModalCallback) {
    openPhraseModalCallback(param);
  }
}

export default function PhraseModal({ onPhraseSelect }) {
  const [open, setOpen] = useState(false); // `useState`를 컴포넌트 내부로 이동
  const [selectedPhrase, setSelectedPhrase] = useState(null); // 내부에서 상태 관리

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // 작은 화면 감지



  const phrases = [
    {
        content : "내가 그다지 사랑하던 그대여<br/>내 한 평생에 차마<br/>그대를 잊을 수 없소이다.<br/>내 차례에 못 올 사랑인 줄 알면서도<br/>나 혼자는 꾸준히 생각하리라.<br/><br/>자, 그러면 내내 어여쁘소서.<br/><br/><i>이런 시</i>, 이상" 
    },
    {
      content :  "예쁜 예감이 들었다.<br/>우리는 언제나 손을 잡고 있게 될 것이다.<br/><br/><i>연인</i>, 이이체" 
    },
    {
      content :   "봄의 그대는 벚꽃이었고<br/>" +
                  "여름의 그대는 바람이었으며<br/>"+ 
                  "가을의 그대는 하늘이었고<br/>"+
                  "겨울의 그대는 하얀 눈이었다.<br/><br/>"+
                  "그대는 언제나<br/>"+
                  "행복 그 자체였다.<br/><br/>"+
                  "<i>사계</i>, 강현욱" 
    },
    {
      content :    "저녁 때 돌아갈 집이 있다는 것<br/>"+
                  "힘들 때 마음속으로 생각할 사람 있다는 것<br/>"+
                  "외로울 때 혼자서 부를 노래 있다는 것​<br/>​<br/>"+
                  "<i>사계</i>, 나태주"
    },
    {
      content :    "살다보면 그렇게 됩니다.<br/>"+
                  "아무것도 셈하지 않고,<br/>"+
                  "무엇도 바라지 않으며,​<br/>​"+
                  "있는 그대로를 기쁘게 받아들이는 일.<br/>"+
                  "살다보면 사랑도 그렇게 완성될 겁니다.​<br/><br/>"+
                  "<i>바람이 분다. 당신이 좋다</i>, 이병률"
    },
    {
      content :    "깊어져요, 우리.<br/>"+
                  "시간과 함께 낡아지지 말고.<br/>"+
                  "우리의 사랑도 그렇게 될 수 있도록​<br/>​"+
                  "기억하기로 해요.<br/>"+
                  "오래 시간을 함께한다는 것의​<br/>"+
                  "가치를. 그 힘을.​<br/><br/>"+
                  "<i>그래도 사랑</i>, 정현주"
    },
    {
      content :    "서로의 이름을 부르는 것만으로도<br/>"+
                  "사랑의 깊이를 확인할 수 있는 두 사람이<br/>"+
                  "꽃과 나무처럼 걸어와서<br/>​"+
                  "서로의 모든 것이 되기 위해<br/>"+
                  "오랜 기다림 끝에 혼례식을 치르는 날​<br/>"+
                  "세상은 더욱 아름다워라​<br/><br/>"+
                  "<i>사랑의 사람들이여</i>, 이해인"
    },
    {
      content :    
                  "나를 사랑한 사람보다<br/>"+
                  "더 깊이 그를 사랑하게 하시고<br/>"+
                  "나를 사랑하는 사람보다<br/>​"+
                  "더 오래 그를 사랑하게 하소서​<br/><br/>"+
                  "<i>사랑을 위한 기도</i>, 양광모"
    },
    {
      content :    
                  "세상에 와서<br/>"+
                  "내가 하는 말 가운데<br/>"+
                  "가장 고운 말을<br/>​"+
                  "너에게 들려주고 싶다.<br/><br/>"+
                  "세상에 와서<br/>"+
                  "내가 가진 생각 가운데<br/>"+
                  "가장 예쁜 생각을<br/>"+
                  "너에게 주고 싶다​.<br/><br/>"+
                  "<i>너를 두고</i>, 나태주"
    },
    {
      content :    
                  "인생은 길면서도 짧다.<br/>"+
                  "사랑하며 살면 그렇게 된다.<br/>"+
                  "인생은 짧으면서도 길다.<br/>​"+
                  "사랑하며 살면 또 그렇게 된다.<br/><br/>"+
                  "천년을 하루같이<br/>"+
                  "한날을 천년같이<br/><br/>"+
                  "<i>결혼축하</i>, 나태주"
    },
    {
      content :    
                  "봄물보다 깊으니라<br/>"+
                  "가을산보다 높으니라<br/>"+
                  "달보다 빛나리라<br/>​"+
                  "돌보다 굳으리라<br/><br/>"+
                  "사랑을 묻는 이 있거든<br/>"+
                  "이대로만 말하리​<br/><br/>"+
                  "<i>사랑</i>, 한용운"
    },
    {
      content :    
                  "우리가 서로 뜨겁게<br/>"+
                  "사랑한다는 것은<br/>"+
                  "그대는 나의 세상을<br/>​"+
                  "나는 그대의 세상을<br/>"+
                  "함께 짊어지고 새벽을 향해<br/>"+
                  "걸어가겠다는 것입니다.​<br/><br/>"+
                  "<i>사랑한다는 것</i>, 안도현"
    },

    
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handlePhraseClick = (phrase) => {
    onPhraseSelect(phrase);
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
  openPhraseModalCallback = handleOpen;

  return (
    <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
              {phrases.map((item, index) => (
                <Card key={index} sx={{ minWidth: 275, mb: 2 }}>
                    <CardContent>
                        
                          <Typography variant="h5" component="div">
                            <p
                            key={index}
                            style={{ fontSize:"13px", lineHeight:"1.6"}}
                            className="info"
                            onClick={() => handlePhraseClick(item.content)}
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
