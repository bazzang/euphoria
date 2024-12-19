import React, { useState, useEffect } from 'react';
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
import callIcon from '../images/create/call.png'; 

function Create() {
    const navigate = useNavigate(); 
    const { invitationState, setInvitationState } = useInvitation();


    useEffect(() => {
    //    console.log('Current state:', invitationState); // 초기 상태 확인
    }, [invitationState]);

    const handleChange = (key, value) => {
        
        setInvitationState((prev) => ({
          ...prev,
          [key]: value,
        }));

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

    ///////////////////////////////teststart///////////////////////////////
    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');
    const [val3, setVal3] = useState('');
    const [val4, setVal4] = useState('');
    const [val5, setVal5] = useState('');
    const [val6, setVal6] = useState('');
    const [val7, setVal7] = useState('');

    const handleSelectChange = (e) => {
        setVal1(e.target.value); // 선택한 옵션 값을 상태에 저장
        
    };


    const handleTextChange = (e) => {
        setVal3(e.target.value); // 메인텍스트입력
    };
    ////////////////////////////////testend//////////////////////////////

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

    // *********************************[지도] 지도 api  ******************************************

    // -------------------------------------------------------------------------------------------------

    useEffect(() => {
        
    }, []); 
    

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
      
        // 최종 문자열 생성
        return `${dayOfWeek}  ${period}  ${twelveHourFormat}시  ${minutes}분`;

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
        console.log('갤러리 업로드 이미지11');
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({
            file: file, // 원본 파일 저장
            previewUrl: URL.createObjectURL(file), // 미리보기 URL 생성
        }));

        setPreviewGallery(newImages);
    
        setInvitationState((prevState) => ({
            ...prevState,
            galleryImages: [...(prevState.galleryImages || []), ...files], // 기존 이미지와 합침
        }));

        console.log('갤러리 테스트', invitationState);
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
    const fetchInv = async (res) => {
        invitationState.transportationList = transportationList;
        // SaveInvitationReqVo에 맞게 데이터 구성
        let gids = [];
        if(res){
            gids = res.result;
        }
        let data = {
            invitation: invitationState, // invitationState를 전송
            transportationList : transportationList,
            galleryIds: gids,// res.result, // res.result를 galleryIds로 전송
        };

        axiosPost("/api/invitation", data).then(response => {
            console.log("저장  response : ",response)
            navigate('/production-list', {
                state: {
                    ordererNm: invitationState.ordererNm,
                    ordererCall: invitationState.ordererCall,
                }
            });
        });

    }

    const fetchSaveFiles = async () => {
        try {
            const formData = new FormData();

            formData.append("ordererName", invitationState.ordererCall);
            formData.append("ordererCall", invitationState.ordererNm);
    
            // 주요 이미지 파일 처리
            if (invitationState.mainPhotoFile) {
                formData.append("mainPhotoFile", invitationState.mainPhotoFile); // 메인 이미지
            }
            if (invitationState.calendarFile) {
                formData.append("calendarFile", invitationState.calendarFile); // 달력 이미지
            }
            if (invitationState.groomPhotoFile) {
                formData.append("groomPhotoFile", invitationState.groomPhotoFile); // 신랑 이미지
            }
            if (invitationState.bridePhotoFile) {
                formData.append("bridePhotoFile", invitationState.bridePhotoFile); // 신부 이미지
            }
            if (invitationState.endingPhotoFile) {
                formData.append("endingPhotoFile", invitationState.endingPhotoFile); // 엔딩 이미지
            }
    
            // 갤러리 이미지 처리 (배열로 추가)
            if (invitationState.galleryImages && invitationState.galleryImages.length > 0) {
                invitationState.galleryImages.forEach((file) => {
                    formData.append("galleryImages", file); // 갤러리 이미지를 배열로 추가
                });
            }
    
            // 서버로 데이터 전송
            const response = await axios.post("https://api.euphoriacard.co.kr/api/gallery", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            fetchInv(response.data);
            console.log("Server response:", response.data);
        } catch (error) {
            console.error("Error while saving data:", error);
        }
    };
    
    
  return (
    <div className="contents-wrap">
        <div className="container">
            <div className="create-wrap">
                <div className="create">
                    <div className="create-preview">

                        <div className="frame-wrap">
                            <div className="frame">

                                <section className="main">
                                    {/* <img className="bg" src={bgimg} alt="bg"/> */}
                                    <img className="bg" src={backgroundImage} alt="bg" />
                                    <div className="cts">
                                        <strong
                                            className="lettering type1"
                                            style={{
                                                color: color1,
                                                top: letteringTop.type1, // 동적 스타일 적용
                                                display: invitationState.letteringMsg === 'our wedding day' ? 'block' : 'none',
                                            }}
                                            >
                                            our<br />wedding<br />day
                                        </strong>
                                        <strong
                                            className="lettering type2"
                                            style={{
                                                color: color1,
                                                top: letteringTop.type2, // 동적 스타일 적용
                                                display: invitationState.letteringMsg === "We're getting married_1" ? 'block' : 'none',
                                            }}
                                            >
                                            We're getting<br />married!
                                        </strong>
                                        <strong
                                            className="lettering type3"
                                            style={{
                                                color: color1,
                                                top: letteringTop.type3, // 동적 스타일 적용
                                                display: invitationState.letteringMsg === 'Just married' ? 'block' : 'none',
                                            }}
                                            >
                                            Just married
                                        </strong>

                                        <p
                                            className="text"
                                            style={{
                                                color : color2,
                                                top: maintxtHg,
                                                wordWrap: "break-word", // 긴 단어를 자동으로 줄바꿈
                                                overflowWrap: "break-word", // 긴 단어가 깨지도록 줄바꿈
                                                whiteSpace: "normal", // 일반 줄바꿈 허용
                                            }}
                                            >
                                            {invitationState.mainTxt || ""}
                                        </p>

                                </div>
                                </section>



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
                                                />
                                            </div>
                                            <p className="t1"><span className="blue">신랑</span>
                                            <strong>
                                                {invitationState.groomFirstName}{invitationState.groomLastName}
                                                {invitationState.groomPhoneNumber && (
                                                    <strong>📞</strong>
                                                )}
                                            </strong>
                                            
                                            </p>
                                            <p className="t2">{invitationState.groomIntroduction}</p>
                                            {/* <p className="t3"><span>신랑 아버지</span>의 {invitationState.groomRelationship}</p> */}

                                                <p className="t3">
                                                    <span>

                                                        
                                                        {invitationState.groomFatherFirstName}{invitationState.groomFatherLastName}

                                                        {invitationState.groomFatherFirstName && (
                                                            <span>•</span> 
                                                        )}

                                                        
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
                                                />

                                            </div>
                                            <p className="t1"><span className="pink">신부</span>
                                            <strong>
                                                {invitationState.brideFirstName}{invitationState.brideLastName}
                                                {invitationState.bridePhoneNumber && (
                                                    <strong>📞</strong>
                                                )}
                                            </strong>
                                                        
                                            
                                            </p>
                                            <p className="t2">{invitationState.brideIntroduction}</p>
                                                <p className="t3">
                                                    <span>
                                                        
                                                        {invitationState.brideFatherFirstName}{invitationState.brideFatherLastName}
                                                        {invitationState.brideFatherFirstName && (
                                                            <span>•</span> 
                                                        )}
                                                        
                                                        {invitationState.brideMotherFirstName}{invitationState.brideMotherLastName}
                                                    </span>
                                                    {invitationState.brideFatherFirstName&&(<>의</> )} {invitationState.brideRelationship}
                                                    
                                                </p>
                                        </div>
                                    </div>
                                    {/* 목요일 이후 / 팝업 디자인 및 퍼블리싱 없음  故人*/}
                                    {/* <button className="btn">혼주에게 연락하기</button> */}
                                </section>
                                )}
                            

                                {/* useCalendar 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                                {invitationState.useCalendar && (
                                <section className="calendar">
                                    
                                    <strong className="title">{invitationState.calendarTitle || "예식 안내"}</strong>
                                    <p className="info">{parseInt(invitationState.weddingDate.split("-")[0], 10)}년&nbsp;
                                                        {parseInt(invitationState.weddingDate.split("-")[1], 10)}월&nbsp;
                                                        {parseInt(invitationState.weddingDate.split("-")[2])}일&nbsp;
                                                        {/* {}요일 오후 {}시 */}
                                                        {getKoreanDateInfo(invitationState.weddingDate)}<br/>
                                                        {invitationState.weddingHallName || ""}&nbsp;
                                                        {invitationState.weddingHallFloorAndRoom || ""}
                                    </p>

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
                                </section>
                                )}

                                {/* useGallery 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                                {invitationState.useGallery && (
                                <section className="gallery">
                                    <strong className="title">
                                    {/* <strong className="title" data-aos="fade-up" data-aos-duration="100"> */}
                                        {invitationState.galleryTitle || "갤러리"}</strong>
                                        <div className="gallery-list">
                                    {/* <div className="gallery-list" data-aos="fade-up" data-aos-duration="100"> */}

                                    {/* 이걸로 안보여서 아래 소스 사용  */}
                                        {/* {invitationState.galleryImages &&
                                            invitationState.galleryImages.map((image, index) => (
                                                <div className="gallery-item" key={index}>
                                                    <img src={image} alt={`gallery-${index}`} />
                                                </div>
                                        ))} */}

                                        {previewGallery &&
                                            previewGallery.map((image, index) => (
                                                <div className="gallery-item" key={index}>
                                                    <img src={image.previewUrl} alt={`gallery-${index}`} />
                                                </div>
                                        ))}
                                        
                                    </div>
                                </section>
                                )}


                                {/*useNotice 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
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

                                {/* useFlower 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                                {invitationState.useFlower && (
                                <section className="flower">
                                    <div className="flower-box">
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
                                    <span className="title">함께한 시간</span>
                                    {/* <span className="title" data-aos="fade-up" data-aos-duration="100">함께한 시간</span> */}
                                    {/* <p className="timer" data-aos="fade-up" data-aos-duration="1000">“25년 1개월 17시간 42분 7초”</p> */}
                                    <p className="timer">
                                    {/* <p className="timer" data-aos="fade-up" data-aos-duration="100"> */}
                                        {elapsedTime}</p>
                                </section>
                                )}




                                {/* useDirections 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                                {invitationState.useDirections && (
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
                                        {/* 목요일에 할거임 */}
                                        {/* <div className="map"></div> */}
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


                            {/* <!-- // 2024-11-13 미리보기 영역 --> */}











                        </div>
{/* TODO */}
                        {/* <div className="preview-focus">
                            <label for="" className="switch">
                                <input type="checkbox" checked />
                            </label>
                            <strong>자동 포커스</strong>
                            <span>(사용하시면 제작하실때 편리합니다.)</span>
                        </div> */}

                    </div>

                    <div className="create-contents">

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
                                                    {visibleTooltips.tooltip1 && (
                                                        <span className="tooltip-box" onClick={() => hideTooltip('tooltip1')}>
                                                        <span>10가지</span> 템플릿이 준비되어 있습니다.
                                                        </span>
                                                    )}
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
                                                    <option value="our wedding day">our wedding day</option>
                                                    <option value="We're getting married_1">We're getting married_1</option>
                                                    {/* <option>We're getting married_2</option>  */}
                                                    <option value="Just married">Just married</option>
                                                    {/* <option>With love, always</option> 
                                                    <option>happy wedding day</option> 
                                                    <option>Our first page</option> 
                                                    <option>Happily ever after</option>  */}
                                                   <option value="">선택안함</option>
                                                </select>
                                                <button className="btn-change tooltip">변경
                                                    {/* <span className="tooltip-box"><span>9가지</span> 문구가 준비되어 있습니다.</span> */}
                                                    {visibleTooltips.tooltip2 && (
                                                        <span className="tooltip-box" onClick={() => hideTooltip('tooltip2')}>
                                                        <span>9가지</span> 템플릿이 준비되어 있습니다.
                                                        </span>
                                                    )}
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
                                        {invitationState.letteringMsg === "our wedding day" && (
                                            <input
                                            type="range"
                                            min="10"
                                            max="80"
                                            value={parseInt(letteringTop.type1)}
                                            onChange={(e) => handleRangeChange('type1', e.target.value)}
                                            />
                                        )}
                                        {invitationState.letteringMsg === "We're getting married_1" && (
                                            <input
                                            type="range"
                                            min="10"
                                            max="80"
                                            value={parseInt(letteringTop.type2)}
                                            onChange={(e) => handleRangeChange('type2', e.target.value)}
                                            />
                                        )}
                                        {invitationState.letteringMsg === "Just married" && (
                                            <input
                                            type="range"
                                            min="10"
                                            max="80"
                                            value={parseInt(letteringTop.type3)}
                                            onChange={(e) => handleRangeChange('type3', e.target.value)}
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
                                        {/* 기능이해못함 */}
                                    {/* <div className="option">
                                        <div className="option-label">메인 하단 예식 정보 <sup>필수</sup></div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="ct1_1" id="ct1_1_1" />
                                                    <label for="ct1_1_1"><i></i>노출</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="ct1_1" id="ct1_1_2" checked />
                                                    <label for="ct1_1_2"><i></i>비노출</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div> */}
                                    
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
                                            type="text" 
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
                                    {/* <div className="option">
                                        <div className="option-label">디데이</div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="check">
                                                    <input type="checkbox" name="ct1_2" id="ct1_2_1" 
                                                    onChange={(e) => handleChange("useDday", e.target.value === 'on'? true : false)} />
                                                    <label for="ct1_2_1"><i></i>사용</label>
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
                                        <input type="checkbox" checked />
                                    </label>
                                    <strong>글귀</strong>
                                    <button 
                                        className={`btn-toggle ${categories['phrases '] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('phrases ')}
                                    >여닫기</button>
                                </div>
                                {categories['phrases '] && (
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">글귀</div>
                                        <div className="option-contents">
                                            <div className="phrase">
                                                <button className="phrase-sample">샘플 양식</button>
                                                <textarea name="" id="" className="textarea-sts" rows="9">
                                                내가 그다지 사랑하던 그대여
                                                내 한 평생에 차마
                                                그대를 잊을 수 없소이다.
                                                못 올 사랑인 줄 알면서도
                                                나 혼자는 꾸준히 생각하리라.

                                                자, 그러면 내내 어여쁘소서.

                                                이런 시, 이상</textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )  }
                            </div> */}



                            {/* 목요일 이후 구현 (퍼블리싱 없음) */}
                            {/* <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input type="checkbox" checked />
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
                                            <input type="text" className="input-sts" placeholder="소중한 분들을 초대합니다."/>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">내용</div>
                                        <div className="option-contents">
                                            <div className="phrase">
                                                <button className="phrase-sample">샘플 양식</button>
                                                <textarea name="" id="" className="textarea-sts" rows="9">
                                                오랜 기다림 속에서 저희 두 사람,
                                                한 마음 되어 참된 사랑의 결실을
                                                맺게 되었습니다.

                                                오셔서 축복해 주시면 큰 기쁨이겠습니다.</textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">사진</div>
                                        <div className="option-contents">
                                            <div className="img-uploader">
                                                <div className="img-upload">
                                                    <button className="img-upload-add"></button>
                                                </div>
                                                <div className="img-upload fin">
                                                    <div className="img-upload-thumb"><img src="./images/create/sample.png" alt="sample"/></div>
                                                    <button className="img-upload-cancel">삭제</button>
                                                </div>
                                            </div>
                                            <div className="mt-10"><button className="btn-positioning">위치 조정</button></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div> */}


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
                                            <div className="mt-10"><button className="btn-positioning">위치 조정</button></div>
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
                                                                alt="신부부이미지" 
                                                            />
                                                        </div>
                                                        <button className="img-upload-cancel" onClick={() =>invitationState.bridePhotoUrl = "" }>삭제</button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-10"><button className="btn-positioning">위치 조정</button></div>
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
                                                type="text" 
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
                                                type="text" 
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


                            {/* 목요일 이후 구현 (퍼블리싱 없음) */}
                            {/* <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input type="checkbox" checked />
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
                                            <input type="text" className="input-sts" placeholder="-없이 입력해주세요"/>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">신랑 어머니</div>
                                        <div className="option-contents">
                                            <input type="text" className="input-sts" placeholder="-없이 입력해주세요"/>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">신부 아버지</div>
                                        <div className="option-contents">
                                            <input type="text" className="input-sts" placeholder="-없이 입력해주세요"/>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">신부 어머니</div>
                                        <div className="option-contents">
                                            <input type="text" className="input-sts" placeholder="-없이 입력해주세요"/>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div> */}

                            {/* 목요일 이후 구현 (퍼블리싱 없음) */}
                            {/* <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input type="checkbox" checked/>
                                    </label>
                                    <strong>타임라인</strong>
                                    <button 
                                        className={`btn-toggle ${categories['timeLine'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('timeLine')}
                                    >여닫기</button>
                                </div>
                                {categories['timeLine'] && (
                                </div>
                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">타이틀</div>
                                        <div className="option-contents">
                                            <input type="text" className="input-sts" placeholder="우리의 시간"/>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">사진 모양</div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="timeline1" id="timeline1_1" checked/>
                                                    <label for="timeline1_1"><i></i>원형</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="timeline1" id="timeline1_2"/>
                                                    <label for="timeline1_2"><i></i>사각형</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="add-box">
                                        <div className="add-head">
                                            <div>
                                                <button className="add-box-up">위로</button>
                                                <button className="add-box-down">아래로</button>
                                            </div>
                                            <button className="add-box-delete">삭제</button>
                                        </div>
                                        <div className="add-body">
                                            <div className="option">
                                                <div className="option-label">날짜</div>
                                                <div className="option-contents">
                                                    <input type="date" className="input-sts"/>
                                                </div>
                                            </div>
                                            <div className="option">
                                                <div className="option-label">제목</div>
                                                <div className="option-contents">
                                                    <input type="text" className="input-sts"/>
                                                </div>
                                            </div>
                                            <div className="option">
                                                <div className="option-label">사진</div>
                                                <div className="option-contents">
                                                    <div className="img-uploader">
                                                        <div className="img-upload">
                                                            <button className="img-upload-add"></button>
                                                        </div>
                                                        <div className="img-upload fin">
                                                            <div className="img-upload-thumb"><img src="./images/create/sample.png" alt="sample"/></div>
                                                            <button className="img-upload-cancel">삭제</button>
                                                        </div>
                                                    </div>
                                                    <div className="mt-10"><button className="btn-positioning">위치 조정</button></div>
                                                </div>
                                            </div>
                                            <div className="option">
                                                <div className="option-label">내용</div>
                                                <div className="option-contents">
                                                    <textarea name="" id="" rows="7" className="textarea-sts"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="add-btn">
                                        <button className="add-box-add">타임라인 추가</button>
                                    </div>
                                </div>
                            )}
                            </div> */}



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
                                    {/* <div className="option">
                                        <div className="option-label">타입</div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="gallery" id="gallery_1" checked/>
                                                    <label for="gallery_1"><i></i>그리드</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="gallery" id="gallery_2"/>
                                                    <label for="gallery_2"><i></i>써클</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="gallery" id="gallery_2"/>
                                                    <label for="gallery_2"><i></i>슬라이드</label>
                                                </span> 
                                            </div>
                                        </div>
                                    </div> */}
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
                                    {/* 목요일 이후 구현 (퍼블리싱 없음) */}
                                    {/* <div className="option">
                                        <div className="option-label">하단 진행바</div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="gallery_bar" id="gallery_bar_1"/>
                                                    <label for="gallery_bar_1"><i></i>표시</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="gallery_bar" id="gallery_bar_2" checked/>
                                                    <label for="gallery_bar_2"><i></i>미표시</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">썸네일</div>
                                        <div className="option-contents">
                                            <button className="btn-positioning">위치 조정</button>
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
                                            <input type="text" className="input-sts" placeholder="https://www.youtube.com/watch?v=(11자리문자)"/>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">영상 제목<sup>필수</sup></div>
                                        <div className="option-contents">
                                            <input type="text" className="input-sts" placeholder="식전 영상"/>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div> */}

                            {/* 목요일 이후 구현 (퍼블리싱 없음) */}
                            {/* <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input type="checkbox" checked/>
                                    </label>
                                    <strong>웨딩 인터뷰</strong>

                                    <button 
                                        className={`btn-toggle ${categories['interview'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('interview')}
                                    >여닫기</button>
                                </div>
                                {categories['interview'] && (

                                <div className="category-body">
                                    <div className="option">
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
                                    </div>
                                    
                                    <div className="add-box">
                                        <div className="add-head">
                                            <div>
                                                <button className="add-box-up">위로</button>
                                                <button className="add-box-down">아래로</button>
                                            </div>
                                            <button className="add-box-delete">삭제</button>
                                        </div>
                                        <div className="add-body">
                                            <div className="option">
                                                <div className="option-label">인터뷰 질문</div>
                                                <div className="option-contents">
                                                    <input type="text" className="input-sts"/>
                                                </div>
                                            </div>
                                            <div className="option">
                                                <div className="option-label">인터뷰 답변</div>
                                                <div className="option-contents">
                                                    <textarea name="" id="" rows="7" className="textarea-sts"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="add-btn">
                                        <button className="add-box-add">인터뷰 추가</button>
                                    </div>
                                </div>
                            )}
                            </div> */}

                            {/*  지도 안나옴  */}
                            <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input type="checkbox" checked/>
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
                                                <Map // 카카오맵을 표시할 컴포넌트
                                                    center={{lat : 33.491103, lng : 126.496458}} // 중심 좌표
                                                    level={3} // 확대 레벨
                                                    style={{ width: "100%", height: "100%" }} // 스타일
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">지도 높이</div>
                                        <div className="option-contents">
                                            <select name="" id="" className="select-sts">
                                                <option value="0">300px</option>
                                                <option value="1">350px</option>
                                                <option value="2">400px</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">지도 줌 레벨</div>
                                        <div className="option-contents">
                                            <select name="" id="" className="select-sts">
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
                                    </div>
                                    <div className="option">
                                        <div className="option-label">네비게이션</div>
                                        <div className="option-contents">
                                            <div className="check-wrap">
                                                <span className="check">
                                                    <input type="checkbox" id="navigation"/>
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

                            {/* 목요일 이후 구현 (퍼블리싱 없음) */}
                            {/* <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input type="checkbox" checked/>
                                    </label>
                                    <strong>안내사항</strong>
                                    <button 
                                        className={`btn-toggle ${categories['info'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('info')}
                                    >여닫기</button>
                                </div>
                                {categories['info'] && (
                                <div className="category-body">
                                    <div className="add-box">
                                        <div className="add-head">
                                            <div>
                                                <button className="add-box-up">위로</button>
                                                <button className="add-box-down">아래로</button>
                                            </div>
                                            <button className="add-box-delete">삭제</button>
                                        </div>
                                        <div className="add-body">
                                            <div className="option">
                                                <div className="option-label">제목</div>
                                                <div className="option-contents">
                                                    <input type="text" className="input-sts"/>
                                                </div>
                                            </div>
                                            <div className="option">
                                                <div className="option-label">사진</div>
                                                <div className="option-contents">
                                                    <div className="img-uploader">
                                                        <div className="img-upload">
                                                            <button className="img-upload-add"></button>
                                                        </div>
                                                        <div className="img-upload fin">
                                                            <div className="img-upload-thumb"><img src="./images/create/sample.png" alt="sample"/></div>
                                                            <button className="img-upload-cancel">삭제</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="option">
                                                <div className="option-label">내용</div>
                                                <div className="option-contents">
                                                    <textarea name="" id="" rows="7" className="textarea-sts"></textarea>
                                                </div>
                                            </div>
                                            <div className="option">
                                                <div className="option-label">외부링크 버튼</div>
                                                <div className="option-contents">
                                                    <div className="radio-wrap">
                                                        <span className="radio">
                                                            <input type="radio" name="notice_link" id="notice_link_1" checked/>
                                                            <label for="notice_link_1"><i></i>미사용</label>
                                                        </span>
                                                        <span className="radio">
                                                            <input type="radio" name="notice_link" id="notice_link_2"/>
                                                            <label for="notice_link_2"><i></i>사용</label>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="add-btn">
                                        <button className="add-box-add">안내사항 추가</button>
                                    </div>
                                </div>
                            )}
                            </div> */}
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
                                    {/* 목요일 이후 구현 (퍼블 없어서 만들다 때려ㅓ침 ) */}
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

                            {/* 목요일 이후 구현 (퍼블리싱 없음) */}
                            {/* <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input type="checkbox" checked/>
                                    </label>
                                    <strong>계좌번호</strong>
                                    <button 
                                        className={`btn-toggle ${categories['paymentAccount'] ? 'active' : ''}`}
                                        onClick={() => toggleCategory('paymentAccount')}
                                    >여닫기</button>
                                </div>
                                {categories['paymentAccount'] && (

                                <div className="category-body">
                                    <div className="option">
                                        <div className="option-label">타이틀</div>
                                        <div className="option-contents">
                                            <input type="text" className="input-sts" placeholder="마음 전하실 곳"/>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">안내문구</div>
                                        <div className="option-contents">
                                            <textarea name="" id="" className="textarea-sts" rows="9">
                                            멀리서도 축하의 마음을 
                                            전하고 싶으신 분들을 위해 
                                            계좌번호를 안내드립니다. 

                                            소중한 축하를 보내주셔서 감사드리며, 
                                            따뜻한 마음에 깊이 감사드립니다.
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="option">
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
                                    </div>
                                    <div className="option">
                                        <div className="option-label">
                                            <span className="check">
                                                <input type="checkbox" id="bank_info_1" checked/>
                                                <label for="bank_info_1"><i></i></label>
                                            </span>
                                            신랑
                                        </div>
                                        <div className="option-contents">
                                            <div className="bank-info">
                                                <input type="text" placeholder="은행" className="input-sts"/>
                                                <input type="text" placeholder="계좌번호" className="input-sts"/>
                                                <input type="text" placeholder="예금주" className="input-sts"/>
                                                <span className="check">
                                                    <input type="checkbox" id="bank_info_1_kakao"/>
                                                    <label for="bank_info_1_kakao"><i></i>카카오페이 추가</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">
                                            <span className="check">
                                                <input type="checkbox" id="bank_info_2" checked/>
                                                <label for="bank_info_2"><i></i></label>
                                            </span>
                                            신부
                                        </div>
                                        <div className="option-contents">
                                            <div className="bank-info">
                                                <input type="text" placeholder="은행" className="input-sts"/>
                                                <input type="text" placeholder="계좌번호" className="input-sts"/>
                                                <input type="text" placeholder="예금주" className="input-sts"/>
                                                <span className="check">
                                                    <input type="checkbox" id="bank_info_1_kakao"/>
                                                    <label for="bank_info_1_kakao"><i></i>카카오페이 추가</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">
                                            <span className="check">
                                                <input type="checkbox" id="bank_info_3"/>
                                                <label for="bank_info_3"><i></i></label>
                                            </span>
                                            신랑 아버지
                                        </div>
                                        <div className="option-contents">
                                            <div className="bank-info" style={{display : "none"}}>
                                                <input type="text" placeholder="은행" className="input-sts"/>
                                                <input type="text" placeholder="계좌번호" className="input-sts"/>
                                                <input type="text" placeholder="예금주" className="input-sts"/>
                                                <span className="check">
                                                    <input type="checkbox" id="bank_info_1_kakao"/>
                                                    <label for="bank_info_1_kakao"><i></i>카카오페이 추가</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">
                                            <span className="check">
                                                <input type="checkbox" id="bank_info_4"/>
                                                <label for="bank_info_4"><i></i></label>
                                            </span>
                                            신랑 어머니
                                        </div>
                                        <div className="option-contents">
                                            <div className="bank-info" style={{display : "none"}}>
                                                <input type="text" placeholder="은행" className="input-sts"/>
                                                <input type="text" placeholder="계좌번호" className="input-sts"/>
                                                <input type="text" placeholder="예금주" className="input-sts"/>
                                                <span className="check">
                                                    <input type="checkbox" id="bank_info_1_kakao"/>
                                                    <label for="bank_info_1_kakao"><i></i>카카오페이 추가</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">
                                            <span className="check">
                                                <input type="checkbox" id="bank_info_5"/>
                                                <label for="bank_info_5"><i></i></label>
                                            </span>
                                            신부 아버지
                                        </div>
                                        <div className="option-contents">
                                            <div className="bank-info" style={{display : "none"}}>
                                                <input type="text" placeholder="은행" className="input-sts"/>
                                                <input type="text" placeholder="계좌번호" className="input-sts"/>
                                                <input type="text" placeholder="예금주" className="input-sts"/>
                                                <span className="check">
                                                    <input type="checkbox" id="bank_info_1_kakao"/>
                                                    <label for="bank_info_1_kakao"><i></i>카카오페이 추가</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">
                                            <span className="check">
                                                <input type="checkbox" id="bank_info_6"/>
                                                <label for="bank_info_6"><i></i></label>
                                            </span>
                                            신부 어머니
                                        </div>
                                        <div className="option-contents">
                                            <div className="bank-info" style={{display : "none"}}>
                                                <input type="text" placeholder="은행" className="input-sts"/>
                                                <input type="text" placeholder="계좌번호" className="input-sts"/>
                                                <input type="text" placeholder="예금주" className="input-sts"/>
                                                <span className="check">
                                                    <input type="checkbox" id="bank_info_1_kakao"/>
                                                    <label for="bank_info_1_kakao"><i></i>카카오페이 추가</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div> */}
                            {/* 목요일 이후 구현 (퍼블리싱 없음) */}
                            {/* <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input type="checkbox" checked/>
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
                                            <input type="text" className="input-sts" placeholder="방명록"/>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">마스터 비밀번호</div>
                                        <div className="option-contents">
                                            <input type="password" className="input-sts" placeholder="비밀번호 입력"/>
                                            <input type="password" className="input-sts" placeholder="비밀번호 확인"/>
                                        </div>
                                    </div>
                                    <div className="option">
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
                                    </div>
                                </div>
                            )}
                            </div> */}



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
                                    >여닫기</button> */}
                                </div>
                                {categories['flowerDelivery'] && (<></>
                                )}
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
                                    
                                    {/* 목요일 */}
                                    {/* <div className="option">
                                        <div className="option-label">글귀</div>
                                        <div className="option-contents">
                                            <div className="radio-wrap">
                                                <span className="radio">
                                                    <input type="radio" name="ending" id="ending_1" checked/>
                                                    <label for="ending_1"><i></i>상단</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="ending" id="ending_2"/>
                                                    <label for="ending_2"><i></i>중간</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="ending" id="ending_3"/>
                                                    <label for="ending_3"><i></i>하단</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div> */}
                                    
                                </div>
                                )}
                            </div>



                            
                            {/* 목요일 이후 구현 (디자인, 퍼블리싱 없음) */}
                            {/* <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input type="checkbox" checked/>
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
                                                    <input type="radio" name="loading" id="loading_1" checked/>
                                                    <label for="loading_1"><i></i>드로우(텍스트형)</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="loading" id="loading_2"/>
                                                    <label for="loading_2"><i></i>드로우(이미지형)</label>
                                                </span>
                                                <span className="radio">
                                                    <input type="radio" name="loading" id="loading_3"/>
                                                    <label for="loading_3"><i></i>타이핑</label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">문구<sup>필수</sup></div>
                                        <div className="option-contents">
                                            <input type="text" className="input-sts" value="We’re getting Married!"/>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">배경색<sup>필수</sup></div>
                                        <div className="option-contents">
                                            <div className="color-picker">
                                                <span className="color-value">#93EEF4</span>
                                                <input className="color-input" type="color" value="#93EEF4"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">폰트색<sup>필수</sup></div>
                                        <div className="option-contents">
                                            <div className="color-picker">
                                                <span className="color-value">#93EEF4</span>
                                                <input className="color-input" type="color" value="#93EEF4"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div> */}




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
                            {/* <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input type="checkbox" checked/>
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
                                                    <button className="img-upload-add"></button>
                                                </div>
                                                <div className="img-upload fin">
                                                    <div className="img-upload-thumb"><img src="./images/create/sample.png" alt="sample"/></div>
                                                    <button className="img-upload-cancel">삭제</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">제목</div>
                                        <div className="option-contents">
                                            <input className="input-sts" type="text"/>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">내용</div>
                                        <div className="option-contents">
                                            <textarea name="" id="" className="textarea-sts" rows="9"></textarea>
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div> */}



                            {/* 목요일 이후 구현 (기획 된 것 없음) */}
                            {/* <div className="category">
                                <div className="category-head">
                                    <label for="" className="switch">
                                        <input type="checkbox" checked/>
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
                                                    <button className="img-upload-add"></button>
                                                </div>
                                                <div className="img-upload fin">
                                                    <div className="img-upload-thumb"><img src="./images/create/sample.png" alt="sample"/></div>
                                                    <button className="img-upload-cancel">삭제</button>
                                                </div>
                                            </div>
                                            <p className="notice">URL 공유 수정 시, 해당 서비스에서 수집한 캐시로 인하여 <span className="red">반영까지 1시간 이상</span> 소요됩니다.</p>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">제목</div>
                                        <div className="option-contents">
                                            <input className="input-sts" type="text"/>
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div className="option-label">내용</div>
                                        <div className="option-contents">
                                            <textarea name="" id="" className="textarea-sts" rows="9"></textarea>
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div> */}



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
            
            <div className="preview-tooltip">실시간으로 확인해보세요! <button className="preview-tooltip-close">닫기</button></div>
            <button className="btn-save">저장</button>
            <button className="btn-preview">미리보기</button>
        </div>
    </div>
  )
}

export default Create;
