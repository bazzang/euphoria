import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate import
import axios from 'axios';
import "../styles/common.css";
import "../styles/contents.css";
import bgimg from "../images/create/preview_bg.png"; // 미리보기 배경 이미지
import letterimg from "../images/create/preview_letter.png"; // 미리보기 손글씨 이미지
import "aos/dist/aos.css";
import "aos/dist/aos.js";
import AOS from "aos";
import flower from "../images/create/flower.png";
import map_t from '../images/create/map_t.png';
import map_kakao from '../images/create/map_kakao.png';
import map_naver from '../images/create/map_naver.png';
import { useInvitation } from "./InvitationProvider.js";
import DaumPostcode from 'react-daum-postcode';
import { Map, Polyline, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { axiosPost } from './common/common.js';
import FormDialog, { openDialog } from "./dialog.js";
import PositionedSnackbar from "./PositionedSnackbar.js";
import ribon from '../images/ribbon.png';
import noimg from '../images/defaultimg.png';
import CallIcon from './CallIcon.js'
import MapComponent from './map.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PhraseModal, {openPhraseModal} from './PhraseModal.js';
import SalModal, {openSalModal} from './SalModal.js';
import SmsIcon from './SmsIcon.js';
import { uploadImageToS3, uploadImagesToS3 } from '../api/S3Uploader.js';
import GallerySlider from './gallerySlider.js';
import CircleGallery from './CircleGallery.js';
import ThumbnailAdjustModal, { openThumbnailModal } from './ThumbnailAbjustModal.js';


// import HandwritingTitle from './HandwritingTitle.js'; 
// import Test1 from '../components/animationWriting/testTxt1.js';
// import zIndex from '@mui/material/styles/zIndex.js';

// import PhraseSampleModal, {openPhraseSample} from './PhraseSampleModal.js';

function Create() {
    const navigate = useNavigate(); 
    const { invitationState, setInvitationState } = useInvitation();

    
    useEffect(() => {
    //    console.log('Current state:', invitationState); // 초기 상태 확인
    }, [invitationState]);

    useEffect(() => {
        console.log("mainWddInfoOnoff???", invitationState.mainWddInfoOnoff);
    }, [invitationState.mainWddInfoOnoff]);

    const handleChange = (key, value) => {
        
        setInvitationState((prev) => ({
          ...prev,
          [key]: value,
        }));


        switch(key){
            case "useContactBrideAndGroom" : 
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    contactBrideAndGroom: value, 
                }));
                break;

            case "useEnding" : 
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    ending: value, 
                }));
                break;

            case "useProfile" : 
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    prof: value, 
                }));
                break;

            case "useCalendar" : 
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    calendar: value,
                }));
                break;

            case "useGallery" : 
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    gallery: value, 
                }));
                break;

            case "useNotice" : 
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    noticeMessage: value,
                }));
                break;
                
            case "useFirstMeetTime" : 
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    timeTogether: value, 
                }));
                break;

            case "useMap" : 
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    map: value, 
                }));
            case "useTransportation" : 
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    trnspt: value, 
                }));
                break;
            case "useFlower" : 
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    flowerDelivery: value, 
                }));
                break;
            case "useVideo" : 
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    video: value, 
                }));
                break;
            case "usePhrases" : // 글귀
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    phrases: value, 
                }));
                break;
            case "useSalutations" :  // 인사말
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    salutations: value, 
                }));
                break;
            case "useParentsContactInfo" :  // 혼주에게 연락하기
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    parentsContactInfo: value, 
                }));
                break;
            case "useInterview" :  // 웨딩 인터뷰뷰
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    interview: value, 
                }));
                break;
            case "useInfo" :  // 안내사항
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    info: value, 
                }));
                break;
            case "useAcnt" :  // 안내사항
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    acnt: value, 
                }));
                break;
            case "useUrlShareStyle" :  // URL 공유 스타일 수정
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    shareOption: value, 
                }));
                break;
            case "useLoading" :  // 로딩화면
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    loading: value, 
                }));
                break;
            case "useTimeLine" :  // 타임라인
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    timeLine: value, 
                }));
                break;
            case "useGuestbook" :  // 방명록록
                setCategories((prevCategories) => ({
                    ...prevCategories,
                     guestbook: value, 
                }));
                break;
            case "useKakaoShare" :  // 카카오톡 공유 스타일 
                setCategories((prevCategories) => ({
                    ...prevCategories,
                    kakaoShareOption: value, 
                }));
                break;
                

            default : 
                break;
        }

    };

    const [message, setMessage] = useState('');
    // springboot  연결 확인 함수  >  연결 확인 삭제 예정 함수 
    // useEffect(() =>{
    //     axios.get('/api/greeting')
    //         .then(response => {
    //             setMessage(response.data);
    //             console.log('test', response.data);
    //     });
    // }, []);

    const [visibleTooltips, setVisibleTooltips] = useState({
        tooltip1: true,
        tooltip2: true,
    });


    // 공통 클릭 핸들러로 요소 숨기기
    const hideTooltip = (tooltipKey) => {
        setVisibleTooltips((prevState) => ({
        ...prevState,
        [tooltipKey]: false, // 선택된 tooltip만 false로 변경
        }));
    };

    // 메뉴 버튼 클릭 시 클래스 토글 역할을 하는 함수
    // const toggleMenu = () => {
    //     setIsActive(!isActive); // 상태를 반전시켜 토글 기능 구현
    // }; 
    // const [isActive, setIsActive] = useState(false);

    // $('.btn-menu').click(function() {
    //     $('.menu-wrap').toggleClass('active');
    // })


    // 각 카테고리의 열림 상태를 관리하는 상태
    const [categories, setCategories] = useState({
        main: true, // 메인 카테고리를 초기 상태에서 열림으로 설정
        bride: true,
        groom: true,
        prof : true,
        weddingHall : true,
        weddingDate : true,
    });

    // 특정 카테고리의 열림 상태를 토글하는 함수
    const toggleCategory = (categoryName) => {
        setCategories((prevCategories) => ({
            ...prevCategories,
            [categoryName]: !prevCategories[categoryName], // 해당 카테고리 상태 반전
        }));
    };

    

    // 전화하기 함수 
    const onClickPhoneCall = (phoneNumber) =>{
        if (!phoneNumber) {
            return;
        }
        window.location.href = `tel:${phoneNumber}`;
    }

    // 문자하기 함수
    const onClickSendSMS = (phoneNumber, message = '') => {
        if (!phoneNumber) {
            return;
        }
        // SMS 링크 생성
        window.location.href = `sms:${phoneNumber}`//`sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    };

    const onClickFlower = () => { 
        const link = "https://www.barunsonflower.com/?barunid=731900"; // 이동할 URL
        window.open(link, "_blank"); // 새 탭에서 열기
    }
    // -------------------------------------------------------------------------------------------------

    // *********************************[메인] 배경이미지************************************************

    // -------------------------------------------------------------------------------------------------
    const [previewImage, setPreviewImage] = useState(null); // 미리보기 이미지 상태
    const [backgroundImage, setBackgroundImage] = useState(bgimg); // Default image
    // 파일 선택 시 미리보기 설정
    const handleImageChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the file
            setPreviewImage(imageUrl); // Update preview state
            setBackgroundImage(imageUrl); // Update background image
            // TODO
            // handleChange("mainPhotoUrl", imageUrl);
            handleFileChange(event, "mainPhoto");
        }
    };

    // 이미지 삭제 시 미리보기 제거
    const handleImageRemove = () => {
        setPreviewImage(null); // 미리보기 이미지 초기화
        setBackgroundImage(bgimg);
    };




    // -------------------------------------------------------------------------------------------------

    // *********************************[메인] 레터링/메인텍스트 컬러*************************************

    // -------------------------------------------------------------------------------------------------

    //컬러픽커 <레터링 색상>
    const [color1, setColor1] = useState("#FFFFFF"); // 초기 색상 설정
    const [color2, setColor2] = useState("#FFFFFF"); 

    const handleColorChange1 = (e) => {
        setColor1(e.target.value); // 선택한 색상으로 상태 업데이트
        handleChange("letteringClr", e.target.value); // `letteringClr` 상태로 저장
    };
    
    const handleColorChange2 = (e) => {
        setColor2(e.target.value); // 선택한 색상으로 상태 업데이트
        handleChange("mainTxtClr", e.target.value)
    };

    const [letteringTop, setLetteringTop] = useState({
        type1: '18%',
        type2: '22%',
        type3: '26%',
        type4: '26%',
        type5: '26%',
        type6: '26%',
        type7: '26%',
    });

    //레터링 위치 조절 
    const handleRangeChange = (type, value) => {
        setLetteringTop((prev) => ({
          ...prev,
          [type]: `${value}%`, // 값에 % 추가
        }));
        
        // 위치 저장 
        handleChange("letteringHg", `${value}%`);
    };

    const [maintxtHg, setMaintxtHg] = useState("50%");
    const [endingHg, setEndingHg] = useState("50%");

    //메인텍스트 위치 조절
    const handleMainTxtRangeChange = (value) => {
        setMaintxtHg(`${value}%`); 
        
        handleChange("mainTxtHg", `${value}%`);
    };

    //엔딩텍스트 위치 조절
    const handleEndingRangeChange = (value) => {
        setEndingHg(`${value}%`); 
        
        handleChange("endingHg", `${value}%`);
    };
    // -------------------------------------------------------------------------------------------------

    // *********************************[지도] 지도 api  ************************************************

    // -------------------------------------------------------------------------------------------------

    const handleCoordinatesChange = (data) => {
        if (
          data.latitude !== invitationState.latitude ||
          data.longitude !== invitationState.longitude
        ) {
          console.log("맵컴포넌트 위도경도 업데이트", data);
          handleChange("longitude", data.longitude);
          handleChange("latitude", data.latitude);
        }
      };

    // -------------------------------------------------------------------------------------------------

    // *********************************[교통수단] 교통수단 입력 폼 이벤트 핸들러 *************************

    // -------------------------------------------------------------------------------------------------
    
    // 교통수단 상태 관리
    const [transportationList, setTransportationList] = useState([
        // { method: "", details: "" },
    ]);

    // 초기값 설정
    useEffect(() => {
        if (transportationList.length === 0) {
          setTransportationList([{ method: "", details: "" }]);
        }
    }, [transportationList]);

    // 교통수단 추가
    const addTransportation = () => {
        setTransportationList((prevList) => [
        ...prevList,
        { method: "", details: "" },
        ]);
    };

    // 교통수단 삭제
    const removeTransportation = (index) => {
        setTransportationList((prevList) =>
        prevList.filter((_, i) => i !== index)
        );
    };

    // 교통수단 위로 이동
    const moveUp = (index) => {
        if (index === 0) return; // 첫 번째 요소는 위로 이동 불가
        setTransportationList((prevList) => {
        const newList = [...prevList];
        [newList[index - 1], newList[index]] = [
            newList[index],
            newList[index - 1],
        ];
        return newList;
        });
    };

    // 교통수단 아래로 이동
    const moveDown = (index) => {
        if (index === transportationList.length - 1) return; // 마지막 요소는 아래로 이동 불가
        setTransportationList((prevList) => {
        const newList = [...prevList];
        [newList[index], newList[index + 1]] = [
            newList[index + 1],
            newList[index],
        ];
        return newList;
        });
    };

    // 교통수단 입력값 업데이트
    const handleInputChange = (index, field, value) => {
        setTransportationList((prevList) =>
          prevList.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
          )
        );
    };

    // -------------------------------------------------------------------------------------------------

    // *********************************[인터뷰] 인터뷰 입력 폼 이벤트 핸들러 *************************

    // -------------------------------------------------------------------------------------------------
    
    // 교통수단 상태 관리
    const [interviewList, setInterviewList] = useState([
        // { method: "", details: "" },
    ]);


    // 초기값 설정
    useEffect(() => {
        if (interviewList.length === 0) {
            setInterviewList([{ question: "", answer: "" }]);
        }
    }, [interviewList]);

    // 교통수단 추가
    const addInterview = () => {
        setInterviewList((prevList) => [
        ...prevList,
        { question: "", answer: "" },
        ]);
    };

    // 교통수단 삭제
    const removeInterview = (index) => {
        setInterviewList((prevList) =>
        prevList.filter((_, i) => i !== index)
        );
    };

    // 교통수단 위로 이동
    const moveUpInterview = (index) => {
        if (index === 0) return; // 첫 번째 요소는 위로 이동 불가
        setInterviewList((prevList) => {
        const newList = [...prevList];
        [newList[index - 1], newList[index]] = [
            newList[index],
            newList[index - 1],
        ];
        return newList;
        });
    };

    // 교통수단 아래로 이동
    const moveDownInterview = (index) => {
        if (index === interviewList.length - 1) return; // 마지막 요소는 아래로 이동 불가
        setInterviewList((prevList) => {
        const newList = [...prevList];
        [newList[index], newList[index + 1]] = [
            newList[index + 1],
            newList[index],
        ];
        return newList;
        });
    };

    // 교통수단 입력값 업데이트
    const handleInputChangeInterview = (index, field, value) => {
        setInterviewList((prevList) =>
          prevList.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
          )
        );
    };



    // -------------------------------------------------------------------------------------------------

    // *********************************[안내사항] 안내사항항 *************************

    // -------------------------------------------------------------------------------------------------
    
    // 안내사항 상태 관리
    const [infoList, setInfoList] = useState([
        // { title: "", content: "", file : "", useBtn : false, btnTxt : "", link : ""},
    ]);

    // 초기값 설정
    useEffect(() => {
        if (infoList.length === 0) {
            setInfoList([{ title: "", content: "", file : "", useBtn : false, btnTxt : "", link : "", imgUrl : ""}]);
        }
    }, [infoList]);

    // 안내사항 추가
    const addInfo = () => {
        setInfoList((prevList) => [
        ...prevList,
        { title: "", content: "", file : "", useBtn : false, btnTxt : "", link : "", imgUrl : ""},
        ]);
    };

    // 안내사항 삭제
    const removeInfo = (index) => {
        setInfoList((prevList) =>
        prevList.filter((_, i) => i !== index)
        );
    };

    // 안내사항 위로 이동
    const moveUpInfo = (index) => {
        if (index === 0) return; // 첫 번째 요소는 위로 이동 불가
        setInfoList((prevList) => {
        const newList = [...prevList];
        [newList[index - 1], newList[index]] = [
            newList[index],
            newList[index - 1],
        ];
        return newList;
        });
    };

    // 안내사항 아래로 이동
    const moveDownInfo = (index) => {
        if (index === infoList.length - 1) return; // 마지막 요소는 아래로 이동 불가
        setInfoList((prevList) => {
        const newList = [...prevList];
        [newList[index], newList[index + 1]] = [
            newList[index + 1],
            newList[index],
        ];
        return newList;
        });
    };

    // 안내사항 입력값 업데이트
    const handleInputChangeInfo = (index, field, value) => {
        setInfoList((prevList) =>
          prevList.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
          )
        );
    };

    // 사진 파일 저장
    const handleInfoFileUpload = (event, index) => {
        const file = event.target.files[0];
        if (!file) return;
    
        // 이미지 URL 생성
        const imageUrl = URL.createObjectURL(file);
        setInfoList((prevList) =>
            prevList.map((item, i) =>
                i === index ? { ...item, file: file, imgUrl: imageUrl  } : item
            )
        );
    };

    useEffect(() => {
    }, [infoList]);

    // -------------------------------------------------------------------------------------------------

    // *********************************[타임라인]  ***********************************************

    // -------------------------------------------------------------------------------------------------
    const [tlList, setTlList]  = useState([]);
    
    // 초기값 설정
    useEffect(() => {
        if (tlList.length === 0) {
            setTlList([{ date : "" , title: "", file : "",  imgUrl : "", content: ""}]);
        }
    }, [tlList]);

    // 타임라인 추가
    const addTimeLine = () => {
        setTlList((prevList) => [
        ...prevList,
        { date : "" , title: "", file : "",  imgUrl : "", content: ""},
        ]);
    };

    // 타임라인 삭제
    const removeTimeLine = (index) => {
        setTlList((prevList) =>
        prevList.filter((_, i) => i !== index)
        );
    };

    // 타임라인 위로 이동
    const moveUpTimeLine = (index) => {
        if (index === 0) return; // 첫 번째 요소는 위로 이동 불가
        setTlList((prevList) => {
        const newList = [...prevList];
        [newList[index - 1], newList[index]] = [
            newList[index],
            newList[index - 1],
        ];
        return newList;
        });
    };

    // 타임라인 아래로 이동
    const moveDownTimeLine = (index) => {
        if (index === tlList.length - 1) return; // 마지막 요소는 아래로 이동 불가
        setTlList((prevList) => {
        const newList = [...prevList];
        [newList[index], newList[index + 1]] = [
            newList[index + 1],
            newList[index],
        ];
        return newList;
        });
    };

    // 타임라인 입력값 업데이트
    const handleInputChangeTimeLine = (index, field, value) => {
        setTlList((prevList) =>
          prevList.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
          )
        );
    };

    // 사진 파일 저장
    const handleTlFileUpload = (event, index) => {
        const file = event.target.files[0];
        if (!file) return;
    
        // 이미지 URL 생성
        const imageUrl = URL.createObjectURL(file);
        setTlList((prevList) =>
            prevList.map((item, i) =>
                i === index ? { ...item, file: file, imgUrl: imageUrl  } : item
            )
        );
    };

    useEffect(() => {
    }, [tlList]);

    // -------------------------------------------------------------------------------------------------

    // *********************************[전체] AOS 애니메이션 적용 **************************************

    // -------------------------------------------------------------------------------------------------
    useEffect(() => {
        // AOS 초기화
        AOS.init({
          offset: 0,
          duration: 100,
          once: false, // 애니메이션을 한 번만 실행
        });
      
        // 스크롤 이벤트에서 AOS.refresh() 호출
        const frameElement = document.querySelector('.frame'); // '.frame' 요소 선택
        if (frameElement) {
          const handleScroll = () => {
            AOS.refresh();
          };
      
          frameElement.addEventListener('scroll', handleScroll);
      
          // 컴포넌트 언마운트 시 이벤트 리스너 제거
          return () => {
            frameElement.removeEventListener('scroll', handleScroll);
          };
        }
      }, []);

    // -------------------------------------------------------------------------------------------------

    // *********************************[혼주 연락하기] 혼주에게 연락하기 *********************************

    // -------------------------------------------------------------------------------------------------
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    // 모달 열기
    const openContactModal = () => {
        // setIsContactModalOpen(true);
        setIsPopupVisible(true);

    };

    // 모달 닫기
    const closeContactModal = () => {
        // setIsContactModalOpen(false);
        setIsPopupVisible(false);
    };

    // -------------------------------------------------------------------------------------------------

    // *********************************[예식일자] 예식일자 세팅  **************************************

    // -------------------------------------------------------------------------------------------------
    const [calendarDays, setCalendarDays] = useState([]);

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setInvitationState((prev) => ({
          ...prev,
          weddingDate: selectedDate,
        }));
        generateCalendar(selectedDate);
    };

    const generateCalendar = (dateString) => {
        if (!dateString) return;

        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1).getDay(); // Day of the week the month starts on
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Number of days in the month

        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(null); // Empty slots for days before the 1st
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        setCalendarDays(days);
    };

    useEffect(() => {
        if (invitationState.weddingDate) {
            generateCalendar(invitationState.weddingDate);
        }
    }, [invitationState.weddingDate]);

    const getKoreanDateInfo = (weddingDate) => {
        if (!weddingDate) return "";
      
        const date = new Date(weddingDate);
      
        // 요일 추출 (0: 일요일, 1: 월요일, ...)
        const daysInKorean = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        const dayOfWeek = daysInKorean[date.getDay()];
      
        // 시간 추출
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? "오후" : "오전"; // 오전/오후 구분
        const twelveHourFormat = hours % 12 || 12; // 12시간 형식으로 변환
        if(minutes === 0){
            return `${dayOfWeek}  ${period}  ${twelveHourFormat}시`;
        }else{
            // 최종 문자열 생성
            return `${dayOfWeek}  ${period}  ${twelveHourFormat}시  ${minutes}분`;
        }
        

    };

    // -------------------------------------------------------------------------------------------------

    // *********************************[예식장] 예식장 주소 찾기 api************************************

    // -------------------------------------------------------------------------------------------------
    const [openPostcode, setOpenPostcode] = useState(false);
    const handlePostcode = {
        // 버튼 클릭 이벤트
            clickButton: () => {
              setOpenPostcode(current => !current);
        },
        
        // 주소 선택 이벤트
            selectAddress: (data) => {
              console.log('주소선택 : ' , data)
              handleChange("weddingHallAddress", data.address);
              setOpenPostcode(false);
        },
    }       

    // -------------------------------------------------------------------------------------------------

    // *********************************[미리보기] 결혼식까지 남은 시간 ************************************

    // -------------------------------------------------------------------------------------------------

    const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  
    useEffect(() => {
      const calculateTimeLeft = () => {
        const now = new Date();
        const weddingDate = new Date(invitationState.weddingDate);
  
        if (!isNaN(weddingDate)) {
          const difference = weddingDate - now;
  
          if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);
  
            setTimeLeft({ days, hours, minutes, seconds });
          } else {
            // 만약 시간이 지난 경우 0으로 설정
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          }
        }
      };
  
      // 1초마다 업데이트
      const timer = setInterval(calculateTimeLeft, 1000);
  
      // 컴포넌트 언마운트 시 interval 정리
      return () => clearInterval(timer);
    }, [invitationState.weddingDate]);



    

    // -------------------------------------------------------------------------------------------------

    // *********************************[함께한 시간] 함께한 시간 계산 ***********************************

    // -------------------------------------------------------------------------------------------------
    const [elapsedTime, setElapsedTime] = useState("");

    useEffect(() => {
      // 타이머 업데이트 함수
      const updateElapsedTime = () => {
        if (invitationState.firstMeetTime) {
          const firstMeetDate = new Date(invitationState.firstMeetTime); // firstMeetTime 값
          const now = new Date();
          const diffInSeconds = Math.floor((now - firstMeetDate) / 1000); // 초 단위 차이 계산
  
          const years = Math.floor(diffInSeconds / (365 * 24 * 60 * 60));
          const months = Math.floor((diffInSeconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60));
          const days = Math.floor((diffInSeconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
          const hours = Math.floor((diffInSeconds % (24 * 60 * 60)) / (60 * 60));
          const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
          const seconds = diffInSeconds % 60;
  
          setElapsedTime(`${years}년 ${months}개월 ${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
        } else {
          setElapsedTime("날짜를 입력해주세요.");
        }
      };
  
      // 1초마다 업데이트
      const intervalId = setInterval(updateElapsedTime, 1000);
  
      // 컴포넌트 언마운트 시 interval 제거
      return () => clearInterval(intervalId);
    }, [invitationState.firstMeetTime]);
      
    // -------------------------------------------------------------------------------------------------

    // *********************************[달력] 달력 사진 ************************************************

    // -------------------------------------------------------------------------------------------------
    const [calImage, setCalImage] = useState(null); // 미리보기 이미지 상태
    const [calbackgroundImage, setCalBackgroundImage] = useState(invitationState.calendarImage || null);

    // 파일 선택 시 미리보기 설정
    const handleCalendarImageChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the file
            setCalImage(imageUrl); // Update preview state
            setCalBackgroundImage(imageUrl); // Update background image

            handleChange("calendarImage", imageUrl);
            handleFileChange(event, 'calendar');
        }
    };

    // 이미지 삭제 시 미리보기 제거
    const handleCalImageRemove = () => {
        setCalImage(null); // 미리보기 이미지 초기화
        setCalBackgroundImage(bgimg);
    };

    // -------------------------------------------------------------------------------------------------

    // *********************************[갤러리] 사진 업로드 핸들러 **************************************

    // -------------------------------------------------------------------------------------------------
    const [title, setTitle] = useState(invitationState.galleryTitle || "갤러리");
    const [type, setType] = useState(invitationState.galleryType || "그리드");

    // 이미지 업로드 핸들러
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => URL.createObjectURL(file)); // 이미지 미리보기 URL 생성
        setInvitationState((prevState) => ({
        ...prevState,
        galleryImages: [...(prevState.galleryImages || []), ...files],
        }));

        // handleGalleryImageUpload(e);

    };

    // 이미지 삭제 핸들러
    const handleImageDelete = (index) => {
        setInvitationState((prevState) => ({
        ...prevState,
        galleryImages: prevState.galleryImages.filter((_, i) => i !== index),
        }));
    };

    // 제목 변경 핸들러
    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        setInvitationState((prevState) => ({
        ...prevState,
        galleryTitle: value,
        }));
    };

    // 타입 변경 핸들러
    const handleTypeChange = (e) => {
        const value = e.target.value;
        setType(value);
        setInvitationState((prevState) => ({
        ...prevState,
        galleryType: value,
        }));
    };

    //test
    const [previewGallery, setPreviewGallery] = useState([]);
    
    const handleGalleryImageUpload = (event) => {

        console.log('갤러리 업로드');
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({
            file: file, // 원본 파일 저장
            previewUrl: URL.createObjectURL(file), // 미리보기 URL 생성
        }));

        setPreviewGallery((prevGallery) => [...prevGallery, ...newImages]);
    
        setInvitationState((prevState) => ({
            ...prevState,
            galleryImages: [...(prevState.galleryImages || []), ...files], // 기존 이미지와 합침
        }));

        console.log('업로드 후 갤러리 상태:', {
            previewGallery,
            galleryImages: invitationState.galleryImages,
        });
    };

    useEffect(() => {
    }, [invitationState.galleryImages]);

    const handleGalleryImageDelete = (index) => {
        setInvitationState((prevState) => ({
            ...prevState,
            galleryImages: prevState.galleryImages.filter((_, i) => i !== index),
        }));

        setPreviewGallery((prevGallery) => prevGallery.filter((_, i) => i !== index));
    };

    // -------------------------------------------------------------------------------------------------

    // *********************************[저장] 사진 저장 ************************************************

    // -------------------------------------------------------------------------------------------------
    const handleFileChange = (event, key) => {
        const file = event.target.files[0];
        if (file) {
            setInvitationState((prevState) => ({
                ...prevState,
                [`${key}File`]: file, // 파일 객체 저장
            }));
        }
    };

    // 갤러리 
    // const handleGalleryImageUpload = (event) => {
    //     const files = Array.from(event.target.files); // 다중 파일 입력 처리
    //     setInvitationState((prevState) => ({
    //         ...prevState,
    //         galleryImages: [...(prevState.galleryImages || []), ...files], // 기존 이미지와 합침
    //     }));
    // };


    // -------------------------------------------------------------------------------------------------

    // *********************************[modal] 주문자 정보 입력 ****************************************

    // -------------------------------------------------------------------------------------------------
    const [orderDetails, setOrderDetails] = useState({
        ordererName: "",
        ordererCall: "",
      });

    const handleOpenDialog = () => {
        if (validateInvitationForm()) {
            openDialog(); // 유효성 검사 통과 시 Dialog 실행
        }
    };

    const handleDialogSave = (data) => {
        setOrderDetails(data);

        invitationState.ordererCall = data.ordererCall
        invitationState.ordererNm = data.ordererName
        fetchSaveFiles();
    };
    // -------------------------------------------------------------------------------------------------

    // *********************************[저장] 유효성 검사  *********************************************

    // -------------------------------------------------------------------------------------------------
    const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
    const validateInvitationForm = () => {
        const requiredFields = [
            { key: "mainType", label: "메인 타입" },
            { key: "mainPhotoFile", label: "메인 사진", type: "file" }, // 파일 타입 지정
            { key: "letteringMsg", label: "레터링 문구" },
            { key: "mainTxt", label: "메인 텍스트" },
            { key: "letteringClr", label: "레터링 색상" },
            { key: "mainTxtClr", label: "메인 텍스트 색상" },
            { key: "groomFirstName", label: "신랑 성" },
            { key: "groomLastName", label: "신랑 이름" },
            { key: "brideFirstName", label: "신부 성" },
            { key: "brideLastName", label: "신부 이름" },
            { key: "weddingDate", label: "예식 날짜" },
            { key: "weddingHallName", label: "예식장 명" },
        ];
    
        for (let field of requiredFields) {
            const value = invitationState[field.key];
    
            // 파일 타입 처리
            if (field.type === "file") {
                if (!value || !(value instanceof File)) {
                    setErrorMessage(`필수 입력 항목 "${field.label}"을(를) 업로드해 주세요.`);
                    return false;
                }
            } 
            // 문자열 타입 처리
            else if (!value || (typeof value === "string" && value.trim() === "")) {
                setErrorMessage(`필수 입력 항목 "${field.label}"을(를) 입력해 주세요.`);
                return false;
            }
        }
        return true; // 유효성 검사 통과
    };
    // -------------------------------------------------------------------------------------------------

    // *********************************[저장] 저장 버튼 클릭 이벤트 핸들러 *******************************

    // -------------------------------------------------------------------------------------------------

    const fetchInv = async (data, info, timeline) => {

        console.log(data);
        console.log("안내사항 데이터", info);
        
        const filtered1 = transportationList.filter(item => item.method !== "" || item.details !== "");
        const filtered2 = interviewList.filter(item => item.question !== "" || item.answer !== "");

        let payload = {
            galleryList : data,
            invitation: invitationState, // invitationState를 전송
            transportationList : filtered1,
            interviewList : filtered2,
            infoList : info,
            tlList : timeline,
        };

        try {
            const response = await axios.post("https://api.euphoriacard.co.kr/api/invitation", payload, {
              headers: {
                "Content-Type": "application/json"
              }
            });
        
            console.log("저장 완료:", response.data);
        
            // 저장 성공 후 이동
            navigate('/production-list', {
              state: {
                ordererNm: payload.invitation.ordererNm,
                ordererCall: payload.invitation.ordererCall
              }
            });
        
        } catch (error) {
            console.error("초대장 저장 실패 ❌:", error);
        }



    }
    
    const fetchSaveFiles = async () => {
        let urls = [];
            
        try {
    
            // 주요 이미지 파일 처리
            if (invitationState.mainPhotoFile) {
                let temp = await handleS3Upload(invitationState.mainPhotoFile);
                urls.push({
                    pic1 : temp[0],
                    type : "main",
                    seq: null,
                    invSeq: null,
                    userId: null
                })
            }
            if (invitationState.useCalendar && invitationState.calendarFile) {
                let temp = await handleS3Upload(invitationState.calendarFile);
                urls.push({
                    pic1 : temp[0],
                    type : "calendar",
                    seq: null,
                    invSeq: null,
                    userId: null
                })
            }
            if (invitationState.groomPhotoFile) {
                let temp = await handleS3Upload(invitationState.groomPhotoFile);
                urls.push({
                    pic1 : temp[0],
                    type : "groom",
                    seq: null,
                    invSeq: null,
                    userId: null
                })
            }
            if (invitationState.bridePhotoFile) {
                let temp = await handleS3Upload(invitationState.bridePhotoFile);
                urls.push({
                    pic1 : temp[0],
                    type : "bride",
                    seq: null,
                    invSeq: null,
                    userId: null
                })
            }
            if (invitationState.useEnding && invitationState.endingPhotoFile) {
                let temp = await handleS3Upload(invitationState.endingPhotoFile);
                urls.push({
                    pic1 : temp[0],
                    type : "ending",
                    seq: null,
                    invSeq: null,
                    userId: null
                })
            }
            if (invitationState.useUrlShareStyle && invitationState.urlPhotoFile) { // 공유하기 사진
                let temp = await handleS3Upload(invitationState.urlPhotoFile);
                urls.push({
                    pic1 : temp[0],
                    type : "url",
                    seq: null,
                    invSeq: null,
                    userId: null
                })
            }
            if (invitationState.useKakaoShare && invitationState.kakaoPhotoFile) { // 카톡공유 사진
                let temp = await handleS3Upload(invitationState.kakaoPhotoFile);
                urls.push({
                    pic1 : temp[0],
                    type : "kakao",
                    seq: null,
                    invSeq: null,
                    userId: null
                })
            }

            if (invitationState.useSalutations && invitationState.salutPhotoFile) { // 인사말 사진
                let temp = await handleS3Upload(invitationState.salutPhotoFile);
                urls.push({
                    pic1 : temp[0],
                    type : "salut",
                    seq: null,
                    invSeq: null,
                    userId: null
                })
            }
    
            // 갤러리 이미지 처리 (배열로 추가)
            if (invitationState.galleryImages && invitationState.galleryImages.length > 0) {
                let temp = await handleS3GalleryUpload(invitationState.galleryImages);

                temp.forEach(item => {
                    urls.push({
                        pic1 : item,
                        type : "gallery",
                        seq: null,
                        invSeq: null,
                        userId: null
                    })
                });

            }

            let tempInfoList = [];

            // title: "", content: "", file : "", useBtn : false, btnTxt : "", link : "", imgUrl : ""
            // if (infoList[0].file != "" || infoList[0].title != "" || infoList[0].content != "" ) {
            if(invitationState.useInfo){
                const updatedInfoList = await Promise.all(
                  infoList.map(async (info) => {
                    if(info.file){
                        const url = await handleS3Upload(info.file);
                        return {
                            ...info,
                            file: url[0],
                            imgUrl : "",
                        };
                    }else{
                        return {
                            ...info,
                            file: "",
                            imgUrl : "",
                        };
                    }
                    
                  })
                );
                tempInfoList = updatedInfoList;

            }

            // 타임라인
            let tempTlList = [];
            // { date : "" , title: "", file : "",  imgUrl : "", content: ""},
            if (invitationState.useTimeLine) {
                const updatedInfoList = await Promise.all(
                    tlList.map(async (tl) => {
                    if(tl.file){
                        const url = await handleS3Upload(tl.file);
                        return {
                            ...tl,
                            file: url[0],
                            imgUrl : "",
                        };
                    }else{
                        return {
                            ...tl,
                            file: "",
                            imgUrl : "",
                        };
                    }
                    
                  })
                );
                tempTlList = updatedInfoList;
            }

            await fetchInv(urls, tempInfoList, tempTlList);

        } catch (error) {
            console.error("Error while saving data:", error);
        }
    };
    // -------------------------------------------------------------------------------------------------

    // *********************************[사진저장] aws s3 ***********************************************

    // -------------------------------------------------------------------------------------------------
    // 갤러리용
    const handleS3GalleryUpload = async (files) => {
        const uploadedUrls = await uploadImagesToS3(files, 'gallery');
        return uploadedUrls;
    };

    // 단건 
    const handleS3Upload = async (file) => {
        const uploadedUrl = await uploadImagesToS3(file, 'gallery');
        return uploadedUrl; 
    };

    // -------------------------------------------------------------------------------------------------

    // *********************************[방명록] 방명록 ***********************************************

    // -------------------------------------------------------------------------------------------------
    const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);
    const openGuestbookModal = () => {
        setIsGuestbookOpen(true);
    };
    
    const closeGuestbookModal = () => {
        setIsGuestbookOpen(false);
    };

    // -------------------------------------------------------------------------------------------------

    // *********************************[갤러리] 타입별 클릭 이벤트 ***********************************************

    // -------------------------------------------------------------------------------------------------
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleCircleImageClick = (index) => {
        setSelectedIndex(index); // 슬라이더 열기
    };

    const closeSlider = () => {
        setSelectedIndex(null);
    };

    // -------------------------------------------------------------------------------------------------

    // *********************************[로딩화면] 로딩 ***********************************************

    // -------------------------------------------------------------------------------------------------
    
    const [isLoading, setIsLoading] = useState(true);  // 로딩 보여줄지
    const [isAnimationFinished, setIsAnimationFinished] = useState(false);  // 애니메이션 완료 여부
    useEffect(() => {
        const timer = setTimeout(() => {
            // typeWriter();
          setIsAnimationFinished(true);
        }, 2000); // 2초짜리 로딩 애니메이션이라고 가정
      
        return () => clearTimeout(timer);
    },  [
        invitationState.loadType,
        invitationState.drawTxt,
        invitationState.drawBgClr,
        invitationState.drawFontClr,
        invitationState.drawImgUrl,
        invitationState.drawImgTxt,
        invitationState.typingClr,
        invitationState.typingTxt
    ]);

    let txtindex = 0;
    let speed = 100; // 글자 타이핑 속도 (밀리초 단위)
    const loadingTxt = "신랑❤️신부 결혼합니다."; // 타이핑할 문구
    function typeWriter() {
        if (txtindex < loadingTxt.length) {
          document.getElementById("text").textContent += loadingTxt.charAt(txtindex);
          txtindex++;
          setTimeout(typeWriter, speed);
        }
    }


    const [loadingTextList, setLoadingTextList] = useState([
        {val : "txt1", content : "We are getting married(필기체)"},
        {val : "txt2", content : "We are getting married(굴림체)"},
        {val : "txt3", content : "저희 결혼합니다(필기체)"},
        {val : "txt4", content : "저희 결혼합니다(굴림체)"},
        {val : "txt5", content : "결혼식에 초대합니다(필기체)"},
        {val : "txt6", content : "결혼식에 초대합니다(굴림체)"},
        {val : "txt7", content : "초대합니다(필기체)"},
        {val : "txt8", content : "초대합니다(굴림체)"},
        {val : "txt9", content : "WE'RE GETTING MARRIED!"},
        {val : "txt10", content : "WELCOME TO OUR WEDDING"},
        {val : "txt11", content : "Come to Our Wedding!"},
    ])


    const [loadingClrList, setLoadingClrList] = useState([
        {val : "clr1", content : "연핑크"},
        {val : "clr2", content : "핑크"},
        {val : "clr3", content : "오렌지"},
        {val : "clr4", content : "레몬"},
        {val : "clr5", content : "그린"},
        {val : "clr6", content : "민트"},
        {val : "clr7", content : "블루"},
        {val : "clr8", content : "퍼플"},
        {val : "", content : "선택안함"},
    ])

    // -------------------------------------------------------------------------------------------------

    // *********************************[모바일] 미리보기 버튼 ******************************************

    // -------------------------------------------------------------------------------------------------
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    
    // -------------------------------------------------------------------------------------------------

    // *********************************[스크롤연동] 로딩 ***********************************************

    // -------------------------------------------------------------------------------------------------
    
    const mainRef = useRef(null);
    const groomRef = useRef(null);
    const brideRef = useRef(null);
    const Ref = useRef(null);
    const galleryRef = useRef(null);
    
    // -------------------------------------------------------------------------------------------------

    // *********************************[사진] 위치조정 ***********************************************

    // -------------------------------------------------------------------------------------------------
    const [thumbnailType, setThumbnailType] = useState("");
    //  위치 조정 값 추가 
    const handleThmbModalValue = (ver, hor, type) => {
        switch(type) {
            case "salut" : 
                handleChange("salutHrz", hor);
                handleChange("salutVtc", ver);
                break;
            case "bride" : 
                handleChange("brideHrz", hor);
                handleChange("brideVtc", ver);
                break;
            case "groom" : 
                handleChange("groomHrz", hor);
                handleChange("groomVtc", ver);
                break;
            default : 
                break;
        }
    }

    
  return (
    <div className="contents-wrap">
        <div className="container">
            <div className="create-wrap">
                <div className="create">
                    <div className="create-preview">
                    {/* <div className={`create-preview ${isPreviewOpen ? 'active' : ''}`}> */}
                        <div className="frame-wrap"  >
                            {isLoading && !isAnimationFinished && !isPopupVisible && (
                                <div className="frame" id="popup" >
                                        <div className="loading-screen">
                                            {/* <HandwritingTitle />
                                            <span id="text"></span><span id="cursor"></span> */}
                                            
                                            💍 청첩장 로딩 중이에요...
                                            {/* <Test1 />11 */}
                                            
                                        </div>

                                    
                                </div>
                            )}
                            
                            {!isLoading && isAnimationFinished || isPopupVisible && (
                            <div className="frame" id="popup">
                                <section className="calendar">
                                    <div style={{width:"100%", justifyContent: "space-between", paddingBottom: "10px", marginTop:"-30px", borderBottom: "1px solid #c7c7c7"}}>
                                        <div onClick={closeContactModal} style={{float:"right", marginRight:"10px", background: "none", cursor: "pointer"}}>✕</div>
                                        <p className="info" style={{marginLeft:"30px"}}>혼주에게 연락하기</p> 
                                    </div>
                                    <div className="profile-wrap" style={{marginTop:"40px"}}>
                                        <div className="item">
                                            <div className="thumb" style={{backgroundColor: "#ffffff"}}>
                                                <p className="t1"
                                                    style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"3px", position:"relative"}}
                                                >
                                                    <span className="blue">신랑측</span>
                                                </p>

                                                {invitationState.broomFatherPhone && (
                                                <div style={{marginTop:"30px", marginBottom:"30px"}}>
                                                    <p className="t2" >
                                                        아버지 {invitationState.groomFatherFirstName}{invitationState.groomFatherLastName}
                                                    </p>
                                                    <p className="t3" style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"15px", position:"relative"}}>

                                                        <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                                            onClick={() => onClickPhoneCall(invitationState.broomFatherPhone)}>
                                                            <CallIcon />
                                                        </div>
                                                        <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                                            onClick={() => onClickSendSMS(invitationState.broomFatherPhone)}>
                                                            <SmsIcon />
                                                        </div>
                                                    </p>
                                                </div>
                                                )}
                                                
                                                {invitationState.broomMotherPhone && (
                                                <div style={{marginTop:"30px", marginBottom:"30px"}}>
                                                    <p className="t2">
                                                        어머니 {invitationState.groomMotherFirstName}{invitationState.groomMotherLastName}
                                                    </p>
                                                    <p className="t3" style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"15px", position:"relative"}}>

                                                        <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                                            onClick={() => onClickPhoneCall(invitationState.broomMotherPhone)}>
                                                                <CallIcon />
                                                        </div>
                                                        <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                                            onClick={() => onClickSendSMS(invitationState.broomMotherPhone)}>
                                                            <SmsIcon />
                                                        </div>
                                                    </p>
                                                </div>
                                                )}

                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="thumb" style={{backgroundColor: "#ffffff"}}>
                                                <p className="t1"
                                                    style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"3px", position:"relative"}}
                                                >
                                                    <span className="pink">신부측</span>
                                                </p>

                                                {invitationState.brideFatherPhone && (
                                                <div style={{marginTop:"30px", marginBottom:"30px"}}>
                                                    <p className="t2" >
                                                        아버지 {invitationState.brideFatherFirstName}{invitationState.brideFatherLastName}
                                                    </p>
                                                    <p className="t3" style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"15px", position:"relative"}}>

                                                        <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                                            onClick={() => onClickPhoneCall(invitationState.brideFatherPhone)}>
                                                                <CallIcon />
                                                        </div>
                                                        <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                                            onClick={() => onClickSendSMS(invitationState.brideFatherPhone)}>
                                                            <SmsIcon />
                                                        </div>
                                                    </p>
                                                </div>
                                                )}

                                                {invitationState.brideMotherPhone && (
                                                <div style={{marginTop:"30px", marginBottom:"30px"}}>
                                                    <p className="t2">
                                                        어머니 {invitationState.brideMotherFirstName}{invitationState.brideMotherLastName}
                                                    </p>
                                                    <p className="t3" style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"15px", position:"relative"}}>

                                                        <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                                            onClick={() => onClickPhoneCall(invitationState.brideMotherPhone)}>
                                                                <CallIcon />
                                                        </div>
                                                        <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                                            onClick={() => onClickSendSMS(invitationState.brideMotherPhone)}>
                                                            <SmsIcon />
                                                        </div>
                                                    </p>
                                                </div>
                                                )}

                                            </div>
                                        </div>
                                    </div>

                                    <br/>
                                    
                                </section>
                            </div>
                            )}

                            {isGuestbookOpen && (
                                <div className="frame" id="popup" >
                                    <div className={`modal-overlay ${isGuestbookOpen ? 'active' : ''}`}>
                                        <div className="guestbook-modal">
                                        <div className="guestbook-header">
                                            <h2>방명록 작성</h2>
                                            <button className="close-btn" onClick={closeGuestbookModal}>✕</button>
                                        </div>

                                        <div className="guestbook-body">
                                            <label htmlFor="name">성함</label>
                                            <input type="text" id="name" placeholder="" />

                                            <label htmlFor="message">내용</label>
                                            <textarea id="message" rows="5" placeholder=""></textarea>

                                            <label htmlFor="password">비밀번호</label>
                                            <input type="password" id="password" placeholder="비밀번호 입력 (수정·삭제 시 필요)" />

                                            <button className="submit-btn">작성</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            
                            )}

                            {selectedIndex && (
                                    <div className={`modal-overlay ${selectedIndex ? 'active' : ''}`}>
                                        <div className="gallery-modal" style={{width:"100%", height:"100%"}}>
                                        <div className="gallery-header">
                                            <button className="close-btn" onClick={closeSlider}>✕</button>
                                        </div>
                                        <div className="gallery-body">

                                            <GallerySlider 
                                                images={previewGallery} 
                                                showProgressBar={invitationState.galleryProgressBarVisible}
                                                className=""
                                            />    
                                        </div>
                                        

                                        </div>
                                    </div>
                            
                            )}

                            

                            {!isLoading && isAnimationFinished || !isPopupVisible && (
                            <div className="frame">

                                {/* 메인*/}
                                <section className="main">
                                    {/* <img className="bg" src={bgimg} alt="bg"/> */}
                                    <img className="bg" src={backgroundImage} alt="bg" />
                                    <div className="cts">
                                        <strong
                                            className="lettering type1"
                                            style={{
                                                color: color1,
                                                top: letteringTop.type1, // 동적 스타일 적용
                                                display: invitationState.letteringMsg === 'type1' ? 'block' : 'none',
                                            }}
                                            >
                                            our<br />wedding<br />day
                                        </strong>
                                        <strong
                                            className="lettering type2"
                                            style={{
                                                color: color1,
                                                top: letteringTop.type2, // 동적 스타일 적용
                                                display: invitationState.letteringMsg === "type2" ? 'block' : 'none',
                                            }}
                                            >
                                            We're getting<br />married!
                                        </strong>
                                        <strong
                                            className="lettering type3"
                                            style={{
                                                color: color1,
                                                top: letteringTop.type3, // 동적 스타일 적용
                                                display: invitationState.letteringMsg === 'type3' ? 'block' : 'none',
                                            }}
                                            >
                                            Just married
                                        </strong>
                                        <strong
                                            className="lettering type4"
                                            style={{
                                                color: color1,
                                                top: letteringTop.type4, // 동적 스타일 적용
                                                display: invitationState.letteringMsg === 'type4' ? 'block' : 'none',
                                            }}
                                            >
                                            With love,<br /> always
                                        </strong>
                                        <strong
                                            className="lettering type5"
                                            style={{
                                                color: color1,
                                                top: letteringTop.type5, // 동적 스타일 적용
                                                display: invitationState.letteringMsg === 'type5' ? 'block' : 'none',
                                            }}
                                            >
                                            Happy <br />wedding<br /> day
                                        </strong>

                                        <strong
                                            className="lettering type6"
                                            style={{
                                                color: color1,
                                                top: letteringTop.type6, // 동적 스타일 적용
                                                display: invitationState.letteringMsg === 'type6' ? 'block' : 'none',
                                            }}
                                            >
                                            Our first page
                                        </strong>
                                        <strong
                                            className="lettering type7"
                                            style={{
                                                color: color1,
                                                top: letteringTop.type7, // 동적 스타일 적용
                                                display: invitationState.letteringMsg === 'type7' ? 'block' : 'none',
                                            }}
                                            >
                                            Happily ever after
                                        </strong>


                                        <p
                                            className="text"
                                            style={{
                                                color : color2,
                                                top: maintxtHg,
                                                fontFamily: "Nanum Myeongjo",
                                                wordWrap: "break-word", // 긴 단어를 자동으로 줄바꿈
                                                overflowWrap: "break-word", // 긴 단어가 깨지도록 줄바꿈
                                                whiteSpace: "normal", // 일반 줄바꿈 허용
                                            }}
                                            >
                                            {invitationState.mainTxt || ""}
                                        </p>

                                </div>
                                </section>

                                {/* 메인 하단 예식 정보 */}
                                {invitationState.mainWddInfoOnoff ? (
                                <section className="calendar" style={{textAlign: "center"}}>
                                    <div style={{width:"300px", borderTop:"2px solid #c7c7c7",  borderBottom:"2px solid #c7c7c7", margin:"0 auto 20px", paddingTop:"20px", paddingBottom:"20px"}}>
                                        <p className="info">{parseInt(invitationState.weddingDate.split("-")[0], 10)}년&nbsp;
                                                            {parseInt(invitationState.weddingDate.split("-")[1], 10)}월&nbsp;
                                                            {parseInt(invitationState.weddingDate.split("-")[2])}일&nbsp;
                                                            {/* {}요일 오후 {}시 */}
                                                            {getKoreanDateInfo(invitationState.weddingDate)}<br/>
                                                            {invitationState.weddingHallName || "예식장"}&nbsp;
                                        </p>
                                    </div>
                                </section>
                                ) : null}

                                {/* 글귀 */}
                                {invitationState.usePhrases ? (
                                <section className="calendar">
                                    <div style={{margin:"10px"}}>
                                        <span
                                        className="infoP"
                                        dangerouslySetInnerHTML={{ __html: invitationState.phrases }}
                                        ></span>
                                    </div>
                                   
                                </section>
                                ) : null}


                                {/* 인사말 */}
                                {invitationState.useSalutations ? (
                                <section className="calendar">
                                    <strong className="title">
                                    {/* <strong className="title" data-aos="fade-up" data-aos-duration="100"> */}
                                    {invitationState.salutationsTitle || "소중한 분들을 초대합니다."}</strong>
                                    <div style={{margin:"10px"}}>
                                        <span
                                        className="infoP"
                                        dangerouslySetInnerHTML={{ __html: invitationState.salutations }}
                                        ></span>
                                    </div>
                                    {/* <img 
                                        src={invitationState.salutPhotoUrl || ""} 
                                        alt="인사말" 
                                        style={{
                                            visibility: invitationState.salutPhotoUrl ? "visible" : "hidden",
                                            height:"300px"
                                        }}
                                    /> */}
                                    <img
                                    src={invitationState.salutPhotoUrl || ""}
                                    alt="인사말"
                                    style={{
                                        visibility: invitationState.salutPhotoUrl ? "visible" : "hidden",
                                        width: "100%",             // 컨테이너에 맞춤
                                        height: "300px",           // 원하는 높이
                                        objectFit: "cover",        // 비율 유지 + 넘치는 부분 잘라냄
                                        objectPosition: `${invitationState.salutHrz}% ${invitationState.salutVtc}%`
                                    }}
                                    />
                                </section>
                                ) : null}

                                {/* 프로필형 */}
                                {/* useProfile 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                                {invitationState.useProfile && (
                                <section className="profile"> 
                                    <div className="profile-wrap">
                                    {/* <div className="profile-wrap" data-aos="fade-up" data-aos-duration="100"> */}
                                        <div className="item">
                                            <div className="thumb">
                                                <img 
                                                    src={invitationState.groomPhotoUrl || ""} 
                                                    alt="신랑이미지" 
                                                    style={{
                                                        visibility: invitationState.groomPhotoUrl ? "visible" : "hidden",
                                                        width: "100%",             // 컨테이너에 맞춤
                                                        height: "300px",           // 원하는 높이
                                                        objectFit: "cover",        // 비율 유지 + 넘치는 부분 잘라냄
                                                        objectPosition: `${invitationState.groomHrz}% ${invitationState.groomVtc}%`
                                                    }}
                                                />
                                            </div>
                                            
                                            <p className="t1"
                                                style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"3px", position:"relative"}}
                                            >
                                                <span className="blue">신랑</span>
                                                
                                            <strong>
                                                {invitationState.groomFirstName}{invitationState.groomLastName}
                                            </strong>
                                            {invitationState.groomPhoneNumber && (
                                                        <div style={{marginLeft:"2px"}}
                                                        onClick={() => onClickPhoneCall(invitationState.groomPhoneNumber)}>
                                                            <CallIcon />
                                                        </div>
                                                )}
                                            
                                            </p>
                                            <p className="t2">{invitationState.groomIntroduction}</p>
                                            {/* <p className="t3"><span>신랑 아버지</span>의 {invitationState.groomRelationship}</p> */}

                                                <p className="t3">
                                                    <span style={{marginRight:"0px"}}>

                                                        {/* 고인표시 */}
                                                        {invitationState.groomFatherDeceased ? (
                                                            <span>故</span> 
                                                        ) : null}
                                                        {invitationState.groomFatherFirstName}{invitationState.groomFatherLastName}
                                                        
                                                        {invitationState.groomFatherFirstName && (
                                                            <span style={{marginRight:"-1px"}}>•</span> 
                                                        )}

                                                        {/* 고인표시 */}
                                                        {invitationState.groomMotherDeceased ? (
                                                            <span>故</span> 
                                                        ) : null}
                                                        {invitationState.groomMotherFirstName}{invitationState.groomMotherLastName}
                                                        
                                                    </span>
                                                    {invitationState.groomFatherFirstName&&(<>의</> )} {invitationState.groomRelationship}
                                                </p>
                                            
                                        </div>
                                        <div className="item">
                                            <div className="thumb">
                                                <img 
                                                    src={invitationState.bridePhotoUrl || ""} 
                                                    alt="신부이미지" 
                                                    style={{
                                                        visibility: invitationState.groomPhotoUrl ? "visible" : "hidden",
                                                        width: "100%",             // 컨테이너에 맞춤
                                                        height: "300px",           // 원하는 높이
                                                        objectFit: "cover",        // 비율 유지 + 넘치는 부분 잘라냄
                                                        objectPosition: `${invitationState.brideHrz}% ${invitationState.brideVtc}%`
                                                    }}
                                                />

                                            </div>
                                            <p className="t1"
                                                style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"3px", position:"relative"}}
                                            >
                                                
                                                <span className="pink">신부</span>
                                            <strong>
                                                {invitationState.brideFirstName}{invitationState.brideLastName}
                                            </strong>
                                            {invitationState.bridePhoneNumber && (
                                                    <div style={{marginLeft:"2px"}}
                                                    onClick={() => onClickPhoneCall(invitationState.bridePhoneNumber)}>
                                                        <CallIcon />
                                                    </div>
                                            )}
                                                        
                                            
                                            </p>
                                            <p className="t2">{invitationState.brideIntroduction}</p>
                                                <p className="t3" >
                                                    <span style={{marginRight:"0px"}}>
                                                        {/* 고인표시 */}
                                                        {invitationState.brideFatherDeceased ? (
                                                            <span>故</span> 
                                                        ) : null}
                                                        {invitationState.brideFatherFirstName}{invitationState.brideFatherLastName}
                                                        
                                                        {invitationState.brideFatherFirstName && (
                                                            <span style={{marginRight:"-1px"}}>•</span> 
                                                        )}
                                                        
                                                        {/* 고인표시 */}
                                                        {invitationState.brideMotherDeceased ? (
                                                            <span>故</span> 
                                                        ) : null}
                                                        {invitationState.brideMotherFirstName}{invitationState.brideMotherLastName}
                                                        
                                                    </span>
                                                    {invitationState.brideFatherFirstName&&(<>의</> )} {invitationState.brideRelationship}
                                                    
                                                </p>
                                        </div>
                                    </div>
                                    {/* 목요일 이후 / 팝업 디자인 및 퍼블리싱 없음  故人*/}
                                    {invitationState.useParentsContactInfo && (
                                    <button className="btn" onClick={openContactModal}>혼주에게 연락하기</button>
                                    )}
                                    {/* <ContactParentsModal open={isContactModalOpen} onClose={closeContactModal} /> */}

                                </section>
                                )}
                                
                                {/* 메인하단예식정보 */}
                                {invitationState.weddingHallName && (
                                <section className='calendar'>
                                    <p className="info">{parseInt(invitationState.weddingDate.split("-")[0], 10)}년&nbsp;
                                                        {parseInt(invitationState.weddingDate.split("-")[1], 10)}월&nbsp;
                                                        {parseInt(invitationState.weddingDate.split("-")[2])}일&nbsp;
                                                        {/* {}요일 오후 {}시 */}
                                                        {getKoreanDateInfo(invitationState.weddingDate)}<br/>
                                                        {invitationState.weddingHallName || ""}&nbsp;
                                                        {invitationState.weddingHallFloorAndRoom || ""}<br/>
                                                        <p 
                                                        style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"5px", position:"relative"}}
                                                        >
                                                            {invitationState.weddingHallAddress || ""}
                                                            {invitationState.weddingHallPhoneNumber && (
                                                                <strong onClick={() => onClickPhoneCall(invitationState.weddingHallPhoneNumber)}>
                                                                    <CallIcon />
                                                                </strong>
                                                            )}
                                                        </p>
                                    </p>

                                </section>
                                )}

                                {/* useCalendar 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                                {invitationState.useCalendar && (
                                <section className="calendar">
                                    
                                    <strong className="title">{invitationState.calendarTitle || "예식 안내"}</strong>
                                    

                                    {invitationState.calendarImage && (
                                        <img
                                            className="bg"
                                            src={invitationState.calendarImage}
                                            alt="calbg"
                                            style={{ borderRadius: "60px", padding: "30px"}}
                                        />  
                                    )}


                                    <div className="month">
                                    {/* <div className="month" data-aos="fade-up" data-aos-duration="100"> */}
                                        <span className="month-title">{parseInt(invitationState.weddingDate.split("-")[1], 10)}월</span>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="holiday">일</th>
                                                    <th>월</th>
                                                    <th>화</th>
                                                    <th>수</th>
                                                    <th>목</th>
                                                    <th>금</th>
                                                    <th>토</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map(
                                                (_, weekIndex) => (
                                                    <tr key={weekIndex}>
                                                    {calendarDays
                                                        .slice(weekIndex * 7, weekIndex * 7 + 7)
                                                        .map((day, index) => (
                                                        <td
                                                            key={index}
                                                            className={day ? (day === parseInt(invitationState.weddingDate.split("-")[2]) ? "target" : "") : ""}
                                                        >
                                                            {day && <span>{day}</span>}
                                                        </td>
                                                        ))}
                                                    </tr>
                                                )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {invitationState.useDday ? (
                                    <div
                                        className={`d-day ${invitationState.useDday ? '' : 'hidden'}`}
                                        style={{ display: invitationState.useDday ? 'block' : 'none' }}
                                    >
                                        <p className="point">
                                        {/* <p className="point" data-aos="fade-up" data-aos-duration="100"> */}
                                            <span>{invitationState.groomLastName || "신랑"}</span>♥
                                            <span>{invitationState.brideLastName || "신부"}</span> 결혼식까지
                                        </p>
                                        <ul className="timer">
                                        {/* <ul className="timer" data-aos="fade-up" data-aos-duration="100"> */}
                                            <li><span>{timeLeft.days}</span>Days</li>
                                            <li><span>{timeLeft.hours}</span>Hours</li>
                                            <li><span>{timeLeft.minutes}</span>Minutes</li>
                                            <li><span>{timeLeft.seconds}</span>Seconds</li>
                                        </ul>
                                    </div>
                                    ) : null}
                                </section>
                                )}



                                {/* useVideo 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                                {/* 식전영상상 */}
                                {invitationState.useVideo && (
                                <section className="gallery">
                                    <strong className="title">
                                    {/* <strong className="title" data-aos="fade-up" data-aos-duration="100"> */}
                                    {invitationState.videoTitle || "식전 영상"}</strong>
                                         <iframe 
                                            width="361"
                                            height="280" 
                                            src={invitationState.videoUrl}
                                            frameborder="0" 
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                            allowfullscreen
                                        ></iframe>
                                </section>
                                )}

                                {/* [타임라인] useLoading 값의 true/false에 따라 이 섹션 활성화/비활성화 */}
                                {invitationState.useTimeLine && (
                                <section className="timeline">
                                    <div className='title-wrap'>
                                        <h2 className='timeline-title'>{invitationState.timeLineTitle}</h2>
                                    </div>
                                    
                                    {tlList &&
                                    tlList.map((list, index) => (
                                        <div className={`item ${index % 2 === 0 ? 'row' : 'row-reverse'}`} key={index}>
                                        <div className="left">
                                            {list.imgUrl && (
                                            // <img className="bg" src={list.imgUrl} alt="tl" />
                                            <img
                                            className={invitationState.timeLineType === 'timeline1_2' ? 'bg-rectangle' : 'bg'}
                                            src={list.imgUrl}
                                            alt="tl"
                                            />
                                            )}
                                            <span className="year">{list.date}</span>
                                        </div>

                                        <div className="center-line"></div>

                                        <div className="right">
                                            <strong className="title">{list.title || ""}</strong>
                                            <span className="content">{list.content}</span>
                                        </div>
                                        </div>
                                    ))}
                                </section>
                                )}

                                {/* [갤러리]useGallery 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                                {invitationState.useGallery && (
                                <section className="gallery">
                                    <strong className="title">
                                        {invitationState.galleryTitle || "갤러리"}
                                    </strong>
                                    {/* 그리드 */}
                                    {invitationState.galleryType === "grid" && (
                                        <div className="gallery-list">
                                        {previewGallery &&
                                            previewGallery.map((image, index) => (
                                                <div className="gallery-item" key={index} onClick={handleCircleImageClick}>
                                                    <img src={image.previewUrl} alt={`gallery-${index}`} />
                                                </div>
                                            ))
                                        }
                                        </div>
                                    )}    
                                    {/* 서클 */}
                                    {invitationState.galleryType === "circle" && (
                                        <CircleGallery 
                                            images={previewGallery} 
                                            showProgressBar={invitationState.galleryProgressBarVisible}
                                            onImageClick={handleCircleImageClick}
                                        />    
                                    )}
                                        
                                    {/* 슬라이드 */}
                                    {invitationState.galleryType === "slide" && (
                                        <GallerySlider images={previewGallery} showProgressBar={invitationState.galleryProgressBarVisible}/>    
                                    )}


                                    {/* 그리드형 서클형 슬라이더 */}
                                    {selectedIndex !== null && (
                                        <GallerySlider images={previewGallery} showProgressBar={invitationState.galleryProgressBarVisible}/>    
                                    )}
                                    
                                </section>
                                )}

                                {/* 웨딩 인터뷰 useInterview 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                                {invitationState.useInterview && (
                                <section className="transportion">
                                    <strong className="title" style={{textAlign:"center"}}>웨딩 인터뷰</strong>
                                {interviewList &&
                                    interviewList.map((list, index) => (
                                        <div key={index}>
                                            <span className="title" style={{fontSize:"14px"}}>{list.question}</span>
                                            <p className="text" style={{fontSize:"14px"}}>{list.answer}</p> 
                                        </div>
                                ))}
                                </section>
                                )}



                                {/*[안내문] useNotice 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                                {invitationState.useNotice && (
                                <section className="infomation">
                                    <div className="infomation-box">
                                    {/* <div className="infomation-box" data-aos="fade-up" data-aos-duration="100"> */}
                                        <strong className="title">{invitationState.noticeTitle || "안내문"}</strong>
                                        <p>
                                            {invitationState.noticeContent}
                                        </p>
                                        {/* 목요일 구현  */}
                                        {/* <a href="#" className="btn">버튼</a> */}
                                    </div>
                                </section>
                                )}

                                {/* [화환] useFlower 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                                {invitationState.useFlower && (
                                <section className="flower">
                                    <div className="flower-box" onClick={onClickFlower}>
                                    {/* <div className="flower-box" data-aos="fade-up" data-aos-duration="100"> */}
                                        <img src={flower} alt="화환"/>
                                        <div className="text">
                                            <strong className="title">축하 화환 보내기</strong>
                                            <p>축하의 마음을 담아 전해보세요.</p>
                                        </div>
                                    </div>
                                </section>
                                )}


                                

                                {/* useFirstMeetTime 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                                {invitationState.useFirstMeetTime && (
                                <section className="our-time">
                                    <strong className="title">함께한 시간</strong>
                                    {/* <span className="title" data-aos="fade-up" data-aos-duration="100">함께한 시간</span> */}
                                    {/* <p className="timer" data-aos="fade-up" data-aos-duration="1000">“25년 1개월 17시간 42분 7초”</p> */}
                                    <p className="timer">
                                    {/* <p className="timer" data-aos="fade-up" data-aos-duration="100"> */}
                                        {elapsedTime}</p>
                                </section>
                                )}




                                {/* useDirections 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                                {invitationState.useMap && (
                                <section className="directions">
                                    <strong className="title">
                                    {/* <strong className="title" data-aos="fade-up" data-aos-duration="100"> */}
                                        오시는 길</strong>
                                    <div className="info">
                                    {/* <div className="info" data-aos="fade-up" data-aos-duration="100"> */}
                                        <strong className="name">
                                            {invitationState.weddingHallName || "예식장 이름"}
                                            {/* <a href="#" className="call"></a> */}
                                        </strong>
                                        <p className="place">{invitationState.weddingHallFloorAndRoom || "OOO홀"}</p>
                                        <p className="address">{ invitationState.weddingHallAddress||"경기 성남시 분당구 판교역로 4"}</p>
                                        
                                        <div className="map">
                                            {/* <div
                                                id="map"
                                                style={{ width: "100%", height: `${invitationState.mapHeight}`}}
                                            ></div> */}
                                            <MapComponent mapId="map2" address={invitationState.weddingHallAddress} mapHeight={invitationState.mapHeight} />
                                            {invitationState.navigationRemove && (
                                                <div className="map-btns">
                                                    {/* 티맵 */}
                                                    <a 
                                                        href={`tmap://search?name=${encodeURIComponent(invitationState.weddingHallAddress)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="map-btn"
                                                    >
                                                        <img src={map_t} alt=""/>
                                                        티맵
                                                    </a>
                                                    
                                                    {/* 카카오 내비 */}
                                                    <a 
                                                        href={`kakaonavi://search?q=${encodeURIComponent(invitationState.weddingHallAddress)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="map-btn"
                                                    >
                                                        <img src={map_kakao} alt=""/>
                                                        카카오 내비
                                                    </a>
                                                    
                                                    {/* 네이버 지도 */}
                                                    <a 
                                                        href={`nmap://search?query=${encodeURIComponent(invitationState.weddingHallAddress)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="map-btn"
                                                    >
                                                        <img src={map_naver} alt=""/>
                                                        네이버 지도
                                                    </a>
                                                </div>
                                            )}
                                            
                                        </div>
                                        {/* <div className="map-btns">
                                            <a href="#" className="map-btn"><img src={map_t} alt=""/>티맵</a>
                                            <a href="#" className="map-btn"><img src={map_kakao} alt=""/>카카오 내비</a>
                                            <a href="#" className="map-btn"><img src={map_naver} alt=""/>네이버 지도</a>
                                        </div> */}
                                        
                                    </div>
                                </section>
                                )}

                                {/* useTransportation 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                                {invitationState.useTransportation && (
                                <section className="transportion">
                                {transportationList &&
                                    transportationList.map((list, index) => (
                                        <div key={index}>
                                            {/* <span className="title" data-aos="fade-up" data-aos-duration="1000">{list.method}</span>
                                            <p className="text" data-aos="fade-up" data-aos-duration="1000">{list.details}</p> */}
                                            <span className="title" >{list.method}</span>
                                            <p className="text" >{list.details}</p> 
                                        </div>
                                ))}
                                </section>
                                )}

                                {/* [계좌번호] useAcnt 값의 true/false에 따라 이 섹션 활성화/비활성화 */}
                                {invitationState.useAcnt && (
                                <section className="calendar">
                                    <div >
                                        <span className="title" >{invitationState.acntTitle}</span>
                                        <div style={{margin:"10px"}}>
                                            <span
                                                className="infoP"
                                                dangerouslySetInnerHTML={{ __html: invitationState.acntContent}}
                                            ></span>
                                        </div>
                                        
                                    </div>
                                        {invitationState.brmAcnt && (
                                            <div className="item" style={{border: "1px solid #c2c0c0", margin:"10px", padding:"10px"}}>
                                                <div className="blue-acnt" style={{borderBottom:"1px solid #c2c0c0", paddingBottom:"2px"}}>신랑</div>
                                                <div className="font-acnt">
                                                    <span>{invitationState.brmNm}</span>
                                                </div>
                                                <div className="font-acnt">
                                                    <span>{invitationState.brmBank}&nbsp;</span>
                                                    <span>{invitationState.brmAcnt}</span>
                                                </div>
                                            </div>
                                        )}
                                        {invitationState.brdAcnt && (
                                            <div className="item" style={{border: "1px solid #c2c0c0", margin:"10px", padding:"10px"}}>
                                                <div className="pink-acnt" style={{borderBottom:"1px solid #c2c0c0", paddingBottom:"2px"}}>신부</div>
                                                <div className="font-acnt">
                                                    <span>{invitationState.brdNm}</span>
                                                </div>
                                                <div className="font-acnt">
                                                    <span>{invitationState.brdBank}&nbsp;</span>
                                                    <span>{invitationState.brdAcnt}</span>
                                                </div>
                                            </div>
                                        )}
                                        {invitationState.brmfAcnt && (
                                            <div className="item" style={{border: "1px solid #c2c0c0", margin:"10px", padding:"10px"}}>
                                                <div className="blue-acnt" style={{borderBottom:"1px solid #c2c0c0", paddingBottom:"2px"}}>신랑 아버지</div>
                                                <div className="font-acnt">
                                                    <span>{invitationState.brmfNm}</span>
                                                </div>
                                                <div className="font-acnt">
                                                    <span>{invitationState.brmfBank}&nbsp;</span>
                                                    <span>{invitationState.brmfAcnt}</span>
                                                </div>
                                            </div>
                                        )}
                                        {invitationState.brmmAcnt && (
                                            <div className="item" style={{border: "1px solid #c2c0c0", margin:"10px", padding:"10px"}}>
                                                <div className="blue-acnt" style={{borderBottom:"1px solid #c2c0c0", paddingBottom:"2px"}}>신랑 어머니</div>
                                                <div className="font-acnt">
                                                    <span>{invitationState.brmmNm}</span>
                                                </div>
                                                <div className="font-acnt">
                                                    <span>{invitationState.brmmBank}&nbsp;</span>
                                                    <span>{invitationState.brmmAcnt}</span>
                                                </div>
                                            </div>
                                        )}
                                        {invitationState.brdfAcnt && (
                                            <div className="item" style={{border: "1px solid #c2c0c0", margin:"10px", padding:"10px"}}>
                                                <div className="pink-acnt" style={{borderBottom:"1px solid #c2c0c0", paddingBottom:"2px"}}>신부 아버지</div>
                                                <div className="font-acnt">
                                                    <span>{invitationState.brdfNm}</span>
                                                </div>
                                                <div className="font-acnt">
                                                    <span>{invitationState.brdfBank}&nbsp;</span>
                                                    <span>{invitationState.brdfAcnt}</span>
                                                </div>
                                            </div>
                                        )}
                                        {invitationState.brdmAcnt && (
                                            <div className="item" style={{border: "1px solid #c2c0c0", margin:"10px", padding:"10px"}}>
                                                <div className="pink-acnt" style={{borderBottom:"1px solid #c2c0c0", paddingBottom:"2px"}}>신부 어머니</div>
                                                <div className="font-acnt">
                                                    <span>{invitationState.brdmNm}</span>
                                                </div>
                                                <div className="font-acnt">
                                                    <span>{invitationState.brdmBank}&nbsp;</span>
                                                    <span>{invitationState.brdmAcnt}</span>
                                                </div>
                                            </div>
                                        )}
                                        
                                        
                                    
                                </section>
                                )}

                                {/* [방명록]  */}
                                {invitationState.useGuestbook && (
                                <section className="guestbook">
                                    <div className="guestbook-empty">
                                        <h2 className="guestbook-title">방명록</h2>
                                        <p className="guestbook-message">
                                        아직 작성된 방명록이 없습니다.<br />
                                        첫 방명록을 작성해주세요.
                                        </p>
                                        <div className="guestbook-buttons">
                                            <button className="btn-outline">전체보기</button>
                                            <button className="btn-primary" onClick={openGuestbookModal}>작성</button>
                                        </div>
                                    </div>
                                </section>
                                    
                                )}

                                {/* [안내사항] useInfo 값의 true/false에 따라 이 섹션 활성화/비활성화 */}
                                {invitationState.useInfo && (
                                <section className="calendar">
                                {infoList &&
                                    infoList.map((list, index) => (
                                        <div key={index} style={{marginTop:"30px"}} >
                                            <strong className="title">{list.title || ""}</strong>
                                            {list.imgUrl && (
                                                <img
                                                className="bg"
                                                src={list.imgUrl }
                                                alt="test"
                                                style={{ borderRadius: "60px", padding: "30px"}}
                                                /> 
                                            )}
                                             
                                            <span className="info">{list.content}</span>
                                            {list.useBtn && (
                                                <p className="text" >{list.btnTxt}</p> 
                                            )}
                                        </div>
                                ))}
                                </section>
                                )}



                                {/* useEnding 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                                {invitationState.useEnding && (
                                <section className="land">
                                    {/* <section className="land" data-aos="fade-up" data-aos-duration="100"> */}
                                    <img className="bg" src={invitationState.endingImage ||bgimg} alt="bg" />
                                    {/* <p className="text">
                                        {invitationState.endingContent}
                                    </p> */}
                                    
                                    <p
                                        className="text"
                                        style={{
                                            // color : color2,
                                            top: endingHg,
                                            wordWrap: "break-word", // 긴 단어를 자동으로 줄바꿈
                                            overflowWrap: "break-word", // 긴 단어가 깨지도록 줄바꿈
                                            whiteSpace: "normal", // 일반 줄바꿈 허용
                                        }}
                                        >
                                        {invitationState.endingContent}
                                    </p>
                                </section>
                                )}

                            </div>

                            )}
                            {/* <!-- // 2024-11-13 미리보기 영역 --> */}











                        </div>
                        {/* <div className="preview-focus">
                            <label for="" className="switch">
                                <input type="checkbox" checked />
                            </label>
                            <strong>자동 포커스</strong>
                            <span>(사용하시면 제작하실때 편리합니다.)</span>
                        </div> */}

                    </div>

                    {/* <div className="create-contents"> */}

                    {/* 사진 조정 모달 */}
                    <ThumbnailAdjustModal
                        imageSrc={thumbnailType === "salut"
                            ? invitationState.salutPhotoUrl
                            : thumbnailType === "groom"
                            ? invitationState.groomPhotoUrl
                            : thumbnailType === "bride"
                            ? invitationState.bridePhotoUrl
                            : ""}
                        onApply={({ vertical, horizontal }) => {
                            switch (thumbnailType) {
                            case "salut":
                                handleChange("salutVtc", vertical);
                                handleChange("salutHrz", horizontal);
                                break;
                            case "groom":
                                handleChange("groomVtc", vertical);
                                handleChange("groomHrz", horizontal);
                                break;
                            case "bride":
                                handleChange("brideVtc", vertical);
                                handleChange("brideHrz", horizontal);
                                break;
                            }
                        }}
                    />
                    <div className={`create-contents ${isPreviewOpen ? 'hidden' : ''}`}>

                            <div className="category">
                                <div className="category-head" >
                                    <strong>메인</strong>
                                    <button 
                                        className={`btn-toggle ${categories['main'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('main')}
                                    >여닫기</button>
                                </div>
                                {categories['main'] && (
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">타입 <sup>필수</sup></div>
                                        <div className="option-contents">
                                            <div className="input-change">
                                                {/* <input className="input-sts" type="text" value="포스터 (풀페이지)" readonly /> */}
                                                {/* HERE */}
                                                <select className="input-sts" value={invitationState.mainType || ""} 
                                                onChange={(e) => handleChange("mainType", e.target.value)}>
                                                    <option value="포스터(풀페이지)">포스터(풀페이지)</option>
                                                    {/* <option value="포토그라피(풀페이지) - 디자인없음">포토그라피(풀페이지) - 디자인없음</option>
                                                    <option value="오리지널(풀페이지) - 디자인없음">오리지널(풀페이지) - 디자인없음</option>
                                                    <option value="폴라로이드 - 디자인없음">폴라로이드 - 디자인없음</option>
                                                    <option value="프레임 - 디자인없음">프레임 - 디자인없음</option>
                                                    <option value="심플 - 디자인없음">심플 - 디자인없음</option>
                                                    <option value="아치 - 디자인없음">아치 - 디자인없음</option>
                                                    <option value="레트로 - 디자인없음">레트로 - 디자인없음</option>
                                                    <option value="실링왁스(이미지 없는 청첩장) - 디자인 없음">실링왁스(이미지 없는 청첩장) - 디자인 없음</option>
                                                    <option value="화관(이미지 없는 청첩장) - 디자인 없음">화관(이미지 없는 청첩장) - 디자인 없음</option> */}
                                                </select>
                                                <button className="btn-change tooltip">변경
                                                    {/* {visibleTooltips.tooltip1 && (
                                                        <span className="tooltip-box" onClick={() => hideTooltip('tooltip1')}>
                                                        <span>10가지</span> 템플릿이 준비되어 있습니다.
                                                        </span>
                                                    )} */}
                                                    {/* <span className="tooltip-box" onClick={onClickTooltip1}><span>10가지</span> 템플릿이 준비되어 있습니다.</span> */}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">사진 <sup>필수</sup></div>
                                        <div className="option-contents">
                                            <div className="img-uploader">
                                                <div className="img-upload">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        id="fileInput"
                                                        style={{ display: 'none' }}
                                                        onChange={handleImageChange} // Use updated function here
                                                    />

                                                    <button
                                                        className="img-upload-add"
                                                        onClick={() => document.getElementById('fileInput').click()}
                                                    />
                                                </div>
                                                {previewImage && (
                                                    <div className="img-upload fin">
                                                        <div className="img-upload-thumb"><img src={previewImage} alt="sample" /></div>
                                                        <button className="img-upload-cancel" onClick={handleImageRemove}>삭제</button>
                                                    </div>
                                                )}
                                                
                                            </div>
                                            <p className="notice">가로사진을 첨부하시면 화질 저하가 발생합니다.<br/>세로사진으로 편집 후 첨부하시면 선명한 사진으로 적용됩니다.</p>
                                            <div className="mt-10">
                                                <span className="check">
                                                    <input type="checkbox" id="check1" />
                                                    {/* <label for="check1"><i></i>메인 권장사이즈가 궁금해요!(클릭)</label> */}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">레터링 문구 <sup>필수</sup></div>
                                        <div className="option-contents">
                                            <div className="input-change">
                                                {/* <input className="input-sts" type="text" value="We’re getting Married!" readonly /> */}
                                                <select
                                                    className="input-sts"
                                                    value={invitationState.letteringMsg || ""}
                                                    onChange={(e) => handleChange("letteringMsg", e.target.value)} // letteringMsg 업데이트
                                                >
                                                    <option value="type1">our wedding day</option>
                                                    <option value="type2">We're getting married</option>
                                                    <option value="type3">Just married</option>
                                                    <option value="type4">With love, always</option>
                                                    <option value="type5">happy wedding day</option> 
                                                    <option value="type6">Our first page</option> 
                                                    <option value="type7">Happily ever after</option>
                                                   <option value="">선택안함</option>
                                                </select>
                                                <button className="btn-change tooltip">변경
                                                    {/* <span className="tooltip-box"><span>9가지</span> 문구가 준비되어 있습니다.</span> */}
                                                    {/* {visibleTooltips.tooltip2 && (
                                                        <span className="tooltip-box" onClick={() => hideTooltip('tooltip2')}>
                                                        <span>9가지</span> 템플릿이 준비되어 있습니다.
                                                        </span>
                                                    )} */}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">레터링 색상 <sup>필수</sup></div>
                                        <div className="option-contents">
                                            <div className="color-picker">
                                                <span className="color-value">{invitationState.letteringClr || color1}</span> {/* 선택한 색상 값 표시 */}
                                                <input
                                                    className="color-input"
                                                    type="color"
                                                    onChange={handleColorChange1} // 색상 선택 시 handleColorChange 호출
                                                    value={color1}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* 목요일 이후 구현 */}
                                    <div className="option">
                                        <div className="option-label">레터링 위치 <sup>필수</sup></div>
                                        <div className="option-contents">
                                        {invitationState.letteringMsg === "" && (
                                            <input
                                            type="range"
                                            min="10"
                                            max="80"
                                            value=""
                                            />
                                        )}
                                        {invitationState.letteringMsg === "type1" && (
                                            <input
                                            type="range"
                                            min="10"
                                            max="70"
                                            value={parseInt(letteringTop.type1)}
                                            onChange={(e) => handleRangeChange('type1', e.target.value)}
                                            />
                                        )}
                                        {invitationState.letteringMsg === "type2" && (
                                            <input
                                            type="range"
                                            min="10"
                                            max="80"
                                            value={parseInt(letteringTop.type2)}
                                            onChange={(e) => handleRangeChange('type2', e.target.value)}
                                            />
                                        )}
                                        {invitationState.letteringMsg === "type3" && (
                                            <input
                                            type="range"
                                            min="10"
                                            max="80"
                                            value={parseInt(letteringTop.type3)}
                                            onChange={(e) => handleRangeChange('type3', e.target.value)}
                                            />
                                        )}
                                        {invitationState.letteringMsg === "type4" && (
                                            <input
                                            type="range"
                                            min="10"
                                            max="80"
                                            value={parseInt(letteringTop.type4)}
                                            onChange={(e) => handleRangeChange('type4', e.target.value)}
                                            />
                                        )}
                                        {invitationState.letteringMsg === "type5" && (
                                            <input
                                            type="range"
                                            min="10"
                                            max="80"
                                            value={parseInt(letteringTop.type5)}
                                            onChange={(e) => handleRangeChange('type5', e.target.value)}
                                            />
                                        )}
                                        {invitationState.letteringMsg === "type6" && (
                                            <input
                                            type="range"
                                            min="10"
                                            max="80"
                                            value={parseInt(letteringTop.type6)}
                                            onChange={(e) => handleRangeChange('type6', e.target.value)}
                                            />
                                        )}
                                        {invitationState.letteringMsg === "type7" && (
                                            <input
                                            type="range"
                                            min="10"
                                            max="80"
                                            value={parseInt(letteringTop.type7)}
                                            onChange={(e) => handleRangeChange('type7', e.target.value)}
                                            />
                                        )}
                                        
                                            
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">메인 텍스트 입력 <sup>필수</sup></div>
                                        <div className="option-contents">
                                            <textarea
                                                className="textarea-sts"
                                                rows="4"
                                                value={invitationState.mainTxt || ""} // Bind to invitationState
                                                onChange={(e) => handleChange("mainTxt", e.target.value)} // Update state
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">메인 텍스트 색상 <sup>필수</sup></div>
                                        <div className="option-contents">
                                            <div className="color-picker">
                                            <span className="color-value">{invitationState.mainTxtClr || color2}</span> {/* 선택한 색상 값 표시 */}
                                                <input
                                                    className="color-input"
                                                    type="color"
                                                    value={color2} // 현재 상태의 색상으로 초기화
                                                    onChange={handleColorChange2} // 색상 선택 시 handleColorChange 호출
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="option">
                                        <div className="option-label">메인 텍스트 위치 <sup>필수</sup></div>
                                        <div className="option-contents">
                                            {/* <input type="range" /> */}
                                            <input
                                                type="range"
                                                min="10"
                                                max="80"
                                                value={parseInt(maintxtHg)} // Parse to integer for the range input
                                                onChange={(e) => handleMainTxtRangeChange(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="option">
                                        <div className="option-label">메인 하단 예식 정보 <sup>필수</sup></div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <label className="switch">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={invitationState.mainWddInfoOnoff} 
                                                        onChange={(e) => handleChange('mainWddInfoOnoff', e.target.checked)}
                                                    />
                                                </label>
                                                {/* <span className="radio">
                                                    <input
                                                        type="radio"
                                                        name="ct1_1"
                                                        id="ct1_1_1"
                                                        value="true"
                                                        checked={invitationState.mainWddInfoOnoff === true} // Bind to state
                                                        onChange={(e) => handleChange("mainWddInfoOnoff", e.target.value)}
                                                    />
                                                    <label for="ct1_1_1"><i></i>노출</label>
                                                </span>
                                                <span className="radio">
                                                    <input
                                                        type="radio"
                                                        name="ct1_1"
                                                        id="ct1_1_2"
                                                        value="false"
                                                        checked={invitationState.mainWddInfoOnoff === false} // Bind to state
                                                        onChange={(e) => handleChange("mainWddInfoOnoff", e.target.value)}
                                                    />
                                                    <label for="ct1_1_2"><i></i>비노출</label>
                                                </span> */}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* <div className="option">
                                        <div className="option-label">스크롤 안내 <sup>필수</sup></div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="ct1_2" id="ct1_2_1" />
                                                    <label for="ct1_2_1"><i></i>표시</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="ct1_2" id="ct1_2_2" checked />
                                                    <label for="ct1_2_2"><i></i>미표시</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                )}
                            </div>

                            <div className="category">
                                <div className="category-head">
                                    <strong>신랑측 정보</strong>
                                    <button
                                        className={`btn-toggle ${categories['groom'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('groom')}
                                    >
                                        여닫기
                                    </button>
                                </div>
                                {categories['groom'] && (
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">신랑 <sup>필수</sup></div>
                                        <div className="option-contents">
                                            <div className="name-set">
                                                <input 
                                                    type="text" 
                                                    placeholder="성" 
                                                    className="input-sts fn" 
                                                    value={invitationState.groomFirstName || ""} // Bind to invitationState
                                                    onChange={(e) => handleChange("groomFirstName", e.target.value)} // Update state
                                                />
                                                <input 
                                                    type="text" 
                                                    placeholder="이름" 
                                                    className="input-sts ln"
                                                    value={invitationState.groomLastName || ""} // Bind to invitationState
                                                    onChange={(e) => handleChange("groomLastName", e.target.value)} // Update state
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">아버지</div>
                                        <div className="option-contents">
                                            <div className="name-set">
                                                {/* <input type="text" placeholder="성" className="input-sts fn" />
                                                
                                                <input type="text" placeholder="이름" className="input-sts ln" /> */}
                                                <input 
                                                    type="text" 
                                                    placeholder="성" 
                                                    className="input-sts fn" 
                                                    value={invitationState.groomFatherFirstName || ""} // Bind to invitationState
                                                    onChange={(e) => handleChange("groomFatherFirstName", e.target.value)} // Update state
                                                />
                                                <input 
                                                    type="text" 
                                                    placeholder="이름" 
                                                    className="input-sts ln"
                                                    value={invitationState.groomFatherLastName || ""} // Bind to invitationState
                                                    onChange={(e) => handleChange("groomFatherLastName", e.target.value)} // Update state
                                                />

                                                <span className="check">
                                                    <input type="checkbox" id="ct2_1"
                                                    value={invitationState.groomFatherDeceased || false }
                                                    onChange={(e) => handleChange("groomFatherDeceased", e.target.checked)}
                                                    />
                                                    <label for="ct2_1"><i></i>고인</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">어머니</div>
                                        <div className="option-contents">
                                            <div className="name-set">
                                                <input 
                                                    type="text" 
                                                    placeholder="성" 
                                                    className="input-sts fn" 
                                                    value={invitationState.groomMotherFirstName || ""} // Bind to invitationState
                                                    onChange={(e) => handleChange("groomMotherFirstName", e.target.value)} // Update state
                                                />
                                                <input 
                                                    type="text" 
                                                    placeholder="이름" 
                                                    className="input-sts ln"
                                                    value={invitationState.groomMotherLastName || ""} // Bind to invitationState
                                                    onChange={(e) => handleChange("groomMotherLastName", e.target.value)} // Update state
                                                />
                                                <span className="check">
                                                    <input type="checkbox" id="ct2_1" value={invitationState.groomMotherDeceased || false }
                                                    onChange={(e) => handleChange("groomMotherDeceased", e.target.checked)}/>
                                                    <label for="ct2_1"><i></i>고인</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">관계</div>
                                        <div className="option-contents">
                                            <div className="name-set">
                                                <input 
                                                    type="text" 
                                                    placeholder="아들" 
                                                    className="input-sts rn"
                                                    value={invitationState.groomRelationship || ""} // Bind to invitationState
                                                    onChange={(e) => handleChange("groomRelationship", e.target.value)} // Update state
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div>
                            <div className="category">
                                <div className="category-head">
                                    <strong>신부측 정보</strong>
                                    <button 
                                        className={`btn-toggle ${categories['bride'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('bride')}
                                    >여닫기</button>
                                </div>
                                {categories['bride'] && (
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">신부 <sup>필수</sup></div>
                                        <div className="option-contents">
                                            <div className="name-set">
                                                <input 
                                                    type="text" 
                                                    placeholder="성" 
                                                    className="input-sts fn"
                                                    value={invitationState.brideFirstName || ""} // Bind to invitationState
                                                    onChange={(e) => handleChange("brideFirstName", e.target.value)} // Update state
                                                />
                                                <input 
                                                    type="text" 
                                                    placeholder="이름" 
                                                    className="input-sts ln"
                                                    value={invitationState.brideLastName || ""} // Bind to invitationState
                                                    onChange={(e) => handleChange("brideLastName", e.target.value)} // Update state
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">아버지</div>
                                        <div className="option-contents">
                                            <div className="name-set">
                                                <input 
                                                    type="text" 
                                                    placeholder="성" 
                                                    className="input-sts fn"
                                                    value={invitationState.brideFatherFirstName || ""} // Bind to invitationState
                                                    onChange={(e) => handleChange("brideFatherFirstName", e.target.value)} // Update state
                                                />
                                                <input 
                                                    type="text" 
                                                    placeholder="이름" 
                                                    className="input-sts ln"
                                                    value={invitationState.brideFatherLastName || ""} // Bind to invitationState
                                                    onChange={(e) => handleChange("brideFatherLastName", e.target.value)} // Update state
                                                />
                                                <span className="check">
                                                    <input type="checkbox" id="ct2_1"
                                                    value={invitationState.brideFatherDeceased || false }
                                                    onChange={(e) => handleChange("brideFatherDeceased", e.target.checked)}
                                                    />
                                                    <label for="ct2_1"><i></i>고인</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">어머니</div>
                                        <div className="option-contents">
                                            <div className="name-set">
                                                <input 
                                                    type="text" 
                                                    placeholder="성" 
                                                    className="input-sts fn"
                                                    value={invitationState.brideMotherFirstName || ""} // Bind to invitationState
                                                    onChange={(e) => handleChange("brideMotherFirstName", e.target.value)} // Update state
                                                />
                                                <input 
                                                    type="text" 
                                                    placeholder="이름" 
                                                    className="input-sts ln"
                                                    value={invitationState.brideMotherLastName || ""} // Bind to invitationState
                                                    onChange={(e) => handleChange("brideMotherLastName", e.target.value)} // Update state
                                                />
                                                <span className="check">
                                                    <input type="checkbox" id="ct2_1" 
                                                    value={invitationState.brideMotherDeceased || false }
                                                    onChange={(e) => handleChange("brideMotherDeceased", e.target.checked)}
                                                    />
                                                    <label for="ct2_1"><i></i>고인</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">관계</div>
                                        <div className="option-contents">
                                            <div className="name-set">
                                                <input 
                                                    type="text" 
                                                    placeholder="딸" 
                                                    className="input-sts rn"
                                                    value={invitationState.brideRelationship || ""} // Bind to invitationState
                                                    onChange={(e) => handleChange("brideRelationship", e.target.value)} // Update state
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div>

                            <div className="category">
                                <div className="category-head">
                                    <strong>예식일자</strong>
                                    <button 
                                        className={`btn-toggle ${categories['weddingDate'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('weddingDate')}
                                    >여닫기</button>
                                </div>
                                {categories['weddingDate'] && (
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">일자<sup>필수</sup></div>
                                        <div className="option-contents">
                                            <input
                                                type="datetime-local"
                                                className="input-sts"
                                                value={invitationState.weddingDate || ""}
                                                onChange={handleDateChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div>


                            <div className="category">
                                <div className="category-head" >
                                    <strong>예식장</strong>
                                    <button 
                                        className={`btn-toggle ${categories['weddingHall'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('weddingHall')}
                                    >여닫기</button>
                                </div>
                                {categories['weddingHall'] && (
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">예식장 명<sup>필수</sup></div>
                                        <div className="option-contents">
                                            <input
                                            type="text"
                                            className="input-sts"
                                            placeholder="예식장 명"
                                            value={invitationState.weddingHallName || ""} // Bind value to state
                                            onChange={(e) => handleChange("weddingHallName", e.target.value)} // Update state on change
                                            />
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">예식장 층과 홀</div>
                                        <div className="option-contents">
                                            <input 
                                            type="text" 
                                            className="input-sts" 
                                            placeholder="OO홀"
                                            value={invitationState.weddingHallFloorAndRoom || ""} // Bind value to state
                                            onChange={(e) => handleChange("weddingHallFloorAndRoom", e.target.value)} // Update state on change
                                            />
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">예식장 전화번호</div>
                                        <div className="option-contents">
                                            <input 
                                            type="number" 
                                            className="input-sts" 
                                            placeholder="-없이 입력해주세요." 
                                            value={invitationState.weddingHallPhoneNumber || ""} // Bind value to state
                                            onChange={(e) => handleChange("weddingHallPhoneNumber", e.target.value)} // Update state on change
                                            />
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">예식장 주소</div>
                                        <div className="option-contents">
                                            <button className="btn-address-search" onClick={handlePostcode.clickButton}>주소 검색</button>
                                            {openPostcode &&
                                                <DaumPostcode
                                                onComplete={handlePostcode.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                                                autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                                            />}
                                            <input 
                                            type="text" 
                                            className="input-sts" 
                                            placeholder="주소 검색을 통해 입력해주세요." 
                                            value={invitationState.weddingHallAddress || ""}
                                            // onChange={handleMapSearch}
                                            onChange={(e) => handleChange("weddingHallAddress", e.target.value)}
                                            readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div>

                            
                            <div className="category">
                                <div className="category-head" >

                                    {/*value=useCalendar */}
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useCalendar} 
                                            onChange={(e) => handleChange('useCalendar', e.target.checked)}
                                        />
                                    </label>

                                    <strong>달력</strong>
                                    <button 
                                        className={`btn-toggle ${categories['calendar'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('calendar')}
                                    >여닫기</button>
                                </div>
                                {categories['calendar'] && (
                                <div className="category-body">
                                    {/* 목요일 이후 구현 */}
                                    {/* <div className="option">
                                        <div className="option-label">달력타입</div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="ct1_2" id="ct1_2_1" />
                                                    <label for="ct1_2_1"><i></i>한글</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="ct1_2" id="ct1_2_2" checked />
                                                    <label for="ct1_2_2"><i></i>심플</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="option">
                                        <div className="option-label">달력 제목</div>
                                        <div className="option-contents">
                                            {/* <input type="text" className="input-sts" placeholder="예식 안내" /> */}
                                            <input
                                            type="text"
                                            className="input-sts"
                                            placeholder="예식 안내"
                                            value={invitationState.calendarTitle || ""} // Bind value to state
                                            onChange={(e) => handleChange("calendarTitle", e.target.value)} // Update state on change
                                            />
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">달력 사진</div>
                                        <div className="option-contents">
                                            <div className="img-uploader">
                                                <div className="img-upload">
                                                    <button className="img-upload-add"  onClick={() => document.getElementById('fileInput2').click()}>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            id="fileInput2"
                                                            style={{ display: 'none' }}
                                                            onChange={handleCalendarImageChange} // Use updated function here
                                                        />
                                                        
                                                    </button>
                                                </div>
                                                {calImage && (
                                                    <div className="img-upload fin">
                                                        <div className="img-upload-thumb"><img src={calImage} alt="sample" /></div>
                                                        <button className="img-upload-cancel" onClick={handleCalImageRemove}>삭제</button>
                                                    </div>
                                                )}
                                            </div>

                                            
                                        </div>
                                    </div>

                                    {/* 목요일 이후 (일단 패스) */}
                                    <div className="option">
                                        <div className="option-label">디데이</div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="check">
                                                    <input type="checkbox" name="ct1_2" id="ct1_2_1" 
                                                    onChange={(e) => handleChange("useDday", e.target.checked)} />
                                                    <label for="ct1_2_1"><i></i>사용</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                                )}
                            </div>


                            {/* 글귀 */}
                            <div className="category">
                                <div className="category-head">
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.usePhrases} 
                                            onChange={(e) => handleChange('usePhrases', e.target.checked)}
                                        />
                                    </label>
                                    <strong>글귀</strong>
                                    <button 
                                        className={`btn-toggle ${categories['phrases'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('phrases')}
                                    >여닫기</button>
                                </div>
                                {categories['phrases'] && (
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">글귀</div>
                                        <div className="option-contents">
                                            <div className="phrase">
                                                <button className="phrase-sample" onClick={() => openPhraseModal()}>샘플 양식</button>
                                                <PhraseModal onPhraseSelect={(phrase) => handleChange("phrases", phrase)}/>
                                                <ReactQuill
                                                    theme="snow"
                                                    value={invitationState.phrases || 
                                                            "내가 그다지 사랑하던 그대여" + "<br/>" +
                                                            "내 한 평생에 차마" + "<br/>" +
                                                            "그대를 잊을 수 없소이다." + "<br/>" +
                                                            "못 올 사랑인 줄 알면서도" + "<br/>" +
                                                            "나 혼자는 꾸준히 생각하리라." + "<br/>" +
                                                            "자, 그러면 내내 어여쁘소서." + "<br/><br/>" +
                                                            "<i>이런 시<i>, 이상"
                                                    }
                                                    onChange={(content) => handleChange("phrases", content)} // Update state
                                                    modules={{
                                                        toolbar: [
                                                        // 텍스트 꾸미기
                                                        ['bold', 'italic', 'underline', 'strike'],
                                                        // 색상
                                                        [{ 'color': [] }, { 'background': [] }],
                                                        // 정렬
                                                        [{ 'align': [] }],
                                                        ],
                                                    }}
                                                    formats={[
                                                        'bold', 'italic', 'underline', 'strike',
                                                        'color', 'background',
                                                        'align',
                                                    ]}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )  }
                            </div>



                            {/* 인사말 */}
                            <div className="category">
                                <div className="category-head">
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useSalutations} 
                                            onChange={(e) => handleChange('useSalutations', e.target.checked)}
                                        />
                                    </label>
                                    <strong>인사말</strong>
                                    <button 
                                        className={`btn-toggle ${categories['salutations'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('salutations')}
                                    >여닫기</button>
                                </div>
                                {categories['salutations'] && (
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">제목</div>
                                        <div className="option-contents">
                                            <input 
                                                type="text" 
                                                className="input-sts" 
                                                placeholder="소중한 분들을 초대합니다."
                                                onChange={(e) => handleChange("salutationsTitle", e.target.value)} 
                                            />
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">내용</div>
                                        <div className="option-contents">
                                            <div className="phrase">
                                                {/* <button className="phrase-sample">샘플 양식</button> */}
                                                <button className="phrase-sample" onClick={() => openSalModal()}>샘플 양식</button>
                                                <SalModal onSalSelect={(salutations) => handleChange("salutations", salutations)}/>
                                                {/* <textarea name="" id="" className="textarea-sts" rows="9">
                                                오랜 기다림 속에서 저희 두 사람,
                                                한 마음 되어 참된 사랑의 결실을
                                                맺게 되었습니다.

                                                오셔서 축복해 주시면 큰 기쁨이겠습니다.</textarea> */}
                                                <ReactQuill
                                                    theme="snow"
                                                    value={invitationState.salutations || 
                                                            "오랜 기다림 속에서 저희 두 사람," + "<br/>" +
                                                            "한 마음 되어 참된 사랑의 결실을" + "<br/>" +
                                                            "맺게 되었습니다." + "<br/><br/>" +
                                                            "오셔서 축복해 주시면 큰 기쁨이겠습니다." 
                                                    }
                                                    onChange={(content) => handleChange("salutations", content)} // Update state
                                                    modules={{
                                                        toolbar: [
                                                        // 텍스트 꾸미기
                                                        ['bold', 'italic', 'underline', 'strike'],
                                                        // 색상
                                                        [{ 'color': [] }, { 'background': [] }],
                                                        // 정렬
                                                        [{ 'align': [] }],
                                                        ],
                                                    }}
                                                    formats={[
                                                        'bold', 'italic', 'underline', 'strike',
                                                        'color', 'background',
                                                        'align',
                                                    ]}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">사진</div>
                                        <div className="option-contents">
                                            <div className="img-uploader">
                                                <div className="img-upload">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        id="salutPhotoInput"
                                                        style={{ display: "none" }}
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                const imageUrl = URL.createObjectURL(file);
                                                                handleChange("salutPhotoUrl", imageUrl);
                                                                handleFileChange(e, 'salutPhoto');
                                                            }
                                                        }}
                                                    />

                                                    <button
                                                        className="img-upload-add"
                                                        onClick={() => document.getElementById('salutPhotoInput').click()}
                                                    />
                                                </div>
                                                {invitationState.salutPhotoUrl  && (
                                                <div className="img-upload fin">
                                                    <div className="img-upload-thumb">
                                                        <img 
                                                            src={invitationState.salutPhotoUrl || bgimg} 
                                                            alt="인사말" 
                                                        />
                                                    </div>
                                                    <button className="img-upload-cancel" onClick={() =>invitationState.salutPhotoUrl = "" }>삭제</button>
                                                </div>
                                                )}
                                            </div>
                                            <div className="mt-10">
                                                <button className="btn-positioning" 
                                                onClick={() => {setThumbnailType("salut");openThumbnailModal("salut", invitationState.salutPhotoUrl)}}>
                                                위치 조정</button>
                                            </div>
                                        </div>
                                        
                                    </div>

                                </div>
                            )}
                            </div>
                            

                            <div className="category">
                                <div className="category-head" >

                                    {/* value=useProfile */}
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useProfile} 
                                            onChange={(e) => handleChange('useProfile', e.target.checked)}
                                        />
                                    </label>


                                    <strong>프로필형 소개</strong>
                                    <button 
                                        className={`btn-toggle ${categories['prof'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('prof')}
                                    >여닫기</button>
                                </div>
                                {categories['prof'] && (
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">신랑 사진<sup>필수</sup></div>
                                        <div className="option-contents">
                                            <div className="img-uploader">
                                                <div className="img-upload">
                                                 <input
                                                        type="file"
                                                        accept="image/*"
                                                        id="groomPhotoInput"
                                                        style={{ display: "none" }}
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                const imageUrl = URL.createObjectURL(file);
                                                                handleChange("groomPhotoUrl", imageUrl);
                                                                handleFileChange(e, 'groomPhoto');
                                                            }
                                                        }}
                                                    />
                                                    <button
                                                        className="img-upload-add"
                                                        onClick={() => document.getElementById("groomPhotoInput").click()}
                                                    />
                                                </div>
                                                        
                                                
                                                {  invitationState.groomPhotoUrl && (
                                                    <div className="img-upload fin">
                                                        <div className="img-upload-thumb">
                                                            <img 
                                                                src={invitationState.groomPhotoUrl || noimg} 
                                                            />
                                                        </div>
                                                        <button className="img-upload-cancel" onClick={() =>invitationState.groomPhotoUrl = "" }>삭제</button>
                                                    </div>
                                                )}
                                                
                                            </div>
                                            <div className="mt-10">
                                                <button className="btn-positioning" 
                                                onClick={() => {setThumbnailType("groom");openThumbnailModal("groom", invitationState.groomPhotoUrl)}}>
                                                위치 조정</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">신랑 소개</div>
                                        <div className="option-contents">
                                            <textarea
                                                className="textarea-sts"
                                                rows="9"
                                                value={invitationState.groomIntroduction || ""} // Bind to invitationState
                                                onChange={(e) => handleChange("groomIntroduction", e.target.value)} // Update state
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">신부 사진<sup>필수</sup></div>
                                        <div className="option-contents">
                                            <div className="img-uploader">
                                                <div className="img-upload">
                                                    {/* <button className="img-upload-add"></button> */}

                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        id="bridePhotoInput"
                                                        style={{ display: "none" }}
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                const imageUrl = URL.createObjectURL(file);
                                                                handleChange("bridePhotoUrl", imageUrl);
                                                                handleFileChange(e, 'bridePhoto');
                                                            }
                                                        }}
                                                    />
                                                    <button
                                                        className="img-upload-add"
                                                        onClick={() => document.getElementById("bridePhotoInput").click()}
                                                    />

                                                </div>

                                                {  invitationState.bridePhotoUrl && (
                                                    <div className="img-upload fin">
                                                        <div className="img-upload-thumb">
                                                            <img 
                                                                src={invitationState.bridePhotoUrl || noimg} 
                                                                alt="신부이미지" 
                                                            />
                                                        </div>
                                                        <button className="img-upload-cancel" onClick={() =>invitationState.bridePhotoUrl = "" }>삭제</button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-10">
                                                <button className="btn-positioning" 
                                                onClick={() => {setThumbnailType("bride");openThumbnailModal("bride", invitationState.bridePhotoUrl)}}>
                                                위치 조정</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">신부 소개</div>
                                        <div className="option-contents">
                                            {/* <textarea name="" id="" rows="9" className="textarea-sts"></textarea> */}
                                            <textarea
                                                className="textarea-sts"
                                                rows="9"
                                                value={invitationState.brideIntroduction || ""} // Bind to invitationState
                                                onChange={(e) => handleChange("brideIntroduction", e.target.value)} // Update state
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div>

                            
                            <div className="category">
                                <div className="category-head" >

                                    {/* value=useContactBrideAndGroom */}
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useContactBrideAndGroom} 
                                            onChange={(e) => handleChange('useContactBrideAndGroom', e.target.checked)}
                                        />
                                    </label>

                                    <strong>신랑신부 연락하기</strong>
                                    <button 
                                        className={`btn-toggle ${categories['contactBrideAndGroom'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('contactBrideAndGroom')}
                                    >여닫기</button>
                                </div>
                                {categories['contactBrideAndGroom'] && (
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">신랑 전화번호</div>
                                        <div className="option-contents">
                                            <input 
                                                type="number" 
                                                className="input-sts" 
                                                placeholder="-없이 입력해주세요"
                                                value={invitationState.groomPhoneNumber}
                                                onChange={(e) => handleChange("groomPhoneNumber", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">신부 전화번호</div>
                                        <div className="option-contents">
                                            <input 
                                                type="number" 
                                                className="input-sts" 
                                                placeholder="-없이 입력해주세요"
                                                value={invitationState.bridePhoneNumber}
                                                onChange={(e) => handleChange("bridePhoneNumber", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div>


                            {/* 혼주 연락하기 / 목요일 이후 구현 (퍼블리싱 없음) */}
                            <div className="category">
                                <div className="category-head">

                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useParentsContactInfo} 
                                            onChange={(e) => handleChange('useParentsContactInfo', e.target.checked)}
                                        />
                                    </label>

                                    <strong>혼주 연락하기</strong>
                                    <button 
                                        className={`btn-toggle ${categories['parentsContactInfo'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('parentsContactInfo')}
                                    >여닫기</button>
                                    
                                </div>
                                {categories['parentsContactInfo'] && (
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">신랑 아버지</div>
                                        <div className="option-contents">
                                            <input 
                                                type="number" 
                                                className="input-sts" 
                                                placeholder="-없이 입력해주세요"
                                                value={invitationState.broomFatherPhone}
                                                onChange={(e) => handleChange("broomFatherPhone", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">신랑 어머니</div>
                                        <div className="option-contents">
                                            <input 
                                                type="number" 
                                                className="input-sts" 
                                                placeholder="-없이 입력해주세요"
                                                value={invitationState.broomMotherPhone}
                                                onChange={(e) => handleChange("broomMotherPhone", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">신부 아버지</div>
                                        <div className="option-contents">
                                            <input 
                                                type="number" 
                                                className="input-sts" 
                                                placeholder="-없이 입력해주세요"
                                                value={invitationState.brideFatherPhone}
                                                onChange={(e) => handleChange("brideFatherPhone", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">신부 어머니</div>
                                        <div className="option-contents">
                                            <input 
                                                type="number" 
                                                className="input-sts" 
                                                placeholder="-없이 입력해주세요"
                                                value={invitationState.brideMotherPhone}
                                                onChange={(e) => handleChange("brideMotherPhone", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>

                            {/* 타임라인 */}
                            <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useTimeLine} 
                                            onChange={(e) => handleChange('useTimeLine', e.target.checked)}
                                        />
                                    </label>
                                    <strong>타임라인</strong>
                                    <button 
                                        className={`btn-toggle ${categories['timeLine'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('timeLine')}
                                    >여닫기</button>
                                </div>
                                {categories['timeLine'] && (
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">타이틀</div>
                                        <div className="option-contents">
                                            <input 
                                                type="text" 
                                                className="input-sts" 
                                                placeholder="우리의 시간"
                                                onChange={(e) => 
                                                    handleChange("timeLineTitle", e.target.value)} 
                                            />
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">사진 모양</div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="timeline1" id="timeline1_1" 
                                                    value="timeline1_1"
                                                    checked={invitationState.timeLineType === "timeline1_1"} 
                                                    onChange={(e) => handleChange('timeLineType', e.target.value)}
                                                    />
                                                    <label for="timeline1_1"><i></i>원형</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="timeline1" id="timeline1_2"
                                                    value="timeline1_2"
                                                    checked={invitationState.timeLineType === "timeline1_2"} 
                                                    onChange={(e) => handleChange('timeLineType', e.target.value)}
                                                    />
                                                    <label for="timeline1_2"><i></i>사각형</label>
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                    {tlList.map((tl, index) => (
                                    <div className="add-box">
                                        <div className="add-head">
                                            <div>
                                                <button
                                                className="add-box-up"
                                                onClick={() => moveUpTimeLine(index)}
                                                disabled={index === 0} // 첫 번째 요소 비활성화
                                                >위로</button>
                                                <button
                                                className="add-box-down"
                                                onClick={() => moveDownTimeLine(index)}
                                                disabled={index === tlList.length - 1} // 마지막 요소 비활성화
                                                >아래로</button>
                                            </div>
                                            <button className="add-box-delete" onClick={() => removeTimeLine(index)}>삭제</button>
                                        </div>
                                        <div className="add-body">
                                            <div className="option">
                                                <div className="option-label">날짜</div>
                                                <div className="option-contents">
                                                    <input 
                                                        type="text" 
                                                        className="input-sts" 
                                                        value={tl.date}
                                                        onChange={(e) => 
                                                            handleInputChangeTimeLine(index, "date", e.target.value)
                                                        } 
                                                    />
                                                </div>
                                            </div>
                                            <div className="option">
                                                <div className="option-label">제목</div>
                                                <div className="option-contents">
                                                    <input 
                                                        type="text" 
                                                        className="input-sts" 
                                                        value={tl.title}
                                                        onChange={(e) => 
                                                            handleInputChangeTimeLine(index, "title", e.target.value)
                                                        } 
                                                    />
                                                </div>
                                            </div>

                                            <div className="option">
                                                <div className="option-label">사진</div>
                                                <div className="option-contents">
                                                    <div className="img-uploader">
                                                        <div className="img-upload">
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                id={`${index}timeline`}
                                                                style={{ display: "none" }}
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0];
                                                                    if (file) {
                                                                        const imageUrl = URL.createObjectURL(file);
                                                                        handleInputChangeTimeLine(index, "imgUrl", imageUrl);
                                                                        handleTlFileUpload(e, index);
                                                                    }
                                                                }}
                                                            />
                                                            <button
                                                                className="img-upload-add"
                                                                onClick={() => document.getElementById(`${index}timeline`).click()}
                                                            />
                                                        </div>
                                                        {tl.imgUrl  && (
                                                        <div className="img-upload fin">
                                                            <div className="img-upload-thumb">
                                                                <img 
                                                                    src={tl.imgUrl} 
                                                                />
                                                            </div>
                                                            <button className="img-upload-cancel" onClick={() =>tl.imgUrl = "" }>삭제</button>
                                                            
                                                        </div>
                                                        
                                                        )}
                                                    </div>

                                                    <div className="mt-10"><button className="btn-positioning">위치 조정</button></div>
                                                </div>
                                            </div>


                                            <div className="option">
                                                <div className="option-label">내용</div>
                                                <div className="option-contents">
                                                    <textarea
                                                        rows="7"
                                                        className="textarea-sts"
                                                        value={tl.content}
                                                        onChange={(e) =>
                                                            handleInputChangeTimeLine(index, "content", e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                    <div className="add-btn">
                                        <button className="add-box-add" onClick={addTimeLine}>타임라인 추가</button>
                                    </div>
                                </div>
                            )}
                            </div>



                            

                            {/* 갤러리 */}
                            <div className="category" >
                                <div className="category-head" >

                                    {/* value=useGallery */}
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useGallery} 
                                            onChange={(e) => handleChange('useGallery', e.target.checked)}
                                        />
                                    </label>

                                    <strong>갤러리</strong>
                                    <button 
                                        className={`btn-toggle ${categories['gallery'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('gallery')}
                                    >여닫기</button>
                                </div>
                                {categories['gallery'] && (
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">타이틀</div>
                                        <div className="option-contents">
                                            <input type="text" className="input-sts" placeholder="갤러리"
                                            value={invitationState.galleryTitle || ""} // Bind to invitationState
                                            onChange={(e) => handleChange("galleryTitle", e.target.value)} // Update state
                                            />
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">타입</div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="gallery" id="gal_grid"
                                                    value="grid"
                                                    checked={invitationState.galleryType === "grid"} 
                                                    onChange={(e) => handleChange('galleryType', e.target.value)}
                                                    />
                                                    <label for="gal_grid"><i></i>그리드</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="gallery" id="gal_circle"
                                                    value="circle"
                                                    checked={invitationState.galleryType === "circle"} 
                                                    onChange={(e) => handleChange('galleryType', e.target.value)}
                                                    />
                                                    <label for="gal_circle"><i></i>써클</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="gallery" id="gal_slide"
                                                    value="slide"
                                                    checked={invitationState.galleryType === "slide"} 
                                                    onChange={(e) => handleChange('galleryType', e.target.value)}
                                                    />
                                                    <label for="gal_slide"><i></i>슬라이드</label>
                                                </span> 
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">사진</div>
                                        <div className="option-contents">
                                            <div className="img-uploader2">
                                                {/* <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    id="galleryfileInput"
                                                    onChange={handleImageUpload}
                                                />
                                                <button
                                                    className="img-uploader2-btn"
                                                    // onClick={() => handleGalleryImageUpload}
                                                    onClick={() => document.getElementById("galleryfileInput").click()} // Input 파일 선택 창 열기
                                                    >
                                                    업로드
                                                </button> */}

                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    id="galleryfileInput"
                                                    onChange={handleGalleryImageUpload} // 파일 선택 시 호출
                                                />

                                                <button
                                                    className="img-uploader2-btn"
                                                    onClick={() => document.getElementById("galleryfileInput").click()}
                                                >
                                                    업로드
                                                </button>
                                                <div className="img-uploader2-area">

                                                    {/* img for문 */}
                                                    {/* {invitationState.galleryImages &&
                                                        invitationState.galleryImages.map((image, index) => (
                                                        <div className="img-uploader2-item" key={index}>
                                                            <img src={image} alt={`gallery-${index}`} />
                                                            <button
                                                            className="img-uploader2-delete"
                                                            onClick={() => handleImageDelete(index)}
                                                            >
                                                            삭제
                                                            </button>
                                                        </div>
                                                    ))} */}
                                                    {invitationState.galleryImages &&
                                                        invitationState.galleryImages.map((image, index) => (
                                                            <div className="gallery-item" key={index}>
                                                                {/* <img src={image} alt={`gallery-${index}`} /> */}
                                                                <img src={previewGallery[index]?.previewUrl || image} alt={`gallery-${index}`} />
                                                                <button onClick={() => handleGalleryImageDelete(index)}>삭제</button>
                                                            </div>
                                                    ))}


                                                </div>
                                                <p className="notice">
                                                    최대 60장 업로드 가능합니다.<br/>퀄리티를 위하여 업로드에 용량 제한이 없습니다.<br/>모바일에 최적화된 가로 사이즈로 업로드 됩니다.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">하단 진행바</div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="gallery_bar" id="gallery_bar_1" 
                                                    value="true"
                                                    checked={invitationState.galleryProgressBarVisible === "true"} 
                                                    onChange={(e) => handleChange('galleryProgressBarVisible', e.target.value)}
                                                    />
                                                    <label for="gallery_bar_1"><i></i>표시</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="gallery_bar" id="gallery_bar_2" 
                                                    value="false"
                                                    checked={invitationState.galleryProgressBarVisible === "false"} 
                                                    onChange={(e) => handleChange('galleryProgressBarVisible', e.target.value)}
                                                    />
                                                    <label for="gallery_bar_2"><i></i>미표시</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="option">
                                        <div className="option-label">썸네일</div>
                                        <div className="option-contents">
                                            <button className="btn-positioning">위치 조정</button>
                                        </div>
                                    </div> */}
                                </div>
                                )}
                            </div>



                            {/* 목요일 이후 구현 (퍼블리싱 없음) */}
                            <div className="category">
                                <div className="category-head">

                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useVideo} 
                                            onChange={(e) => handleChange('useVideo', e.target.checked)}
                                        />
                                    </label>

                                    <strong>영상</strong>
                                    <button 
                                        className={`btn-toggle ${categories['video'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('video')}
                                    >여닫기</button>
                                    
                                </div>
                                {categories['video'] && (
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">유튜브 URL<sup>필수</sup></div>
                                        <div className="option-contents">

                                            <input type="text" className="input-sts" 
                                            placeholder="https://www.youtube.com/watch"
                                            value={invitationState.videoUrl || ""} // Bind to invitationState
                                            onChange={(e) => handleChange("videoUrl", e.target.value)} // Update state
                                            />

                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">영상 제목<sup>필수</sup></div>
                                        <div className="option-contents">
                                            <input type="text" className="input-sts" placeholder="식전 영상"
                                                value={invitationState.videoTitle || ""} 
                                                onChange={(e) => handleChange("videoTitle", e.target.value)} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>

                            {/* 목요일 이후 구현 (퍼블리싱 없음) */}
                            <div className="category">
                                <div className="category-head">
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useInterview} 
                                            onChange={(e) => handleChange('useInterview', e.target.checked)}
                                        />
                                    </label>

                                    <strong>웨딩 인터뷰</strong>

                                    <button 
                                        className={`btn-toggle ${categories['interview'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('interview')}
                                    >여닫기</button>
                                </div>
                                {categories['interview'] && (

                                <div className="category-body">
                                    {/* <div className="option">
                                        <div className="option-label">보여주기 방식</div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="interview" id="interview_1"/>
                                                    <label for="interview_1"><i></i>버튼 클릭 시 팝업으로 보여주기</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="interview" id="interview_2" checked/>
                                                    <label for="interview_2"><i></i>청첩장에 그대로 보여주기</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div> */}
                                    
                                    {interviewList.map((qa, index) => (
                                    <div className="add-box" key={index}>
                                        <div className="add-head">
                                            <div>
                                                <button
                                                className="add-box-up"
                                                onClick={() => moveUpInterview(index)}
                                                disabled={index === 0} // 첫 번째 요소 비활성화
                                                >위로</button>
                                                <button
                                                className="add-box-down"
                                                onClick={() => moveDownInterview(index)}
                                                disabled={index === transportationList.length - 1} // 마지막 요소 비활성화
                                                >아래로</button>
                                            </div>
                                            <button className="add-box-delete" onClick={() => removeInterview(index)}>삭제</button>
                                        </div>
                                        <div className="add-body">
                                            <div className="option">
                                                <div className="option-label">인터뷰 질문</div>
                                                <div className="option-contents">
                                                    <div className="input-change">
                                                        <select className="input-sts" 
                                                            value={qa.question || ""} 
                                                            onChange={(e) => handleInputChangeInterview(index, "question", e.target.value)
                                                        }>
                                                            <option value=""></option>
                                                            <option value="결혼하시는 소감이 어떠세요?">결혼하시는 소감이 어떠세요?</option>
                                                            <option value="처음에 어떻게 만나셨어요?">처음에 어떻게 만나셨어요?</option>
                                                            <option value="신혼여행은 어디로 가시나요?">신혼여행은 어디로 가시나요?</option>
                                                            <option value="직업은 어떻게 되시나요?">직업은 어떻게 되시나요?</option>
                                                            <option value="만난지 얼마나 되셨어요?">만난지 얼마나 되셨어요?</option>
                                                            <option value="결혼을 결심하게 된 계기가 있나요?">결혼을 결심하게 된 계기가 있나요?</option>
                                                            <option value="프로포즈는 어떻게 했나요?">프로포즈는 어떻게 했나요?</option>
                                                            <option value="신혼집은 어디인가요?">신혼집은 어디인가요?</option>
                                                            <option value="하고싶은 이야기">하고싶은 이야기</option>
                                                            <option value="결혼생활에 대한 각오 한마디">결혼생활에 대한 각오 한마디</option>
                                                            <option value="결혼 후 버킷리스트는?">결혼 후 버킷리스트는?</option>
                                                            <option value="서로의 첫인상은 어떠셨나요?">서로의 첫인상은 어떠셨나요?</option>
                                                            <option value="30년 후 두 사람은 어떤 모습일 것 같나요?">30년 후 두 사람은 어떤 모습일 것 같나요?</option>
                                                            <option value="MBTI는 무엇인가요?">MBTI는 무엇인가요?</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="option">
                                                <div className="option-label">인터뷰 답변</div>
                                                <div className="option-contents">
                                                    <textarea name="" id="" rows="7" className="textarea-sts"
                                                    value={qa.answer}
                                                    onChange={(e) =>
                                                        handleInputChangeInterview(index, "answer", e.target.value)
                                                    }
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    ))}

                                    <div className="add-btn">
                                        <button className="add-box-add" onClick={addInterview}>인터뷰 추가</button>
                                    </div>
                                </div>
                            )}
                            </div>

                            <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input type="checkbox" 
                                        checked={invitationState.useMap} 
                                        onChange={(e) => handleChange('useMap', e.target.checked)}
                                        />
                                    </label>
                                    <strong>지도</strong>
                                    <button 
                                        className={`btn-toggle ${categories['map'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('map')}
                                    >여닫기</button>
                                </div>
                                {categories['map'] && (

                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">지도 마커</div>
                                        <div className="option-contents">
                                            <div className="map-marker">
                                                <MapComponent mapId="map1" address={invitationState.weddingHallAddress} onCoordinatesChange={handleCoordinatesChange} mapHeight={invitationState.mapHeight}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">지도 높이</div>
                                        <div className="option-contents">
                                            <select name="" id="" className="select-sts" 
                                            value={invitationState.mapHeight || "300px"} 
                                            onChange={(e) => handleChange("mapHeight", e.target.value)}
                                            >
                                                <option value="300px">300px</option>
                                                <option value="350px">350px</option>
                                                <option value="400px">400px</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* TODO */}
                                    {/* <div className="option">
                                        <div className="option-label">지도 줌 레벨</div>
                                        <div className="option-contents">
                                            <select name="" id="" className="select-sts"
                                            value={invitationState.mapZoomLevel || "3"} 
                                            onChange={(e) => handleChange("mapZoomLevel", e.target.value)}
                                            >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                            </select>
                                            <p className="notice">지도 레벨은 1부터 14레벨이 있으며 숫자가 작을수록 지도 확대 수준이 높습니다.</p>
                                        </div>
                                    </div> */}
                                    <div className="option">
                                        <div className="option-label">네비게이션</div>
                                        <div className="option-contents">
                                            <div className="check-wrap">
                                                <span className="check">
                                                    <input type="checkbox" id="navigation"
                                                    onChange={(e) => handleChange("navigationRemove", e.target.checked)}/>
                                                    <label for="navigation"><i></i>네비게이션 삭제</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">지도 고정</div>
                                        <div className="option-contents">
                                            <div className="check-wrap">
                                                <span className="check">
                                                    <input type="checkbox" id="map_fix"/>
                                                    <label for="map_fix"><i></i>지도 이동 고정</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div> 
                            
                            {/* 교통수단단 */}
                            <div className="category">
                                <div className="category-head">

                                    {/* value=useTransportation */}
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useTransportation} 
                                            onChange={(e) => handleChange('useTransportation', e.target.checked)}
                                        />
                                    </label>

                                    <strong>교통수단</strong>

                                    <button 
                                        className={`btn-toggle ${categories['trnspt'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('trnspt')}
                                    >여닫기</button>
                                </div>
                                {categories['trnspt'] && (
                                <div className="category-body">
                                {transportationList.map((transport, index) => (
                                    <div className="add-box" key={index} >
                                        <div className="add-head">
                                            <div>
                                                <button
                                                className="add-box-up"
                                                onClick={() => moveUp(index)}
                                                disabled={index === 0} // 첫 번째 요소 비활성화
                                                >위로</button>
                                                <button
                                                className="add-box-down"
                                                onClick={() => moveDown(index)}
                                                disabled={index === transportationList.length - 1} // 마지막 요소 비활성화
                                                >아래로</button>
                                            </div>
                                            <button className="add-box-delete" onClick={() => removeTransportation(index)}>삭제</button>
                                            
                                        </div>
                                        <div className="add-body">
                                            <div className="option">
                                                <div className="option-label">교통수단</div>
                                                <div className="option-contents">
                                                    <input
                                                    type="text"
                                                    className="input-sts"
                                                    placeholder="교통수단"
                                                    value={transport.method}
                                                    onChange={(e) =>
                                                        handleInputChange(index, "method", e.target.value)
                                                    }
                                                    />
                                                </div>
                                            </div>
                                            <div className="option">
                                                <div className="option-label">내용</div>
                                                <div className="option-contents">
                                                    <textarea 
                                                        name="" 
                                                        id="" 
                                                        rows="7" 
                                                        className="textarea-sts"
                                                        value={transport.details}
                                                        onChange={(e) =>
                                                            handleInputChange(index, "details", e.target.value)
                                                        }
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                    <div className="add-btn">
                                        <button className="add-box-add" onClick={addTransportation}>교통수단 추가</button>
                                    </div>
                                </div>
                                )}
                            </div>

                            {/* 안내사항 */}
                            <div className="category">
                                <div className="category-head">
                                <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useInfo} 
                                            onChange={(e) => handleChange('useInfo', e.target.checked)}
                                        />
                                    </label>

                                    <strong>안내사항</strong>

                                    <button 
                                        className={`btn-toggle ${categories['info'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('info')}
                                    >여닫기</button>
                                </div>
                                {categories['info'] && (
                                <div className="category-body">

                                    {infoList.map((info, index) => (
                                    <div className="add-box" key={index}>
                                        <div className="add-head">
                                            <div>
                                                <button
                                                className="add-box-up"
                                                onClick={() => moveUpInfo(index)}
                                                disabled={index === 0} // 첫 번째 요소 비활성화
                                                >위로</button>
                                                <button
                                                className="add-box-down"
                                                onClick={() => moveDownInfo(index)}
                                                disabled={index === infoList.length - 1} // 마지막 요소 비활성화
                                                >아래로</button>
                                            </div>
                                            <button className="add-box-delete" onClick={() => removeInfo(index)}>삭제</button>
                                        </div>
                                        <div className="add-body">
                                            <div className="option">
                                                <div className="option-label">제목</div>
                                                <div className="option-contents">
                                                    {/* <input type="text" className="input-sts"/> */}
                                                    <input
                                                    type="text"
                                                    className="input-sts"
                                                    value={info.title}
                                                    onChange={(e) =>
                                                        handleInputChangeInfo(index, "title", e.target.value)
                                                    }
                                                    />
                                                </div>
                                            </div>
                                            <div className="option">
                                                <div className="option-label">사진</div>
                                                <div className="option-contents">

                                                    <div className="img-uploader">
                                                        <div className="img-upload">
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                id={`${index}info`}
                                                                style={{ display: "none" }}
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0];
                                                                    if (file) {
                                                                        const imageUrl = URL.createObjectURL(file);
                                                                        handleInputChangeInfo(index, "imgUrl", imageUrl);
                                                                        handleInfoFileUpload(e, index);
                                                                    }
                                                                }}
                                                            />
                                                            {/* <input
                                                                type="file"
                                                                accept="image/*"
                                                                style={{ display: "none" }}
                                                                id={`${index}file`}
                                                                onChange={(event) => handleInfoFileUpload(event, index)}
                                                            /> */}

                                                            <button
                                                                className="img-upload-add"
                                                                onClick={() => document.getElementById(`${index}info`).click()}
                                                            />
                                                        </div>
                                                        {info.imgUrl  && (
                                                            <div className="img-upload fin">
                                                                <div className="img-upload-thumb">
                                                                    <img 
                                                                        src={info.imgUrl} 
                                                                    />
                                                                </div>
                                                                <button className="img-upload-cancel" onClick={() =>info.imgUrl = "" }>삭제</button>
                                                                
                                                            </div>
                                                            
                                                        )}
                                                    </div>


                                                </div>
                                            </div>
                                            <div className="option">
                                                <div className="option-label">내용</div>
                                                <div className="option-contents">
                                                    {/* <textarea name="" id="" rows="7" className="textarea-sts"></textarea> */}
                                                    <textarea
                                                    rows="7"
                                                    className="textarea-sts"
                                                    value={info.content}
                                                    onChange={(e) =>
                                                        handleInputChangeInfo(index, "content", e.target.value)
                                                    }
                                                    />
                                                </div>
                                            </div>
                                            {/* TODO */}
                                            {/* <div className="option">
                                                <div className="option-label">외부링크 버튼</div>
                                                <div className="option-contents">
                                                    <div className="radio-wrap">
                                                        <span className="radio">
                                                            <input 
                                                                type="radio" 
                                                                name="notice_link" 
                                                                id="notice_link_1" 
                                                                checked={!info.useBtn} 
                                                                onChange={(e) => handleInputChangeInfo(index, "useBtn", false)}
                                                            />
                                                            <label for="notice_link_1"><i></i>미사용</label>
                                                        </span>
                                                        <span className="radio">
                                                            <input 
                                                                type="radio" 
                                                                name="notice_link" 
                                                                id="notice_link_2"
                                                                checked={info.useBtn} 
                                                                onChange={(e) => handleInputChangeInfo(index, "useBtn", true)}
                                                            />
                                                            <label for="notice_link_2"><i></i>사용</label>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {info.useBtn && (
                                            <>
                                            <div className="option">
                                                <div className="option-label">링크</div>
                                                <div className="option-contents">
                                                    <input
                                                    type="text"
                                                    className="input-sts"
                                                    value={info.link}
                                                    onChange={(e) =>
                                                        handleInputChangeInfo(index, "link", e.target.value)
                                                    }
                                                    />
                                                </div>
                                            </div>

                                            <div className="option">
                                                <div className="option-label">버튼 텍스트</div>
                                                <div className="option-contents">
                                                    <input
                                                    type="text"
                                                    className="input-sts"
                                                    value={info.btnTxt}
                                                    onChange={(e) =>
                                                        handleInputChangeInfo(index, "btnTxt", e.target.value)
                                                    }
                                                    />
                                                </div>
                                            </div>
                                            </>
                                            )} */}

                                        </div>
                                    </div>
                                    ))}
                                    <div className="add-btn">
                                        <button className="add-box-add" onClick={addInfo}>안내사항 추가</button>
                                    </div>
                                </div>
                            )}
                            </div>

                            <div className="category">
                                <div className="category-head">

                                    {/* value=useNotice */}
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useNotice} 
                                            onChange={(e) => handleChange('useNotice', e.target.checked)}
                                        />
                                    </label>

                                    <strong>안내문</strong>
                                    <button 
                                        className={`btn-toggle ${categories['noticeMessage'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('noticeMessage')}
                                    >여닫기</button>
                                </div>
                                {categories['noticeMessage'] && (
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">제목</div>
                                        <div className="option-contents"> 
                                            {/* invitationState.noticeTitle */}
                                            {/* <input type="text" className="input-sts"/> */}
                                            <input 
                                                type="text" 
                                                className="input-sts"
                                                value={invitationState.noticeTitle} // Bind to invitationState
                                                onChange={(e) => handleChange("noticeTitle", e.target.value)} // Update state
                                            />
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">내용</div>
                                        <div className="option-contents">
                                            <div className="phrase">
                                                {/* 목요일 구현 */}
                                                {/* <button className="phrase-sample">샘플 양식</button> */}
                                                <textarea
                                                className="textarea-sts"
                                                rows="9"
                                                value={invitationState.noticeContent || ""} // Bind to invitationState
                                                onChange={(e) => handleChange("noticeContent", e.target.value)} // Update state
                                                ></textarea>

                                            </div>
                                        </div>
                                    </div>
                                    {/* 목요일 이후 구현  */}
                                    {/* <div className="option">
                                        <div className="option-label">외부링크 버튼</div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="notice_link_2" id="notice_link_2_1" checked/>
                                                    <label for="notice_link_2_1"><i></i>미사용</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="notice_link_2" id="notice_link_2_2"/>
                                                    <label for="notice_link_2_2"><i></i>사용</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="option">
                                        <div className="option-label">버튼 텍스트</div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="notice_link_2" id="notice_link_2_1" checked/>
                                                    <label for="notice_link_2_1"><i></i>미사용</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="notice_link_2" id="notice_link_2_2"/>
                                                    <label for="notice_link_2_2"><i></i>사용</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div> */}


                                </div>
                                )}
                            </div>


                            {/* 목요일 이후 구현 (퍼블리싱 없음) */}
                            {/* <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input type="checkbox" checked/>
                                    </label>
                                    <strong>참석여부 RSVP</strong>
                                    <button 
                                        className={`btn-toggle ${categories['rsvpRes'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('rsvpRes')}
                                    >여닫기</button>
                                </div>
                                {categories['rsvpRes'] && (
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">타이틀</div>
                                        <div className="option-contents">
                                            <input type="text" className="input-sts" placeholder="참석 여부 전달"/>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">안내문구</div>
                                        <div className="option-contents">
                                            <textarea name="" id="" className="textarea-sts" rows="9">
                                                    결혼식에 참석해주시는 모든 분들을
                                                    더욱 특별하게 모시고자 하오니,
                                                    참석 여부 전달을 부탁드립니다.
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">사용여부</div>
                                        <div className="option-contents">
                                            <div className="check-wrap2">
                                                <span className="check">
                                                    <input type="checkbox" id="attend_1" checked/>
                                                    <label for="attend_1"><i></i>어느측 하객</label>
                                                </span>
                                                <span className="check">
                                                    <input type="checkbox" id="attend_2" checked/>
                                                    <label for="attend_2"><i></i>참석여부</label>
                                                </span>
                                                <span className="check">
                                                    <input type="checkbox" id="attend_3" checked/>
                                                    <label for="attend_3"><i></i>식사여부</label>
                                                </span>
                                                <span className="check">
                                                    <input type="checkbox" id="attend_4" checked/>
                                                    <label for="attend_4"><i></i>성함</label>
                                                </span>
                                                <span className="check">
                                                    <input type="checkbox" id="attend_5"/>
                                                    <label for="attend_5"><i></i>연락처</label>
                                                </span>
                                                <span className="check">
                                                    <input type="checkbox" id="attend_6" checked/>
                                                    <label for="attend_6"><i></i>동행인 성함</label>
                                                </span>
                                                <span className="check">
                                                    <input type="checkbox" id="attend_7"/>
                                                    <label for="attend_7"><i></i>동행인 수(본인 제외)</label>
                                                </span>
                                                <span className="check">
                                                    <input type="checkbox" id="attend_8" checked/>
                                                    <label for="attend_8"><i></i>전달 사항</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">팝업 사용 여부</div>
                                        <div className="option-contents">
                                            <div className="radio-wrap2">
                                                <span className="radio">
                                                    <input type="radio" id="attend_popup_1" name="attend_popup" checked/>
                                                    <label for="attend_popup_1"><i></i>미사용</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" id="attend_popup_2" name="attend_popup"/>
                                                    <label for="attend_popup_2"><i></i>청첩장 접속 시 참석여부를 묻는 팝업을 먼저 띄웁니다.</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" id="attend_popup_3" name="attend_popup"/>
                                                    <label for="attend_popup_3"><i></i>메인에서 벗어나면 팝업을 띄웁니다.</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">수신받을 메일</div>
                                        <div className="option-contents">
                                            <input type="email" className="input-sts"/>
                                            <p className="notice">
                                                작성한 메일주소로 하객들의 참석여부가 실시간 발송됩니다.<br/>Gmail, iCloud는 정책상 수신 불가하니 다른 메일을 이용해주세요.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">수신받을 전화번호</div>
                                        <div className="option-contents">
                                            <div className="input-btn-box">
                                                <input type="email" className="input-sts" placeholder="-없이 입력해주세요."/>
                                                <button className="input-btn">인증번호 전송</button>
                                            </div>
                                            <p className="notice">
                                                전화번호를 입력하시면 하객들의 참석여부가 카카오톡으로 실시간 발송됩니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div> */}

                            {/* 계좌번호 */}
                            <div className="category">
                                <div className="category-head">
                                    {/* value=useAcnt */}
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useAcnt} 
                                            onChange={(e) => handleChange('useAcnt', e.target.checked)}
                                        />
                                    </label>

                                    <strong>계좌번호</strong>
                                    <button 
                                        className={`btn-toggle ${categories['acnt'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('acnt')}
                                    >여닫기</button>
                                </div>
                                {categories['acnt'] && (

                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">타이틀</div>
                                        <div className="option-contents">
                                            <input
                                                type="text"
                                                className="input-sts"
                                                placeholder="마음 전하실 곳"
                                                value={invitationState.acntTitle}
                                                onChange={(e) => handleChange("acntTitle", e.target.value)} // Update state
                                            />
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">안내문구</div>
                                        <div className="option-contents">
                                            
                                            <ReactQuill
                                                    theme="snow"
                                                    value={invitationState.acntContent || 
                                                        "멀리서도 축하의 마음을" + "<br/>" +
                                                        "전하고 싶으신 분들을 위해 " + "<br/>" +
                                                        "계좌번호를 안내드립니다. " + "<br/><br/>" +
                                                        "소중한 축하를 보내주셔서 감사드리며, " + "<br/>" +
                                                        "따뜻한 마음에 깊이 감사드립니다." + "<br/>"
                                                }
                                                    onChange={(content) => handleChange("acntContent", content)} // Update state
                                                    modules={{
                                                        toolbar: [
                                                        // 텍스트 꾸미기
                                                        ['bold', 'italic', 'underline', 'strike'],
                                                        // 색상
                                                        [{ 'color': [] }, { 'background': [] }],
                                                        // 정렬
                                                        [{ 'align': [] }],
                                                        ],
                                                    }}
                                                    formats={[
                                                        'bold', 'italic', 'underline', 'strike',
                                                        'color', 'background',
                                                        'align',
                                                    ]}
                                                />

                                        </div>
                                    </div>
                                    {/* <div className="option">
                                        <div className="option-label">보여주기 방식</div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="bank_account" id="bank_account_1" checked/>
                                                    <label for="bank_account_1"><i></i>가리기</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="bank_account" id="bank_account_2"/>
                                                    <label for="bank_account_2"><i></i>펼치기</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="option">
                                        <div className="option-label">
                                            {/* <span className="check">
                                                <input type="checkbox" id="bank_info_1" checked/>
                                                <label for="bank_info_1"><i></i></label>
                                            </span> */}
                                            신랑
                                        </div>
                                        <div className="option-contents">
                                            <div className="bank-info">
                                                <input
                                                    type="text"
                                                    className="input-sts"
                                                    placeholder="은행"
                                                    value={invitationState.brmBank}
                                                    onChange={(e) => handleChange("brmBank", e.target.value)} // Update state
                                                />
                                                <input
                                                    type="text"
                                                    className="input-sts"
                                                    placeholder="계좌번호"
                                                    value={invitationState.brmAcnt}
                                                    onChange={(e) => handleChange("brmAcnt", e.target.value)} // Update state
                                                />
                                                <input
                                                    type="text"
                                                    className="input-sts"
                                                    placeholder="예금주"
                                                    value={invitationState.brmNm}
                                                    onChange={(e) => handleChange("brmNm", e.target.value)} // Update state
                                                />
                                                {/* <span className="check">
                                                    <input type="checkbox" id="bank_info_1_kakao"/>
                                                    <label for="bank_info_1_kakao"><i></i>카카오페이 추가</label>
                                                </span> */}
                                            </div>
                                        </div>
                                    </div>


                                    <div className="option">
                                        <div className="option-label">
                                            {/* <span className="check">
                                                <input type="checkbox" id="bank_info_2" checked/>
                                                <label for="bank_info_2"><i></i></label>
                                            </span> */}
                                            신부
                                        </div>
                                        <div className="option-contents">
                                            <div className="bank-info">
                                                <input
                                                    type="text"
                                                    className="input-sts"
                                                    placeholder="은행"
                                                    value={invitationState.brdBank}
                                                    onChange={(e) => handleChange("brdBank", e.target.value)} // Update state
                                                />
                                                <input
                                                    type="text"
                                                    className="input-sts"
                                                    placeholder="계좌번호"
                                                    value={invitationState.brdAcnt}
                                                    onChange={(e) => handleChange("brdAcnt", e.target.value)} // Update state
                                                />
                                                <input
                                                    type="text"
                                                    className="input-sts"
                                                    placeholder="예금주"
                                                    value={invitationState.brdNm}
                                                    onChange={(e) => handleChange("brdNm", e.target.value)} // Update state
                                                />
                                                {/* <span className="check">
                                                    <input type="checkbox" id="bank_info_1_kakao"/>
                                                    <label for="bank_info_1_kakao"><i></i>카카오페이 추가</label>
                                                </span> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="option">
                                        <div className="option-label">
                                            {/* <span className="check">
                                                <input type="checkbox" id="bank_info_2" checked/>
                                                <label for="bank_info_2"><i></i></label>
                                            </span> */}
                                            신랑 아버지
                                        </div>
                                        <div className="option-contents">
                                            <div className="bank-info">
                                                <input
                                                    type="text"
                                                    className="input-sts"
                                                    placeholder="은행"
                                                    value={invitationState.brmfBank}
                                                    onChange={(e) => handleChange("brmfBank", e.target.value)} // Update state
                                                />
                                                <input
                                                    type="text"
                                                    className="input-sts"
                                                    placeholder="계좌번호"
                                                    value={invitationState.brmfAcnt}
                                                    onChange={(e) => handleChange("brmfAcnt", e.target.value)} // Update state
                                                />
                                                <input
                                                    type="text"
                                                    className="input-sts"
                                                    placeholder="예금주"
                                                    value={invitationState.brmfNm}
                                                    onChange={(e) => handleChange("brmfNm", e.target.value)} // Update state
                                                />
                                                {/* <span className="check">
                                                    <input type="checkbox" id="bank_info_1_kakao"/>
                                                    <label for="bank_info_1_kakao"><i></i>카카오페이 추가</label>
                                                </span> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="option">
                                        <div className="option-label">
                                            {/* <span className="check">
                                                <input type="checkbox" id="bank_info_2" checked/>
                                                <label for="bank_info_2"><i></i></label>
                                            </span> */}
                                            신랑 어머니
                                        </div>
                                        <div className="option-contents">
                                            <div className="bank-info">
                                                <input
                                                    type="text"
                                                    className="input-sts"
                                                    placeholder="은행"
                                                    value={invitationState.brmmBank}
                                                    onChange={(e) => handleChange("brmmBank", e.target.value)} // Update state
                                                />
                                                <input
                                                    type="text"
                                                    className="input-sts"
                                                    placeholder="계좌번호"
                                                    value={invitationState.brmmAcnt}
                                                    onChange={(e) => handleChange("brmmAcnt", e.target.value)} // Update state
                                                />
                                                <input
                                                    type="text"
                                                    className="input-sts"
                                                    placeholder="예금주"
                                                    value={invitationState.brmmNm}
                                                    onChange={(e) => handleChange("brmmNm", e.target.value)} // Update state
                                                />
                                                {/* <span className="check">
                                                    <input type="checkbox" id="bank_info_1_kakao"/>
                                                    <label for="bank_info_1_kakao"><i></i>카카오페이 추가</label>
                                                </span> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="option">
                                        <div className="option-label">
                                            {/* <span className="check">
                                                <input type="checkbox" id="bank_info_2" checked/>
                                                <label for="bank_info_2"><i></i></label>
                                            </span> */}
                                            신부 아버지
                                        </div>
                                        <div className="option-contents">
                                            <div className="bank-info">
                                                <input
                                                    type="text"
                                                    className="input-sts"
                                                    placeholder="은행"
                                                    value={invitationState.brdfBank}
                                                    onChange={(e) => handleChange("brdfBank", e.target.value)} // Update state
                                                />
                                                <input
                                                    type="text"
                                                    className="input-sts"
                                                    placeholder="계좌번호"
                                                    value={invitationState.brdfAcnt}
                                                    onChange={(e) => handleChange("brdfAcnt", e.target.value)} // Update state
                                                />
                                                <input
                                                    type="text"
                                                    className="input-sts"
                                                    placeholder="예금주"
                                                    value={invitationState.brdfNm}
                                                    onChange={(e) => handleChange("brdfNm", e.target.value)} // Update state
                                                />
                                                {/* <span className="check">
                                                    <input type="checkbox" id="bank_info_1_kakao"/>
                                                    <label for="bank_info_1_kakao"><i></i>카카오페이 추가</label>
                                                </span> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="option">
                                        <div className="option-label">
                                            {/* <span className="check">
                                                <input type="checkbox" id="bank_info_2" checked/>
                                                <label for="bank_info_2"><i></i></label>
                                            </span> */}
                                            신부 어머니
                                        </div>
                                        <div className="option-contents">
                                            <div className="bank-info">
                                                <input
                                                    type="text"
                                                    className="input-sts"
                                                    placeholder="은행"
                                                    value={invitationState.brdmBank}
                                                    onChange={(e) => handleChange("brdmBank", e.target.value)} // Update state
                                                />
                                                <input
                                                    type="text"
                                                    className="input-sts"
                                                    placeholder="계좌번호"
                                                    value={invitationState.brdmAcnt}
                                                    onChange={(e) => handleChange("brdmAcnt", e.target.value)} // Update state
                                                />
                                                <input
                                                    type="text"
                                                    className="input-sts"
                                                    placeholder="예금주"
                                                    value={invitationState.brdmNm}
                                                    onChange={(e) => handleChange("brdmNm", e.target.value)} // Update state
                                                />
                                                {/* <span className="check">
                                                    <input type="checkbox" id="bank_info_1_kakao"/>
                                                    <label for="bank_info_1_kakao"><i></i>카카오페이 추가</label>
                                                </span> */}
                                            </div>
                                        </div>
                                    </div>

                                    
                                    
                                    
                                </div>
                            )}
                            </div>

                            {/* [방명록] */}
                            <div className="category">
                                <div className="category-head">
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useGuestbook} 
                                            onChange={(e) => handleChange('useGuestbook', e.target.checked)}
                                        />
                                    </label>
                                    <strong>방명록</strong>
                                    <button 
                                        className={`btn-toggle ${categories['guestbook'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('guestbook')}
                                    >여닫기</button>
                                </div>
                                {categories['guestbook'] && (
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">타이틀</div>
                                        <div className="option-contents">
                                            <input
                                                type="text"
                                                className="input-sts"
                                                placeholder="방명록"
                                                value={invitationState.guestbookTitle}
                                                onChange={(e) => handleChange("guestbookTitle", e.target.value)} // Update state
                                            />
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">마스터 비밀번호</div>
                                        <div className="option-contents">
                                            <input
                                                type="password"
                                                className="input-sts"
                                                placeholder="비밀번호 입력"
                                                value={invitationState.masterPwd}
                                                onChange={(e) => handleChange("masterPwd", e.target.value)} // Update state
                                            />
                                            <input type="password" className="input-sts" placeholder="비밀번호 확인"/>
                                        </div>
                                    </div>
                                    {/* <div className="option">
                                        <div className="option-label">수신받을 메일</div>
                                        <div className="option-contents">
                                            <input type="email" className="input-sts"/>
                                            <p className="notice">작성한 메일주소로 하객들의 방명록이 실시간 발송됩니다.,<br/>Gmail, iCloud는 정책상 수신 불가하니 다른 메일을 이용해주세요.</p>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">수신받을 전화번호</div>
                                        <div className="option-contents">
                                            <div className="input-btn-box">
                                                <input type="email" className="input-sts" placeholder="-없이 입력해주세요."/>
                                                <button className="input-btn">인증번호 전송</button>
                                            </div>
                                            <p className="notice">
                                                전화번호를 입력하시면 하객들의 참석여부가 카카오톡으로 실시간 발송됩니다.
                                            </p>
                                        </div>
                                    </div> */}
                                </div>
                            )}
                            </div>



                            <div className="category">
                                <div className="category-head" >

                                    {/* value=useFlower */}
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useFlower} 
                                            onChange={(e) => handleChange('useFlower', e.target.checked)}
                                        />
                                    </label>


                                    <strong>화환 보내기</strong>
                                    {/* <button 
                                        className={`btn-toggle ${categories['flowerDelivery'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('flowerDelivery')}
                                    >여닫기</button>  */}
                                </div>
                                {/* {categories['flowerDelivery'] && (
                                    <div className="category-body">
                                        <div className="option">
                                            <div className="option-label">링크</div>
                                            <div className="option-contents">

                                                <input
                                                type="text"
                                                className="input-sts"
                                                placeholder='화환 보내기 URL을 입력해주세요.'
                                                value={invitationState.sendWreathUrl}
                                                onChange={(e) => handleChange("sendWreathUrl", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                )} */}
                            </div>



                            <div className="category">
                                <div className="category-head" >

                                    {/* value=useFirstMeetTime */}
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useFirstMeetTime} 
                                            onChange={(e) => handleChange('useFirstMeetTime', e.target.checked)}
                                        />
                                    </label>

                                    <strong>함께한 시간</strong>
                                    <button 
                                        className={`btn-toggle ${categories['timeTogether'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('timeTogether')}
                                    >여닫기</button>
                                </div>
                                {categories['timeTogether'] && (
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">첫만남</div>
                                        <div className="option-contents">
                                            {/* <input type="datetime-local" className="input-sts"/> */}
                                            <input
                                            type="datetime-local"
                                            className="input-sts"
                                            value={invitationState.firstMeetTime}
                                            onChange={(e) => handleChange("firstMeetTime", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div>


                            <div className="category">
                                <div className="category-head">

                                    {/* value=useEnding */}
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useEnding} 
                                            onChange={(e) => handleChange('useEnding', e.target.checked)}
                                        />
                                    </label>


                                    <strong>엔딩</strong>
                                    <button 
                                        className={`btn-toggle ${categories['ending'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('ending')}
                                    >여닫기</button>
                                </div>
                                {categories['ending'] && (
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">사진</div>
                                        <div className="option-contents">
                                            <div className="img-uploader">
                                                <div className="img-upload">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        id="endingPhotoInput"
                                                        style={{ display: "none" }}
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                const imageUrl = URL.createObjectURL(file);
                                                                handleChange("endingImage", imageUrl);
                                                                handleFileChange(e, 'endingPhoto');
                                                            }
                                                        }}
                                                    />

                                                    <button
                                                        className="img-upload-add"
                                                        onClick={() => document.getElementById('endingPhotoInput').click()}
                                                    />
                                                </div>
                                                {invitationState.endingImage  && (
                                                <div className="img-upload fin">
                                                    <div className="img-upload-thumb">
                                                        <img 
                                                            src={invitationState.endingImage || bgimg} 
                                                            alt="엔딩" 
                                                        />
                                                    </div>
                                                    <button className="img-upload-cancel" onClick={() =>invitationState.endingImage = "" }>삭제</button>
                                                </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">글귀</div>
                                        <div className="option-contents">
                                            <textarea
                                                className="textarea-sts"
                                                rows="9"
                                                value={invitationState.endingContent || ""} // Bind to invitationState
                                                onChange={(e) => handleChange("endingContent", e.target.value)} // Update state
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">엔딩 글귀 위치</div>
                                        <div className="option-contents">
                                            {/* <input type="range" /> */}
                                            <input
                                                type="range"
                                                min="10"
                                                max="80"
                                                value={parseInt(endingHg)} // Parse to integer for the range input
                                                onChange={(e) => handleEndingRangeChange(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                                )}
                            </div>

                            
                            {/* 로딩화면 */}
                            <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useLoading} 
                                            onChange={(e) => handleChange('useLoading', e.target.checked)}
                                        />
                                    </label>
                                    <strong>로딩화면</strong>

                                    <button 
                                        className={`btn-toggle ${categories['loading'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('loading')}
                                    >여닫기</button>
                                </div>
                                {categories['loading'] && (

                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">타입<sup>필수</sup></div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="loading" id="loading_1" 
                                                    value="loading_1"
                                                    checked={invitationState.loadType === "loading_1"} 
                                                    onChange={(e) => handleChange('loadType', e.target.value)}
                                                    />
                                                    {/* <label for="loading_1"><i></i>드로우(텍스트형)</label> */}
                                                    <label for="loading_1"><i></i>텍스트</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="loading" id="loading_2"
                                                    value="loading_2"
                                                    checked={invitationState.loadType === "loading_2"} 
                                                    onChange={(e) => handleChange('loadType', e.target.value)}
                                                    />
                                                    {/* <label for="loading_2"><i></i>드로우(이미지형)</label> */}
                                                    <label for="loading_2"><i></i>이미지</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="loading" id="loading_3"
                                                    value="loading_3"
                                                    checked={invitationState.loadType === "loading_3"} 
                                                    onChange={(e) => handleChange('loadType', e.target.value)}
                                                    />
                                                    <label for="loading_3"><i></i>타이핑</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {invitationState.loadType === "loading_1" && 
                                        <>
                                        
                                            {/* 드로우(텍스트형) 옵션 */}
                                            <div className="option">
                                                <div className="option-label">문구<sup>필수</sup></div>
                                                <div className="option-contents">
                                                    <div className="input-change">
                                                        <select
                                                        className="input-sts"
                                                        value={invitationState.drawTxt || ""}
                                                        onChange={(e) => handleChange("drawTxt", e.target.value)}
                                                        >
                                                        <option value="">문구를 선택하세요</option>
                                                            {loadingTextList.map((item) => (
                                                                <option key={item.val} value={item.val}>
                                                                {item.content}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="option">
                                                <div className="option-label">배경색<sup>필수</sup></div>
                                                <div className="option-contents">
                                                    <div className="color-picker">
                                                        <span className="color-value">{invitationState.drawBgClr}</span>
                                                        <input
                                                            className="color-input"
                                                            type="color"
                                                            value={invitationState.drawBgClr || "#fff"}
                                                            onChange={(e) => handleChange("drawBgClr", e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="option">
                                                <div className="option-label">폰트색<sup>필수</sup></div>
                                                <div className="option-contents">
                                                    <div className="color-picker">
                                                        <span className="color-value">{invitationState.drawFontClr}</span>
                                                        <input
                                                            className="color-input"
                                                            type="color"
                                                            value={invitationState.drawFontClr || "#C4989D"}
                                                            onChange={(e) => handleChange("drawFontClr", e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                    }
                                    {invitationState.loadType === "loading_2" && 
                                        <>
                                            {/* 드로우(이미지형) 옵션 */}
                                            <div className="option">
                                                <div className="option-label">배경사진</div>
                                                <div className="option-contents">
                                                    <div className="img-uploader">
                                                        <div className="img-upload">
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                id="drawImgFile"
                                                                style={{ display: "none" }}
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0];
                                                                    if (file) {
                                                                        const imageUrl = URL.createObjectURL(file);
                                                                        handleChange("drawImgUrl", imageUrl);
                                                                        handleFileChange(e, 'drawImgFile');
                                                                    }
                                                                }}
                                                            />

                                                            <button
                                                                className="img-upload-add"
                                                                onClick={() => document.getElementById('drawImgFile').click()}
                                                            />
                                                        </div>
                                                        {invitationState.drawImgUrl  && (
                                                            <div className="img-upload fin">
                                                            <div className="img-upload-thumb">
                                                                <img 
                                                                    src={invitationState.drawImgUrl} 
                                                                    alt="배경사진" 
                                                                />
                                                            </div>
                                                            <button className="img-upload-cancel" 
                                                                onClick={() =>
                                                                invitationState.drawImgUrl = ""  }>삭제</button>
                                                        </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="option">
                                                <div className="option-label">문구<sup>필수</sup></div>
                                                <div className="option-contents">
                                                    <div className="input-change">
                                                        <select
                                                        className="input-sts"
                                                        value={invitationState.drawImgTxt || ""}
                                                        onChange={(e) => handleChange("drawImgTxt", e.target.value)}
                                                        >
                                                        <option value="">문구를 선택하세요</option>
                                                            {loadingTextList.map((item) => (
                                                                <option key={item.val} value={item.val}>
                                                                {item.content}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        </>
                                    }
                                    {invitationState.loadType === "loading_3" && 
                                        <>
                                        
                                            {/* 타이핑 */}
                                            <div className="option">
                                                <div className="option-label">색상<sup>필수</sup></div>
                                                <div className="option-contents">
                                                    <div className="radio-wrap">
                                                    {loadingClrList.map((item, idx) => (
                                                        <span className="radio" key={item.val || `none-${idx}`}>
                                                        <input
                                                            type="radio"
                                                            name="typingClr" // name 지정해줘야 그룹으로 묶여서 단일 선택 가능해져
                                                            id={item.val || ""}
                                                            value={item.val}
                                                            checked={invitationState.typingClr === item.val}
                                                            onChange={(e) => handleChange('typingClr', e.target.value)}
                                                        />
                                                        <label htmlFor={item.val || ''}><i></i>{item.content}</label>
                                                        </span>
                                                    ))}
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="option">
                                                <div className="option-label">로딩문구<sup>필수</sup></div>
                                                <div className="option-contents">
                                                    <input
                                                        type="text"
                                                        className="input-sts"
                                                        placeholder="We're getting married"
                                                        value={invitationState.typingTxt}
                                                        onChange={(e) => handleChange("typingTxt", e.target.value)} // Update state
                                                    />
                                                </div>
                                            </div>
                                        
                                        </>
                                    }
                                    
                                    

                                    

                                </div>
                                )}
                            </div>




                            {/* 목요일 이후 구현 (디자인, 퍼블리싱 없음) */}
                            {/* <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input type="checkbox" checked/>
                                    </label>
                                    <strong>폰트 및 스타일</strong>

                                    <button 
                                        className={`btn-toggle ${categories['fontStyle'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('fontStyle')}
                                    >여닫기</button>
                                </div>
                                {categories['fontStyle'] && (

                                </div>
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">폰트</div>
                                        <div className="option-contents">
                                            <div className="ff-area">
                                                <div className="ff-item ff1">
                                                    <input type="radio" name="font" id="font_1" checked/>
                                                    <label for="font_1">[에스코어드림] 모바일 청첩장</label>
                                                </div>
                                                <div className="ff-item ff2">
                                                    <input type="radio" name="font" id="font_2"/>
                                                    <label for="font_2">[프리텐다드] 모바일 청첩장</label>
                                                </div>
                                                <div className="ff-item ff3">
                                                    <input type="radio" name="font" id="font_3"/>
                                                    <label for="font_3">[고운돋움] 모바일 청첩장</label>
                                                </div>
                                                <div className="ff-item ff4">
                                                    <input type="radio" name="font" id="font_4"/>
                                                    <label for="font_4">[나눔고딕] 모바일 청첩장</label>
                                                </div>
                                                <div className="ff-item ff5">
                                                    <input type="radio" name="font" id="font_5"/>
                                                    <label for="font_5">[나눔명조] 모바일 청첩장</label>
                                                </div>
                                                <div className="ff-item ff6">
                                                    <input type="radio" name="font" id="font_6"/>
                                                    <label for="font_6">[순바탕] 모바일 청첩장</label>
                                                </div>
                                                <div className="ff-item ff7">
                                                    <input type="radio" name="font" id="font_7"/>
                                                    <label for="font_7">[순바탕] 모바일 청첩장</label>
                                                </div>
                                                <div className="ff-item ff8">
                                                    <input type="radio" name="font" id="font_8"/>
                                                    <label for="font_8">[순바탕] 모바일 청첩장</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">폰트 사이즈</div>
                                        <div className="option-contents">
                                            <div className="fs-area">
                                                <div className="fs-item fs1">
                                                    <input type="radio" name="fs" id="fs_1" checked/>
                                                    <label for="fs_1">기본<br/>(권장)</label>
                                                </div>
                                                <div className="fs-item fs2">
                                                    <input type="radio" name="fs" id="fs_2"/>
                                                    <label for="fs_2">크게</label>
                                                </div>
                                                <div className="fs-item fs3">
                                                    <input type="radio" name="fs" id="fs_3"/>
                                                    <label for="fs_3">더 크게</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">폰트 강조색</div>
                                        <div className="option-contents">
                                            <div className="fp-area">
                                                <div className="fp-item fp1">
                                                    <input type="radio" name="fp" id="fp_1" checked/>
                                                    <label for="fp_1">핑크 <img src="./images/create/fp_1.svg" alt="핑크"/></label>
                                                </div>
                                                <div className="fp-item fp2">
                                                    <input type="radio" name="fp" id="fp_2"/>
                                                    <label for="fp_2">오렌지 <img src="./images/create/fp_2.svg" alt="오렌지"/></label>
                                                </div>
                                                <div className="fp-item fp3">
                                                    <input type="radio" name="fp" id="fp_3"/>
                                                    <label for="fp_3">그린 <img src="./images/create/fp_3.svg" alt="그린"/></label>
                                                </div>
                                                <div className="fp-item fp4">
                                                    <input type="radio" name="fp" id="fp_4"/>
                                                    <label for="fp_4">블루 <img src="./images/create/fp_4.svg" alt="블루"/></label>
                                                </div>
                                                <div className="fp-item fp5">
                                                    <input type="radio" name="fp" id="fp_5"/>
                                                    <label for="fp_5">브라운 <img src="./images/create/fp_5.svg" alt="브라운"/></label>
                                                </div>
                                                <div className="fp-item fp6">
                                                    <input type="radio" name="fp" id="fp_6"/>
                                                    <label for="fp_6">없음(블랙) <img src="./images/create/fp_6.svg" alt="없음(블랙)"/></label>
                                                </div>
                                                <div className="fp-item fp7">
                                                    <input type="radio" name="fp" id="fp_7"/>
                                                    <label for="fp_7">직접 선택 
                                                        <div className="color-picker2">
                                                            <input className="color-input" type="color" value="#FFCA6E"/>
                                                            <input className="color-input"  type="color" value="#FFF0D1"/>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">바탕글 폰트색상</div>
                                        <div className="option-contents">
                                            <div className="color-picker">
                                                <span className="color-value">#93EEF4</span>
                                                <input className="color-input" type="color" value="#93EEF4"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">버튼 폰트색상</div>
                                        <div className="option-contents">
                                            <div className="color-picker">
                                                <span className="color-value">#93EEF4</span>
                                                <input className="color-input" type="color" value="#93EEF4"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">배경색</div>
                                        <div className="option-contents">
                                            <div className="bg-area"> 
                                                <div className="bg-item bg1">
                                                    <input type="radio" name="bg" id="bg_1" checked/>
                                                    <label for="bg_1">베이지<br/>페이퍼</label>
                                                </div>
                                                <div className="bg-item bg2">
                                                    <input type="radio" name="bg" id="bg_2"/>
                                                    <label for="bg_2">화이트<br/>페이퍼</label>
                                                </div>
                                                <div className="bg-item bg3">
                                                    <input type="radio" name="bg" id="bg_3"/>
                                                    <label for="bg_3">크라프트<br/>페이퍼</label>
                                                </div>
                                                <div className="bg-item bg4">
                                                    <input type="radio" name="bg" id="bg_4"/>
                                                    <label for="bg_4">직접선택
                                                        <div className="color-picker2">
                                                            <input className="color-input" type="color" value="#ffffff"/>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                            <p className="notice">메인페이지를 제외한 나머지 페이지들의 배경색입니다.</p>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">효과</div>
                                        <div className="option-contents">
                                            <div className="effect-area"> 
                                                <div className="effect-item effect1">
                                                    <input type="radio" name="effect" id="effect_1" checked/>
                                                    <label for="effect_1">벚꽃 <img src="./images/create/effect_1.png" alt=""/></label>
                                                </div>
                                                <div className="effect-item effect2">
                                                    <input type="radio" name="effect" id="effect_2"/>
                                                    <label for="effect_2">나뭇잎 <img src="./images/create/effect_2.png" alt=""/></label>
                                                </div>
                                                <div className="effect-item effect3">
                                                    <input type="radio" name="effect" id="effect_3"/>
                                                    <label for="effect_3">낙엽 <img src="./images/create/effect_3.png" alt=""/></label>
                                                </div>
                                                <div className="effect-item effect4">
                                                    <input type="radio" name="effect" id="effect_4"/>
                                                    <label for="effect_4">눈 <img src="./images/create/effect_4.png" alt=""/></label>
                                                </div>
                                                <div className="effect-item effect5">
                                                    <input type="radio" name="effect" id="effect_5"/>
                                                    <label for="effect_4">컨페티 <img src="./images/create/effect_5.png" alt=""/></label>
                                                </div>
                                                <div className="effect-item effect6">
                                                    <input type="radio" name="effect" id="effect_6"/>
                                                    <label for="effect_4">선샤인 <img src="./images/create/effect_6.png" alt=""/></label>
                                                </div>
                                                <div className="effect-item effect7">
                                                    <input type="radio" name="effect" id="effect_7"/>
                                                    <label for="effect_4">하트 <img src="./images/create/effect_7.png" alt=""/></label>
                                                </div>
                                                <div className="effect-item effect8">
                                                    <input type="radio" name="effect" id="effect_8"/>
                                                    <label for="effect_4">별 <img src="./images/create/effect_8.png" alt=""/></label>
                                                </div>
                                                <div className="effect-item effect9">
                                                    <input type="radio" name="effect" id="effect_9"/>
                                                    <label for="effect_4">데이지 <img src="./images/create/effect_9.png" alt=""/></label>
                                                </div>
                                                <div className="effect-item effect9">
                                                    <input type="radio" name="effect" id="effect_9"/>
                                                    <label for="effect_4">선택안함</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">효과 적용 위치</div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="point" id="point_1" checked/>
                                                    <label for="point_1"><i></i>전체</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="point" id="point_2"/>
                                                    <label for="point_2"><i></i>메인에만</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div> */}



                            {/* 목요일 이후 구현 (퍼블리싱, 음원 없음) */}
                            {/* <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input type="checkbox" checked/>
                                    </label>
                                    <strong>배경음악</strong>

                                    <button 
                                        className={`btn-toggle ${categories['bgm'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('bgm')}
                                    >여닫기</button>
                                </div>
                                {categories['bgm'] && (

                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">음악</div>
                                        <div className="option-contents">
                                            <div className="bgm-area">
                                                <div className="bgm-item">
                                                    <span className="radio">
                                                        <input type="radio" name="bgm" id="bgm_1" checked/>
                                                        <label for="bgm_1"><i></i>bgm 1</label>
                                                    </span>
                                                    <div className="bgm-control">
                                                        <button className="bgm-play">재생</button>
                                                        <button className="bgm-pause">멈춤</button>
                                                    </div>
                                                </div>
                                                <div className="bgm-item">
                                                    <span className="radio">
                                                        <input type="radio" name="bgm" id="bgm_2"/>
                                                        <label for="bgm_2"><i></i>bgm 2</label>
                                                    </span>
                                                    <div className="bgm-control">
                                                        <button className="bgm-play">재생</button>
                                                        <button className="bgm-pause">멈춤</button>
                                                    </div>
                                                </div>
                                                <div className="bgm-item">
                                                    <span className="radio">
                                                        <input type="radio" name="bgm" id="bgm_3"/>
                                                        <label for="bgm_3"><i></i>bgm 3</label>
                                                    </span>
                                                    <div className="bgm-control">
                                                        <button className="bgm-play">재생</button>
                                                        <button className="bgm-pause">멈춤</button>
                                                    </div>
                                                </div>
                                                <div className="bgm-item">
                                                    <span className="radio">
                                                        <input type="radio" name="bgm" id="bgm_4"/>
                                                        <label for="bgm_4"><i></i>bgm 4</label>
                                                    </span>
                                                    <div className="bgm-control">
                                                        <button className="bgm-play">재생</button>
                                                        <button className="bgm-pause">멈춤</button>
                                                    </div>
                                                </div>
                                                <div className="bgm-item">
                                                    <span className="radio">
                                                        <input type="radio" name="bgm" id="bgm_5"/>
                                                        <label for="bgm_5"><i></i>bgm 5</label>
                                                    </span>
                                                    <div className="bgm-control">
                                                        <button className="bgm-play">재생</button>
                                                        <button className="bgm-pause">멈춤</button>
                                                    </div>
                                                </div>
                                                <div className="bgm-item">
                                                    <span className="radio">
                                                        <input type="radio" name="bgm" id="bgm_6"/>
                                                        <label for="bgm_6"><i></i>bgm 6</label>
                                                    </span>
                                                    <div className="bgm-control">
                                                        <button className="bgm-play">재생</button>
                                                        <button className="bgm-pause">멈춤</button>
                                                    </div>
                                                </div>
                                                <div className="bgm-item">
                                                    <span className="radio">
                                                        <input type="radio" name="bgm" id="bgm_7"/>
                                                        <label for="bgm_7"><i></i>bgm 7</label>
                                                    </span>
                                                    <div className="bgm-control">
                                                        <button className="bgm-play">재생</button>
                                                        <button className="bgm-pause">멈춤</button>
                                                    </div>
                                                </div>
                                                <div className="bgm-item">
                                                    <span className="radio">
                                                        <input type="radio" name="bgm" id="bgm_8"/>
                                                        <label for="bgm_8"><i></i>bgm 8</label>
                                                    </span>
                                                    <div className="bgm-control">
                                                        <button className="bgm-play">재생</button>
                                                        <button className="bgm-pause">멈춤</button>
                                                    </div>
                                                </div>
                                                <div className="bgm-item">
                                                    <span className="radio">
                                                        <input type="radio" name="bgm" id="bgm_9"/>
                                                        <label for="bgm_9"><i></i>직접추가</label>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-30">
                                                <span className="check">
                                                    <input type="checkbox" id="bgm_autoplay"/>
                                                    <label for="bgm_autoplay"><i></i>자동재생</label>
                                                </span>
                                            </div>
                                            <p className="notice">브라우저 정책에 따라 자동재생기능이 동작하지 않을 수 있습니다.</p>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">음량</div>
                                        <div className="option-contents">
                                            <input type="range"/>
                                            <p className="notice">IOS정책에 따라 아이폰은 음량 제어가 불가능합니다.</p>
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div> */}



                            {/* 목요일 이후 구현 (퍼블리싱, 디자인 없음) */}
                            <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useKakaoShare} 
                                            onChange={(e) => handleChange('useKakaoShare', e.target.checked)}
                                        />
                                    </label>
                                    <strong>카카오톡 공유 스타일 수정</strong>

                                    <button 
                                        className={`btn-toggle ${categories['kakaoShareOption'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('kakaoShareOption')}
                                    >여닫기</button>
                                </div>
                                {categories['kakaoShareOption'] && (

                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">썸네일</div>
                                        <div className="option-contents">
                                        <div className="img-uploader">
                                                <div className="img-upload">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        id="kakaoPhotoInput"
                                                        style={{ display: "none" }}
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                const imageUrl = URL.createObjectURL(file);
                                                                handleChange("kakaoThumbUrl", imageUrl);
                                                                handleFileChange(e, 'kakaoPhoto');
                                                            }
                                                        }}
                                                    />

                                                    <button
                                                        className="img-upload-add"
                                                        onClick={() => document.getElementById('kakaoPhotoInput').click()}
                                                    />
                                                </div>
                                                <div className="img-upload fin">
                                                    <div className="img-upload-thumb">
                                                        <img 
                                                            src={invitationState.kakaoThumbUrl} 
                                                            alt="" 
                                                        />
                                                    </div>
                                                    <button className="img-upload-cancel" onClick={() =>invitationState.kakaoThumbUrl = "" }>삭제</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">제목</div>
                                        <div className="option-contents">
                                            <input
                                                type="text"
                                                className="input-sts"
                                                value={invitationState.kakaoTitle}
                                                onChange={(e) => handleChange("kakaoTitle", e.target.value)} // Update state
                                            />
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">내용</div>
                                        <div className="option-contents">
                                            <input
                                                type="text"
                                                className="input-sts"
                                                value={invitationState.kakaoContent}
                                                onChange={(e) => handleChange("kakaoContent", e.target.value)} // Update state
                                            />
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div> 



                            {/* 목요일 이후 구현 (기획 된 것 없음) */}
                            <div className="category">
                                <div className="category-head">
                                    {/* value=useEnding */}
                                    <label for="" className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useUrlShareStyle} 
                                            onChange={(e) => handleChange('useUrlShareStyle', e.target.checked)}
                                        />
                                    </label>
                                    <strong>URL 공유 스타일 수정</strong>

                                    <button 
                                        className={`btn-toggle ${categories['shareOption'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('shareOption')}
                                    >여닫기</button>


                                </div>
                                {categories['shareOption'] && (

                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">썸네일</div>
                                        <div className="option-contents">
                                            <div className="img-uploader">
                                                <div className="img-upload">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        id="urlPhotoInput"
                                                        style={{ display: "none" }}
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                const imageUrl = URL.createObjectURL(file);
                                                                handleChange("urlImage", imageUrl);
                                                                handleFileChange(e, 'urlPhoto');
                                                            }
                                                        }}
                                                    />

                                                    <button
                                                        className="img-upload-add"
                                                        onClick={() => document.getElementById('urlPhotoInput').click()}
                                                    />
                                                </div>
                                                <div className="img-upload fin">
                                                    <div className="img-upload-thumb">
                                                        <img 
                                                            src={invitationState.urlImage} 
                                                            alt="" 
                                                        />
                                                    </div>
                                                    <button className="img-upload-cancel" onClick={() =>invitationState.urlImage = "" }>삭제</button>
                                                </div>
                                            </div>
                                            <p className="notice">URL 공유 수정 시, 해당 서비스에서 수집한 캐시로 인하여 <span className="red">반영까지 1시간 이상</span> 소요됩니다.</p>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">제목</div>
                                        <div className="option-contents">
                                            <input
                                                type="text"
                                                className="input-sts"
                                                value={invitationState.urlTitle}
                                                onChange={(e) => handleChange("urlTitle", e.target.value)} // Update state
                                            />
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">내용</div>
                                        <div className="option-contents">
                                            <input
                                                type="text"
                                                className="input-sts"
                                                value={invitationState.urlContent}
                                                onChange={(e) => handleChange("urlContent", e.target.value)} // Update state
                                            />
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div>
                                
                            {/* 외부공유 버튼 */}
                            <div className="category">
                                <div className="category-head" >

                                    {/* value=useExternalShare */}
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            checked={invitationState.useExternalShare} 
                                            onChange={(e) => handleChange('useExternalShare', e.target.checked)}
                                        />
                                    </label>
                                    <strong>외부공유 버튼</strong>
                                </div>
                            </div>

                            {/* 목요일 구현 */}
                            {/* <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input type="checkbox" checked/>
                                    </label>
                                    <strong>순서변경</strong>

                                    <button 
                                        className={`btn-toggle ${categories['reorderItems'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('reorderItems')}
                                    >여닫기</button>
                                </div>
                                {categories['reorderItems'] && (

                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">순서변경</div>
                                        <div className="option-contents">
                                            <div className="sort-area">
                                                <div className="sort-item">메인</div>
                                                <div className="sort-item">글귀</div>
                                                <div className="sort-item">인사말</div>
                                                <div className="sort-item">소개</div>
                                                <div className="sort-item">갤러리</div>
                                                <div className="sort-item">영상</div>
                                                <div className="sort-item">웨딩 인터뷰</div>
                                                <div className="sort-item">오시는 길</div>
                                                <div className="sort-item">안내사항</div>
                                                <div className="sort-item">타임라인</div>
                                                <div className="sort-item">안내문</div>
                                                <div className="sort-item">참석여부</div>
                                                <div className="sort-item">계좌번호</div>
                                                <div className="sort-item">방명록</div>
                                                <div className="sort-item">화한 보내기</div>
                                                <div className="sort-item">함께한 시간</div>
                                                <div className="sort-item">엔딩</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input type="checkbox" checked/>
                                    </label>
                                    <strong>혼주명칭 변경</strong>
                                    <button className="btn-toggle">여닫기</button>
                                </div>
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">신랑 아버지</div>
                                        <div className="option-contents">
                                            <input type="text" className="input-sts" placeholder="아버지"/>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">신랑 어머니</div>
                                        <div className="option-contents">
                                            <input type="text" className="input-sts" placeholder="어머니"/>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">신부 아버지</div>
                                        <div className="option-contents">
                                            <input type="text" className="input-sts" placeholder="아버지"/>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">신부 어머니</div>
                                        <div className="option-contents">
                                            <input type="text" className="input-sts" placeholder="어머니"/>
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div> */}



                            {/* 목요일 이후 구현 (기획 없음) */}
                            {/* <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input type="checkbox" checked/>
                                    </label>
                                    <strong>부가기능</strong>

                                    <button 
                                        className={`btn-toggle ${categories['additionalFeatures'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('additionalFeatures')}
                                    >여닫기</button>
                                </div>
                                {categories['additionalFeatures'] && (

                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">카카오톡 공유</div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="etc_1" id="etc_1_1" checked/>
                                                    <label for="etc_1_1"><i></i>사용</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="etc_1" id="etc_1_2"/>
                                                    <label for="etc_1_2"><i></i>미사용</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">
                                            상단메뉴바
                                        </div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="etc_2" id="etc_2_1" checked/>
                                                    <label for="etc_2_1"><i></i>사용</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="etc_2" id="etc_2_2"/>
                                                    <label for="etc_2_2"><i></i>미사용</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">
                                            스크롤바 효과
                                        </div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="etc_3" id="etc_3_1" checked/>
                                                    <label for="etc_3_1"><i></i>사용</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="etc_3" id="etc_3_2"/>
                                                    <label for="etc_3_2"><i></i>미사용</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">
                                            청첩장 확대
                                        </div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="etc_4" id="etc_4_1"/>
                                                    <label for="etc_4_1"><i></i>사용</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="etc_4" id="etc_4_2" checked/>
                                                    <label for="etc_4_2"><i></i>미사용</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">
                                            신랑신부 순서
                                        </div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="etc_5" id="etc_5_1" checked/>
                                                    <label for="etc_5_1"><i></i>신랑 먼저</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="etc_5" id="etc_5_2"/>
                                                    <label for="etc_5_2"><i></i>신부 먼저</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">
                                            고인 표시 방법
                                        </div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="etc_6" id="etc_6_1" checked/>
                                                    <label for="etc_6_1"><i></i>국화꽃</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="etc_6" id="etc_6_2"/>
                                                    <label for="etc_6_2"><i></i>한자</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                )}
                            </div> */}

                            
                            
                            {/* <button className="btn-save" onClick={onClickSaveFiles}>저장</button> */}
                            <FormDialog onSave={handleDialogSave} />
                            <button className="btn-save" onClick={handleOpenDialog}>저장</button>
                            <PositionedSnackbar
                                    message={errorMessage}
                                    onClose={() => setErrorMessage("")}
                                  />
                        </div>



                </div>
            </div>
        </div>

        <div className="create-btn">
            
            {/* <div className="preview-tooltip">실시간으로 확인해보세요! <button className="preview-tooltip-close">닫기</button></div> */}
            <button className="btn-save" onClick={handleOpenDialog}>저장</button>
            <button className="btn-preview" onClick={() => setIsPreviewOpen(!isPreviewOpen)}>
                {isPreviewOpen ? '돌아가기' : '미리보기'}
            </button>
            {/* <button className="btn-preview" onClick={() => setIsPreviewOpen(false)}>돌아가기</button> */}


            
            
            
        </div>

        {/* <div className="create-preview2"> */}
        <div className={`create-preview2 ${isPreviewOpen ? ' active' : ''}`}>
            <div className="frame-wrap" style={{marginTop:"2vh"}}  >
                {isLoading && !isAnimationFinished && !isPopupVisible && (
                    <div className="frame" id="popup" >
                            <div className="loading-screen">
                                {/* <HandwritingTitle />
                                <span id="text"></span><span id="cursor"></span> */}
                                
                                💍 청첩장 로딩 중이에요...
                                {/* <Test1 />11 */}
                                
                            </div>

                        
                    </div>
                )}
                
                {!isLoading && isAnimationFinished || isPopupVisible && (
                <div className="frame" id="popup">
                    <section className="calendar">
                        <div style={{width:"100%", justifyContent: "space-between", paddingBottom: "10px", marginTop:"-30px", borderBottom: "1px solid #c7c7c7"}}>
                            <div onClick={closeContactModal} style={{float:"right", marginRight:"10px", background: "none", cursor: "pointer"}}>✕</div>
                            <p className="info" style={{marginLeft:"30px"}}>혼주에게 연락하기</p> 
                        </div>
                        <div className="profile-wrap" style={{marginTop:"40px"}}>
                            <div className="item">
                                <div className="thumb" style={{backgroundColor: "#ffffff"}}>
                                    <p className="t1"
                                        style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"3px", position:"relative"}}
                                    >
                                        <span className="blue">신랑측</span>
                                    </p>

                                    {invitationState.broomFatherPhone && (
                                    <div style={{marginTop:"30px", marginBottom:"30px"}}>
                                        <p className="t2" >
                                            아버지 {invitationState.groomFatherFirstName}{invitationState.groomFatherLastName}
                                        </p>
                                        <p className="t3" style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"15px", position:"relative"}}>

                                            <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                                onClick={() => onClickPhoneCall(invitationState.broomFatherPhone)}>
                                                <CallIcon />
                                            </div>
                                            <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                                onClick={() => onClickSendSMS(invitationState.broomFatherPhone)}>
                                                <SmsIcon />
                                            </div>
                                        </p>
                                    </div>
                                    )}
                                    
                                    {invitationState.broomMotherPhone && (
                                    <div style={{marginTop:"30px", marginBottom:"30px"}}>
                                        <p className="t2">
                                            어머니 {invitationState.groomMotherFirstName}{invitationState.groomMotherLastName}
                                        </p>
                                        <p className="t3" style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"15px", position:"relative"}}>

                                            <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                                onClick={() => onClickPhoneCall(invitationState.broomMotherPhone)}>
                                                    <CallIcon />
                                            </div>
                                            <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                                onClick={() => onClickSendSMS(invitationState.broomMotherPhone)}>
                                                <SmsIcon />
                                            </div>
                                        </p>
                                    </div>
                                    )}

                                </div>
                            </div>
                            <div className="item">
                                <div className="thumb" style={{backgroundColor: "#ffffff"}}>
                                    <p className="t1"
                                        style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"3px", position:"relative"}}
                                    >
                                        <span className="pink">신부측</span>
                                    </p>

                                    {invitationState.brideFatherPhone && (
                                    <div style={{marginTop:"30px", marginBottom:"30px"}}>
                                        <p className="t2" >
                                            아버지 {invitationState.brideFatherFirstName}{invitationState.brideFatherLastName}
                                        </p>
                                        <p className="t3" style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"15px", position:"relative"}}>

                                            <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                                onClick={() => onClickPhoneCall(invitationState.brideFatherPhone)}>
                                                    <CallIcon />
                                            </div>
                                            <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                                onClick={() => onClickSendSMS(invitationState.brideFatherPhone)}>
                                                <SmsIcon />
                                            </div>
                                        </p>
                                    </div>
                                    )}

                                    {invitationState.brideMotherPhone && (
                                    <div style={{marginTop:"30px", marginBottom:"30px"}}>
                                        <p className="t2">
                                            어머니 {invitationState.brideMotherFirstName}{invitationState.brideMotherLastName}
                                        </p>
                                        <p className="t3" style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"15px", position:"relative"}}>

                                            <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                                onClick={() => onClickPhoneCall(invitationState.brideMotherPhone)}>
                                                    <CallIcon />
                                            </div>
                                            <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                                onClick={() => onClickSendSMS(invitationState.brideMotherPhone)}>
                                                <SmsIcon />
                                            </div>
                                        </p>
                                    </div>
                                    )}

                                </div>
                            </div>
                        </div>

                        <br/>
                        
                    </section>
                </div>
                )}

                {isGuestbookOpen && (
                    <div className="frame" id="popup" >
                        <div className={`modal-overlay ${isGuestbookOpen ? 'active' : ''}`}>
                            <div className="guestbook-modal">
                            <div className="guestbook-header">
                                <h2>방명록 작성</h2>
                                <button className="close-btn" onClick={closeGuestbookModal}>✕</button>
                            </div>

                            <div className="guestbook-body">
                                <label htmlFor="name">성함</label>
                                <input type="text" id="name" placeholder="" />

                                <label htmlFor="message">내용</label>
                                <textarea id="message" rows="5" placeholder=""></textarea>

                                <label htmlFor="password">비밀번호</label>
                                <input type="password" id="password" placeholder="비밀번호 입력 (수정·삭제 시 필요)" />

                                <button className="submit-btn">작성</button>
                            </div>
                            </div>
                        </div>
                    </div>
                
                )}

                {selectedIndex && (
                        <div className={`modal-overlay ${selectedIndex ? 'active' : ''}`}>
                            <div className="gallery-modal" style={{width:"100%", height:"100%"}}>
                            <div className="gallery-header">
                                <button className="close-btn" onClick={closeSlider}>✕</button>
                            </div>
                            <div className="gallery-body">

                                <GallerySlider 
                                    images={previewGallery} 
                                    showProgressBar={invitationState.galleryProgressBarVisible}
                                    className=""
                                />    
                            </div>
                            

                            </div>
                        </div>
                
                )}

                {!isLoading && isAnimationFinished || !isPopupVisible && (
                <div className="frame">

                    {/* 메인*/}
                    <section className="main">
                        {/* <img className="bg" src={bgimg} alt="bg"/> */}
                        <img className="bg" src={backgroundImage} alt="bg" />
                        <div className="cts">
                            <strong
                                className="lettering type1"
                                style={{
                                    color: color1,
                                    top: letteringTop.type1, // 동적 스타일 적용
                                    display: invitationState.letteringMsg === 'type1' ? 'block' : 'none',
                                }}
                                >
                                our<br />wedding<br />day
                            </strong>
                            <strong
                                className="lettering type2"
                                style={{
                                    color: color1,
                                    top: letteringTop.type2, // 동적 스타일 적용
                                    display: invitationState.letteringMsg === "type2" ? 'block' : 'none',
                                }}
                                >
                                We're getting<br />married!
                            </strong>
                            <strong
                                className="lettering type3"
                                style={{
                                    color: color1,
                                    top: letteringTop.type3, // 동적 스타일 적용
                                    display: invitationState.letteringMsg === 'type3' ? 'block' : 'none',
                                }}
                                >
                                Just married
                            </strong>
                            <strong
                                className="lettering type4"
                                style={{
                                    color: color1,
                                    top: letteringTop.type4, // 동적 스타일 적용
                                    display: invitationState.letteringMsg === 'type4' ? 'block' : 'none',
                                }}
                                >
                                With love,<br /> always
                            </strong>
                            <strong
                                className="lettering type5"
                                style={{
                                    color: color1,
                                    top: letteringTop.type5, // 동적 스타일 적용
                                    display: invitationState.letteringMsg === 'type5' ? 'block' : 'none',
                                }}
                                >
                                Happy <br />wedding<br /> day
                            </strong>

                            <strong
                                className="lettering type6"
                                style={{
                                    color: color1,
                                    top: letteringTop.type6, // 동적 스타일 적용
                                    display: invitationState.letteringMsg === 'type6' ? 'block' : 'none',
                                }}
                                >
                                Our first page
                            </strong>
                            <strong
                                className="lettering type7"
                                style={{
                                    color: color1,
                                    top: letteringTop.type7, // 동적 스타일 적용
                                    display: invitationState.letteringMsg === 'type7' ? 'block' : 'none',
                                }}
                                >
                                Happily ever after
                            </strong>


                            <p
                                className="text"
                                style={{
                                    color : color2,
                                    top: maintxtHg,
                                    fontFamily: "Nanum Myeongjo",
                                    wordWrap: "break-word", // 긴 단어를 자동으로 줄바꿈
                                    overflowWrap: "break-word", // 긴 단어가 깨지도록 줄바꿈
                                    whiteSpace: "normal", // 일반 줄바꿈 허용
                                }}
                                >
                                {invitationState.mainTxt || ""}
                            </p>

                    </div>
                    </section>

                    {/* 메인 하단 예식 정보 */}
                    {invitationState.mainWddInfoOnoff ? (
                    <section className="calendar" style={{textAlign: "center"}}>
                        <div style={{width:"300px", borderTop:"2px solid #c7c7c7",  borderBottom:"2px solid #c7c7c7", margin:"0 auto 20px", paddingTop:"20px", paddingBottom:"20px"}}>
                            <p className="info">{parseInt(invitationState.weddingDate.split("-")[0], 10)}년&nbsp;
                                                {parseInt(invitationState.weddingDate.split("-")[1], 10)}월&nbsp;
                                                {parseInt(invitationState.weddingDate.split("-")[2])}일&nbsp;
                                                {/* {}요일 오후 {}시 */}
                                                {getKoreanDateInfo(invitationState.weddingDate)}<br/>
                                                {invitationState.weddingHallName || "예식장"}&nbsp;
                            </p>
                        </div>
                    </section>
                    ) : null}

                    {/* 글귀 */}
                    {invitationState.usePhrases ? (
                    <section className="calendar">
                        <div style={{margin:"10px"}}>
                            <span
                            className="infoP"
                            dangerouslySetInnerHTML={{ __html: invitationState.phrases }}
                            ></span>
                        </div>
                        
                    </section>
                    ) : null}


                    {/* 인사말 */}
                    {invitationState.useSalutations ? (
                    <section className="calendar">
                        <strong className="title">
                        {/* <strong className="title" data-aos="fade-up" data-aos-duration="100"> */}
                        {invitationState.salutationsTitle || "소중한 분들을 초대합니다."}</strong>
                        <div style={{margin:"10px"}}>
                            <span
                            className="infoP"
                            dangerouslySetInnerHTML={{ __html: invitationState.salutations }}
                            ></span>
                        </div>
                        <img 
                            src={invitationState.salutPhotoUrl || ""} 
                            alt="인사말" 
                            style={{
                                visibility: invitationState.salutPhotoUrl ? "visible" : "hidden",
                                
                            }}
                        />
                    </section>
                    ) : null}

                    {/* 프로필형 */}
                    {/* useProfile 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                    {invitationState.useProfile && (
                    <section className="profile"> 
                        <div className="profile-wrap">
                        {/* <div className="profile-wrap" data-aos="fade-up" data-aos-duration="100"> */}
                            <div className="item">
                                <div className="thumb">
                                    <img 
                                        src={invitationState.groomPhotoUrl || ""} 
                                        alt="신랑이미지" 
                                        style={{
                                            visibility: invitationState.groomPhotoUrl ? "visible" : "hidden",
                                        }}
                                    />
                                </div>
                                
                                <p className="t1"
                                    style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"3px", position:"relative"}}
                                >
                                    <span className="blue">신랑</span>
                                    
                                <strong>
                                    {invitationState.groomFirstName}{invitationState.groomLastName}
                                </strong>
                                {invitationState.groomPhoneNumber && (
                                            <div style={{marginLeft:"2px"}}
                                            onClick={() => onClickPhoneCall(invitationState.groomPhoneNumber)}>
                                                <CallIcon />
                                            </div>
                                    )}
                                
                                </p>
                                <p className="t2">{invitationState.groomIntroduction}</p>
                                {/* <p className="t3"><span>신랑 아버지</span>의 {invitationState.groomRelationship}</p> */}

                                    <p className="t3">
                                        <span style={{marginRight:"0px"}}>

                                            {/* 고인표시 */}
                                            {invitationState.groomFatherDeceased ? (
                                                <span>故</span> 
                                            ) : null}
                                            {invitationState.groomFatherFirstName}{invitationState.groomFatherLastName}
                                            
                                            {invitationState.groomFatherFirstName && (
                                                <span style={{marginRight:"-1px"}}>•</span> 
                                            )}

                                            {/* 고인표시 */}
                                            {invitationState.groomMotherDeceased ? (
                                                <span>故</span> 
                                            ) : null}
                                            {invitationState.groomMotherFirstName}{invitationState.groomMotherLastName}
                                            
                                        </span>
                                        {invitationState.groomFatherFirstName&&(<>의</> )} {invitationState.groomRelationship}
                                    </p>
                                
                            </div>
                            <div className="item">
                                <div className="thumb">
                                    <img 
                                        src={invitationState.bridePhotoUrl || ""} 
                                        alt="신부이미지" 
                                        style={{
                                            visibility: invitationState.groomPhotoUrl ? "visible" : "hidden",
                                        }}
                                    />

                                </div>
                                <p className="t1"
                                    style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"3px", position:"relative"}}
                                >
                                    
                                    <span className="pink">신부</span>
                                <strong>
                                    {invitationState.brideFirstName}{invitationState.brideLastName}
                                </strong>
                                {invitationState.bridePhoneNumber && (
                                        <div style={{marginLeft:"2px"}}
                                        onClick={() => onClickPhoneCall(invitationState.bridePhoneNumber)}>
                                            <CallIcon />
                                        </div>
                                )}
                                            
                                
                                </p>
                                <p className="t2">{invitationState.brideIntroduction}</p>
                                    <p className="t3" >
                                        <span style={{marginRight:"0px"}}>
                                            {/* 고인표시 */}
                                            {invitationState.brideFatherDeceased ? (
                                                <span>故</span> 
                                            ) : null}
                                            {invitationState.brideFatherFirstName}{invitationState.brideFatherLastName}
                                            
                                            {invitationState.brideFatherFirstName && (
                                                <span style={{marginRight:"-1px"}}>•</span> 
                                            )}
                                            
                                            {/* 고인표시 */}
                                            {invitationState.brideMotherDeceased ? (
                                                <span>故</span> 
                                            ) : null}
                                            {invitationState.brideMotherFirstName}{invitationState.brideMotherLastName}
                                            
                                        </span>
                                        {invitationState.brideFatherFirstName&&(<>의</> )} {invitationState.brideRelationship}
                                        
                                    </p>
                            </div>
                        </div>
                        {/* 목요일 이후 / 팝업 디자인 및 퍼블리싱 없음  故人*/}
                        {invitationState.useParentsContactInfo && (
                        <button className="btn" onClick={openContactModal}>혼주에게 연락하기</button>
                        )}
                        {/* <ContactParentsModal open={isContactModalOpen} onClose={closeContactModal} /> */}

                    </section>
                    )}
                    
                    {/* 메인하단예식정보 */}
                    {invitationState.weddingHallName && (
                    <section className='calendar'>
                        <p className="info">{parseInt(invitationState.weddingDate.split("-")[0], 10)}년&nbsp;
                                            {parseInt(invitationState.weddingDate.split("-")[1], 10)}월&nbsp;
                                            {parseInt(invitationState.weddingDate.split("-")[2])}일&nbsp;
                                            {/* {}요일 오후 {}시 */}
                                            {getKoreanDateInfo(invitationState.weddingDate)}<br/>
                                            {invitationState.weddingHallName || ""}&nbsp;
                                            {invitationState.weddingHallFloorAndRoom || ""}<br/>
                                            <p 
                                            style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"5px", position:"relative"}}
                                            >
                                                {invitationState.weddingHallAddress || ""}
                                                {invitationState.weddingHallPhoneNumber && (
                                                    <strong onClick={() => onClickPhoneCall(invitationState.weddingHallPhoneNumber)}>
                                                        <CallIcon />
                                                    </strong>
                                                )}
                                            </p>
                        </p>

                    </section>
                    )}

                    {/* useCalendar 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                    {invitationState.useCalendar && (
                    <section className="calendar">
                        
                        <strong className="title">{invitationState.calendarTitle || "예식 안내"}</strong>
                        

                        {invitationState.calendarImage && (
                            <img
                                className="bg"
                                src={invitationState.calendarImage}
                                alt="calbg"
                                style={{ borderRadius: "60px", padding: "30px"}}
                            />  
                        )}


                        <div className="month">
                        {/* <div className="month" data-aos="fade-up" data-aos-duration="100"> */}
                            <span className="month-title">{parseInt(invitationState.weddingDate.split("-")[1], 10)}월</span>
                            <table>
                                <thead>
                                    <tr>
                                        <th className="holiday">일</th>
                                        <th>월</th>
                                        <th>화</th>
                                        <th>수</th>
                                        <th>목</th>
                                        <th>금</th>
                                        <th>토</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map(
                                    (_, weekIndex) => (
                                        <tr key={weekIndex}>
                                        {calendarDays
                                            .slice(weekIndex * 7, weekIndex * 7 + 7)
                                            .map((day, index) => (
                                            <td
                                                key={index}
                                                className={day ? (day === parseInt(invitationState.weddingDate.split("-")[2]) ? "target" : "") : ""}
                                            >
                                                {day && <span>{day}</span>}
                                            </td>
                                            ))}
                                        </tr>
                                    )
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {invitationState.useDday ? (
                        <div
                            className={`d-day ${invitationState.useDday ? '' : 'hidden'}`}
                            style={{ display: invitationState.useDday ? 'block' : 'none' }}
                        >
                            <p className="point">
                            {/* <p className="point" data-aos="fade-up" data-aos-duration="100"> */}
                                <span>{invitationState.groomLastName || "신랑"}</span>♥
                                <span>{invitationState.brideLastName || "신부"}</span> 결혼식까지
                            </p>
                            <ul className="timer">
                            {/* <ul className="timer" data-aos="fade-up" data-aos-duration="100"> */}
                                <li><span>{timeLeft.days}</span>Days</li>
                                <li><span>{timeLeft.hours}</span>Hours</li>
                                <li><span>{timeLeft.minutes}</span>Minutes</li>
                                <li><span>{timeLeft.seconds}</span>Seconds</li>
                            </ul>
                        </div>
                        ) : null}
                    </section>
                    )}



                    {/* useVideo 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                    {/* 식전영상상 */}
                    {invitationState.useVideo && (
                    <section className="gallery">
                        <strong className="title">
                        {/* <strong className="title" data-aos="fade-up" data-aos-duration="100"> */}
                        {invitationState.videoTitle || "식전 영상"}</strong>
                                <iframe 
                                width="361"
                                height="280" 
                                src={invitationState.videoUrl}
                                frameborder="0" 
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                            ></iframe>
                    </section>
                    )}

                    {/* [타임라인] useLoading 값의 true/false에 따라 이 섹션 활성화/비활성화 */}
                    {invitationState.useTimeLine && (
                    <section className="timeline">
                        <div className='title-wrap'>
                            <h2 className='timeline-title'>{invitationState.timeLineTitle}</h2>
                        </div>
                        
                        {tlList &&
                        tlList.map((list, index) => (
                            <div className={`item ${index % 2 === 0 ? 'row' : 'row-reverse'}`} key={index}>
                            <div className="left">
                                {list.imgUrl && (
                                // <img className="bg" src={list.imgUrl} alt="tl" />
                                <img
                                className={invitationState.timeLineType === 'timeline1_2' ? 'bg-rectangle' : 'bg'}
                                src={list.imgUrl}
                                alt="tl"
                                />
                                )}
                                <span className="year">{list.date}</span>
                            </div>

                            <div className="center-line"></div>

                            <div className="right">
                                <strong className="title">{list.title || ""}</strong>
                                <span className="content">{list.content}</span>
                            </div>
                            </div>
                        ))}
                    </section>
                    )}

                    {/* [갤러리]useGallery 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                    {invitationState.useGallery && (
                    <section className="gallery">
                        <strong className="title">
                            {invitationState.galleryTitle || "갤러리"}
                        </strong>
                        {/* 그리드 */}
                        {invitationState.galleryType === "grid" && (
                            <div className="gallery-list">
                            {previewGallery &&
                                previewGallery.map((image, index) => (
                                    <div className="gallery-item" key={index} onClick={handleCircleImageClick}>
                                        <img src={image.previewUrl} alt={`gallery-${index}`} />
                                    </div>
                                ))
                            }
                            </div>
                        )}    
                        {/* 서클 */}
                        {invitationState.galleryType === "circle" && (
                            <CircleGallery 
                                images={previewGallery} 
                                showProgressBar={invitationState.galleryProgressBarVisible}
                                onImageClick={handleCircleImageClick}
                            />    
                        )}
                            
                        {/* 슬라이드 */}
                        {invitationState.galleryType === "slide" && (
                            <GallerySlider images={previewGallery} showProgressBar={invitationState.galleryProgressBarVisible}/>    
                        )}


                        {/* 그리드형 서클형 슬라이더 */}
                        {selectedIndex !== null && (
                            <GallerySlider images={previewGallery} showProgressBar={invitationState.galleryProgressBarVisible}/>    
                        )}
                        
                    </section>
                    )}

                    {/* 웨딩 인터뷰 useInterview 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                    {invitationState.useInterview && (
                    <section className="transportion">
                        <strong className="title" style={{textAlign:"center"}}>웨딩 인터뷰</strong>
                    {interviewList &&
                        interviewList.map((list, index) => (
                            <div key={index}>
                                <span className="title" style={{fontSize:"14px"}}>{list.question}</span>
                                <p className="text" style={{fontSize:"14px"}}>{list.answer}</p> 
                            </div>
                    ))}
                    </section>
                    )}



                    {/*[안내문] useNotice 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                    {invitationState.useNotice && (
                    <section className="infomation">
                        <div className="infomation-box">
                        {/* <div className="infomation-box" data-aos="fade-up" data-aos-duration="100"> */}
                            <strong className="title">{invitationState.noticeTitle || "안내문"}</strong>
                            <p>
                                {invitationState.noticeContent}
                            </p>
                            {/* 목요일 구현  */}
                            {/* <a href="#" className="btn">버튼</a> */}
                        </div>
                    </section>
                    )}

                    {/* [화환] useFlower 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                    {invitationState.useFlower && (
                    <section className="flower">
                        <div className="flower-box" onClick={onClickFlower}>
                        {/* <div className="flower-box" data-aos="fade-up" data-aos-duration="100"> */}
                            <img src={flower} alt="화환"/>
                            <div className="text">
                                <strong className="title">축하 화환 보내기</strong>
                                <p>축하의 마음을 담아 전해보세요.</p>
                            </div>
                        </div>
                    </section>
                    )}


                    

                    {/* useFirstMeetTime 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                    {invitationState.useFirstMeetTime && (
                    <section className="our-time">
                        <strong className="title">함께한 시간</strong>
                        {/* <span className="title" data-aos="fade-up" data-aos-duration="100">함께한 시간</span> */}
                        {/* <p className="timer" data-aos="fade-up" data-aos-duration="1000">“25년 1개월 17시간 42분 7초”</p> */}
                        <p className="timer">
                        {/* <p className="timer" data-aos="fade-up" data-aos-duration="100"> */}
                            {elapsedTime}</p>
                    </section>
                    )}




                    {/* useDirections 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                    {invitationState.useMap && (
                    <section className="directions">
                        <strong className="title">
                        {/* <strong className="title" data-aos="fade-up" data-aos-duration="100"> */}
                            오시는 길</strong>
                        <div className="info">
                        {/* <div className="info" data-aos="fade-up" data-aos-duration="100"> */}
                            <strong className="name">
                                {invitationState.weddingHallName || "예식장 이름"}
                                {/* <a href="#" className="call"></a> */}
                            </strong>
                            <p className="place">{invitationState.weddingHallFloorAndRoom || "OOO홀"}</p>
                            <p className="address">{ invitationState.weddingHallAddress||"경기 성남시 분당구 판교역로 4"}</p>
                            
                            <div className="map">
                                {/* <div
                                    id="map"
                                    style={{ width: "100%", height: `${invitationState.mapHeight}`}}
                                ></div> */}
                                <MapComponent mapId="map2" address={invitationState.weddingHallAddress} mapHeight={invitationState.mapHeight} />
                                {invitationState.navigationRemove && (
                                    <div className="map-btns">
                                        {/* 티맵 */}
                                        <a 
                                            href={`tmap://search?name=${encodeURIComponent(invitationState.weddingHallAddress)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="map-btn"
                                        >
                                            <img src={map_t} alt=""/>
                                            티맵
                                        </a>
                                        
                                        {/* 카카오 내비 */}
                                        <a 
                                            href={`kakaonavi://search?q=${encodeURIComponent(invitationState.weddingHallAddress)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="map-btn"
                                        >
                                            <img src={map_kakao} alt=""/>
                                            카카오 내비
                                        </a>
                                        
                                        {/* 네이버 지도 */}
                                        <a 
                                            href={`nmap://search?query=${encodeURIComponent(invitationState.weddingHallAddress)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="map-btn"
                                        >
                                            <img src={map_naver} alt=""/>
                                            네이버 지도
                                        </a>
                                    </div>
                                )}
                                
                            </div>
                            {/* <div className="map-btns">
                                <a href="#" className="map-btn"><img src={map_t} alt=""/>티맵</a>
                                <a href="#" className="map-btn"><img src={map_kakao} alt=""/>카카오 내비</a>
                                <a href="#" className="map-btn"><img src={map_naver} alt=""/>네이버 지도</a>
                            </div> */}
                            
                        </div>
                    </section>
                    )}

                    {/* useTransportation 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                    {invitationState.useTransportation && (
                    <section className="transportion">
                    {transportationList &&
                        transportationList.map((list, index) => (
                            <div key={index}>
                                {/* <span className="title" data-aos="fade-up" data-aos-duration="1000">{list.method}</span>
                                <p className="text" data-aos="fade-up" data-aos-duration="1000">{list.details}</p> */}
                                <span className="title" >{list.method}</span>
                                <p className="text" >{list.details}</p> 
                            </div>
                    ))}
                    </section>
                    )}

                    {/* [계좌번호] useAcnt 값의 true/false에 따라 이 섹션 활성화/비활성화 */}
                    {invitationState.useAcnt && (
                    <section className="calendar">
                        <div >
                            <span className="title" >{invitationState.acntTitle}</span>
                            <div style={{margin:"10px"}}>
                                <span
                                    className="infoP"
                                    dangerouslySetInnerHTML={{ __html: invitationState.acntContent}}
                                ></span>
                            </div>
                            
                        </div>
                            {invitationState.brmAcnt && (
                                <div className="item" style={{border: "1px solid #c2c0c0", margin:"10px", padding:"10px"}}>
                                    <div className="blue-acnt" style={{borderBottom:"1px solid #c2c0c0", paddingBottom:"2px"}}>신랑</div>
                                    <div className="font-acnt">
                                        <span>{invitationState.brmNm}</span>
                                    </div>
                                    <div className="font-acnt">
                                        <span>{invitationState.brmBank}&nbsp;</span>
                                        <span>{invitationState.brmAcnt}</span>
                                    </div>
                                </div>
                            )}
                            {invitationState.brdAcnt && (
                                <div className="item" style={{border: "1px solid #c2c0c0", margin:"10px", padding:"10px"}}>
                                    <div className="pink-acnt" style={{borderBottom:"1px solid #c2c0c0", paddingBottom:"2px"}}>신부</div>
                                    <div className="font-acnt">
                                        <span>{invitationState.brdNm}</span>
                                    </div>
                                    <div className="font-acnt">
                                        <span>{invitationState.brdBank}&nbsp;</span>
                                        <span>{invitationState.brdAcnt}</span>
                                    </div>
                                </div>
                            )}
                            {invitationState.brmfAcnt && (
                                <div className="item" style={{border: "1px solid #c2c0c0", margin:"10px", padding:"10px"}}>
                                    <div className="blue-acnt" style={{borderBottom:"1px solid #c2c0c0", paddingBottom:"2px"}}>신랑 아버지</div>
                                    <div className="font-acnt">
                                        <span>{invitationState.brmfNm}</span>
                                    </div>
                                    <div className="font-acnt">
                                        <span>{invitationState.brmfBank}&nbsp;</span>
                                        <span>{invitationState.brmfAcnt}</span>
                                    </div>
                                </div>
                            )}
                            {invitationState.brmmAcnt && (
                                <div className="item" style={{border: "1px solid #c2c0c0", margin:"10px", padding:"10px"}}>
                                    <div className="blue-acnt" style={{borderBottom:"1px solid #c2c0c0", paddingBottom:"2px"}}>신랑 어머니</div>
                                    <div className="font-acnt">
                                        <span>{invitationState.brmmNm}</span>
                                    </div>
                                    <div className="font-acnt">
                                        <span>{invitationState.brmmBank}&nbsp;</span>
                                        <span>{invitationState.brmmAcnt}</span>
                                    </div>
                                </div>
                            )}
                            {invitationState.brdfAcnt && (
                                <div className="item" style={{border: "1px solid #c2c0c0", margin:"10px", padding:"10px"}}>
                                    <div className="pink-acnt" style={{borderBottom:"1px solid #c2c0c0", paddingBottom:"2px"}}>신부 아버지</div>
                                    <div className="font-acnt">
                                        <span>{invitationState.brdfNm}</span>
                                    </div>
                                    <div className="font-acnt">
                                        <span>{invitationState.brdfBank}&nbsp;</span>
                                        <span>{invitationState.brdfAcnt}</span>
                                    </div>
                                </div>
                            )}
                            {invitationState.brdmAcnt && (
                                <div className="item" style={{border: "1px solid #c2c0c0", margin:"10px", padding:"10px"}}>
                                    <div className="pink-acnt" style={{borderBottom:"1px solid #c2c0c0", paddingBottom:"2px"}}>신부 어머니</div>
                                    <div className="font-acnt">
                                        <span>{invitationState.brdmNm}</span>
                                    </div>
                                    <div className="font-acnt">
                                        <span>{invitationState.brdmBank}&nbsp;</span>
                                        <span>{invitationState.brdmAcnt}</span>
                                    </div>
                                </div>
                            )}
                            
                            
                        
                    </section>
                    )}

                    {/* [방명록]  */}
                    {invitationState.useGuestbook && (
                    <section className="guestbook">
                        <div className="guestbook-empty">
                            <h2 className="guestbook-title">방명록</h2>
                            <p className="guestbook-message">
                            아직 작성된 방명록이 없습니다.<br />
                            첫 방명록을 작성해주세요.
                            </p>
                            <div className="guestbook-buttons">
                                <button className="btn-outline">전체보기</button>
                                <button className="btn-primary" onClick={openGuestbookModal}>작성</button>
                            </div>
                        </div>
                    </section>
                        
                    )}

                    {/* [안내사항] useInfo 값의 true/false에 따라 이 섹션 활성화/비활성화 */}
                    {invitationState.useInfo && (
                    <section className="calendar">
                    {infoList &&
                        infoList.map((list, index) => (
                            <div key={index} style={{marginTop:"30px"}} >
                                <strong className="title">{list.title || ""}</strong>
                                {list.imgUrl && (
                                    <img
                                    className="bg"
                                    src={list.imgUrl }
                                    alt="test"
                                    style={{ borderRadius: "60px", padding: "30px"}}
                                    /> 
                                )}
                                    
                                <span className="info">{list.content}</span>
                                {list.useBtn && (
                                    <p className="text" >{list.btnTxt}</p> 
                                )}
                            </div>
                    ))}
                    </section>
                    )}



                    {/* useEnding 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                    {invitationState.useEnding && (
                    <section className="land">
                        {/* <section className="land" data-aos="fade-up" data-aos-duration="100"> */}
                        <img className="bg" src={invitationState.endingImage ||bgimg} alt="bg" />
                        {/* <p className="text">
                            {invitationState.endingContent}
                        </p> */}
                        
                        <p
                            className="text"
                            style={{
                                // color : color2,
                                top: endingHg,
                                wordWrap: "break-word", // 긴 단어를 자동으로 줄바꿈
                                overflowWrap: "break-word", // 긴 단어가 깨지도록 줄바꿈
                                whiteSpace: "normal", // 일반 줄바꿈 허용
                            }}
                            >
                            {invitationState.endingContent}
                        </p>
                    </section>
                    )}

                </div>

                )}
                {/* <!-- // 2024-11-13 미리보기 영역 --> */}











            </div>
            {/* <div className="preview-focus">
                <label for="" className="switch">
                    <input type="checkbox" checked />
                </label>
                <strong>자동 포커스</strong>
                <span>(사용하시면 제작하실때 편리합니다.)</span>
            </div> */}

        </div>
                            
        
    </div>
  )
}

export default Create;
