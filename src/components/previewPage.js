import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "../styles/common.css";
import "../styles/contents.css";
import "aos/dist/aos.css";
import "aos/dist/aos.js";
import AOS from "aos";
import flower from "../images/create/flower.png";
import { Map, Polyline, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import typo from '../images/card/typo.png';
import page3_bg from '../images/card/page3_bg.png';
import map_t from '../images/create/map_t.png';
import map_kakao from '../images/create/map_kakao.png';
import map_naver from '../images/create/map_naver.png';
import CallIcon from './CallIcon.js'
import BasicModal, { openBasicModal } from "./BasicModal.js";
import MapComponent from './map.js';
import SmsIcon from './SmsIcon.js';
import GallerySlider from './gallerySlider.js';
import CircleGallery from './CircleGallery.js';
import { initKakao } from '../util/kakao.js';
// import { Helmet } from 'react-helmet-async';
// import SEO from './Seo.js';

function PreviewPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const item = state?.item; // 전달받은 item 데이터
    const selectedItems = state?.selectedItems; // 전달받은 item 데이터
    const orderDetailCnt = state?.orderDetailCnt;
    let confirmCnt = 0; //결제여부체크

    const searchParams = new URLSearchParams(location.search);
    // 쿼리스트링에서 값 추출
    const itemId = searchParams.get('itemId');
    
    const [infoList, setInfoList] = useState([]);
    const [trsptList, setTrsptList] = useState([]);
    const [interviewList, setInterviewList] = useState([]);
    const [galList, setGalList] = useState([]);
    const [inv, setInv] = useState({});
    const [tlList, setTlList] = useState([]);
    const [guestbookList, setGuestbookList] = useState([]);

    useEffect(() => {
        if(!itemId){
            alert('데이터가 없습니다. 이전 페이지로 돌아갑니다.');
            navigate(-1); // 이전 페이지로 이동
        }else{
            fetchInvData();
        }
    }, []);

    useEffect(() => {
        const handlePopState = (event) => {
            // 뒤로가기가 발생했을 때 원하는 경로로 이동
            navigate("/list");
        };

        // 브라우저 뒤로가기 이벤트 감지
        window.addEventListener("popstate", handlePopState);

        // 컴포넌트가 언마운트될 때 이벤트 제거
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [navigate]);

    
    const fetchInvData = async() => {
        try {
            const response = await axios.post("https://api.euphoriacard.co.kr/api/invitation/detail", { itemId }, {
                headers: { "Content-Type": "application/json" }
              });
        
            console.log("Response Data: ", response.data);

            setTrsptList(response.data.tvolist);
            setInv(response.data.ivo);
            setGalList(response.data.gvolist);
            setInterviewList(response.data.itvList);
            setInfoList(response.data.infolist);
            setTlList(response.data.tlList);
            setGuestbookList(response.data.guestbookList);
        } catch (error) {
            console.error("Error fetching order list: ", error);
            alert("초대장 정보를 불러오지 못했습니다. 다시 시도해주세요.");
        }
    }

    useEffect(() => {
    }, [trsptList]);

    useEffect(() => {
    }, [interviewList]);

    useEffect(() => {
        generateCalendar(inv.weddingDate);
        
    }, [inv]);
    
  
    // -------------------------------------------------------------------------------------------------
    // *********************************[지도] 지도 api  ************************************************
    // -------------------------------------------------------------------------------------------------

    useEffect(() => {
        if (inv.useMap && inv.weddingHallAddress) {
            handleMapSearch();
        }
    }, [inv.useMap, inv.weddingHallAddress]);

    useEffect(() => {
        if (!window.kakao) {
            console.error("Kakao Maps SDK is not loaded.");
        }
    }, []);

    

    const handleMapSearch = () => {
        const mapElement = document.getElementById('map');

        if (!mapElement) {
            console.error('Map elements are not rendered yet.');
            return;
        }

        const mapOption = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };

        const createdMap = new window.kakao.maps.Map(mapElement, mapOption);

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(inv.weddingHallAddress, function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                const marker = new window.kakao.maps.Marker({
                    map: createdMap,
                    position: coords,
                });

                createdMap.setCenter(coords);
            }
        });
    };
    

    const onClickFlower = () => {
        var url = inv.sendWreathUrl 
        window.open("https://www.barunsonflower.com/?barunid=731900", "_blank");
    }

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

    // -------------------------------------------------------------------------------------------------
    // *********************************[함께한 시간] 함께한 시간 계산 ***********************************
    // -------------------------------------------------------------------------------------------------
    const [elapsedTime, setElapsedTime] = useState("");

    useEffect(() => {
        // 타이머 업데이트 함수
        const updateElapsedTime = () => {
            if (inv.firstMeetTime) {
                const firstMeetDate = new Date(inv.firstMeetTime); // firstMeetTime 값
                const now = new Date();
                const diffInSeconds = Math.floor((now - firstMeetDate) / 1000); // 초 단위 차이 계산
        
                const years = Math.floor(diffInSeconds / (365 * 24 * 60 * 60));
                const months = Math.floor((diffInSeconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60));
                const days = Math.floor((diffInSeconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
                const hours = Math.floor((diffInSeconds % (24 * 60 * 60)) / (60 * 60));
                const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
                const seconds = diffInSeconds % 60;
        
                // 조건부로 각 단위를 문자열에 추가
                const formattedTime = [
                    years > 0 ? `${years}년` : "",
                    months > 0 ? `${months}개월` : "",
                    days > 0 ? `${days}일` : "",
                    hours > 0 ? `${hours}시간` : "",
                    minutes > 0 ? `${minutes}분` : "",
                    seconds > 0 ? `${seconds}초` : "",
                ]
                .filter(Boolean) // 빈 문자열 제거
                .join(" "); // 공백으로 연결
        
                setElapsedTime(formattedTime);
            } else {
                setElapsedTime("날짜를 입력해주세요.");
            }
        };
    
        // 1초마다 업데이트
        const intervalId = setInterval(updateElapsedTime, 1000);
    
        // 컴포넌트 언마운트 시 interval 제거
        return () => clearInterval(intervalId);
    }, [inv.firstMeetTime]);

    // -------------------------------------------------------------------------------------------------
    // *********************************[미리보기] 결혼식까지 남은 시간 ************************************
    // -------------------------------------------------------------------------------------------------
    const [calendarDays, setCalendarDays] = useState([]);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    
    useEffect(() => {
        const calculateTimeLeft = () => {
        const now = new Date();
        const weddingDate = new Date(inv.weddingDate);
    
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
    }, [inv.weddingDate]);

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


    // -------------------------------------------------------------------------------------------------
    // *********************************[메인] 배경이미지************************************************
    // -------------------------------------------------------------------------------------------------
    const [mainImg, setMainImg] = useState(); 
    const [brideImg, setBrideImg] = useState(); 
    const [groomImg, setGroomImg] = useState(); 
    const [calendarImg, setCalendarImg] = useState(); 
    const [endingImg, setEndingImg] = useState(); 
    const [salutImg, setSalutImg] = useState(); 
    const [kakaoImg, setKakaoImg] = useState(); 
    const [gallImgs, setGallImgs] = useState([]); // 상태로 설정
    
    
    useEffect(() => {
        const newImages = [];
        galList.forEach((img) => {
            // const fixedFilename = encodeURIComponent((img.pic1).replace(/\\/g, '/'));
            // const imageUrl = `https://api.euphoriacard.co.kr/api/image?filename=${fixedFilename}/`;
            const imageUrl = img.pic1;
            switch (img.type) {
                case "main":
                    setMainImg(imageUrl);
                    break;
                case "bride":
                    setBrideImg(imageUrl);
                    break;
                case "groom":
                    setGroomImg(imageUrl);
                    break;
                case "calendar":
                    setCalendarImg(imageUrl);
                    break;
                case "ending":
                    setEndingImg(imageUrl);
                    break;
                case "salut":
                    setSalutImg(imageUrl);
                    break;
                case "kakao":
                    setKakaoImg(imageUrl);
                    break;
                case "gallery":
                    newImages.push(imageUrl);
                    break;
                    
                default:
                    break;
            }
        });
        
        setGallImgs(newImages); // 상태 업데이트
        console.log("gallimgs", gallImgs)
    }, [galList]); // gallImgs가 아닌 galList에 의존


    // useEffect(() => {
    //     console.log("inv.confirmedAt ??? ", inv.confirmedAt);
    //     if (infoList.length > 0) {
    //       const updatedInfoList = infoList.map((info) => {
    //         // file이 존재하고 아직 변환되지 않은 경우에만 변환
    //         if (info.file && !info.file.startsWith("https://api.euphoriacard.co.kr/api/image?filename=")) {
    //           const fixedFilename = encodeURIComponent(info.file.replace(/\\/g, '/'));
    //           return {
    //             ...info,
    //             file: `https://api.euphoriacard.co.kr/api/image?filename=${fixedFilename}/`
    //           };
    //         }
    //         return info;
    //       });
      
    //       // 기존 infoList와 업데이트된 값이 다를 경우에만 상태 업데이트
    //       if (JSON.stringify(updatedInfoList) !== JSON.stringify(infoList)) {
    //         setInfoList(updatedInfoList);
    //       }
    //     }
    //   }, [infoList]);

    const handleImageClick = (img, idx) => {
        openBasicModal(img, idx);
    }

    // -------------------------------------------------------------------------------------------------
    // *********************************[혼주에게 연락하기] ************************************************
    // -------------------------------------------------------------------------------------------------
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
    
    // *********************************[방명록] 방명록 ***********************************************

    // -------------------------------------------------------------------------------------------------
    const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);
    // 방명록 삭제
    const [deleteTargetIndex, setDeleteTargetIndex] = useState(null); // 삭제할 index
    const [deletePassword, setDeletePassword] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const openGuestbookModal = () => {
        setIsGuestbookOpen(true);
    };
    
    const closeGuestbookModal = () => {
        setIsGuestbookOpen(false);
    };

    const handlePasswordChange = (index, value) => {
        setGuestbookList(prev =>
            prev.map((item, i) =>
            i === index ? { ...item, password: value } : item
        ));
    };
    
    const handleConfirmDelete = async (index, enteredPassword) => {
        const guestbook = guestbookList[index];
      
        try {
          const response = await axios.post("https://api.euphoriacard.co.kr/api/preview/delete", {
            seq: guestbook.seq,
            pwd: enteredPassword,
            master : inv.masterPwd
          });
      
          if (response.status === 200) {
            // 삭제 성공: 리스트에서 제거
            setGuestbookList(prev => prev.filter((_, i) => i !== index));
            alert("삭제되었습니다.");
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            alert("비밀번호가 일치하지 않습니다.");
          } else {
            console.error("삭제 중 오류 발생:", error);
            alert("서버 오류로 삭제에 실패했습니다.");
          }
        }
      
        // 입력 초기화 및 모달 닫기
        setDeletePassword('');
        setShowDeleteModal(false);
    };
    
    const [guestbook, setGuestbook] = useState({
        invSeq : itemId,
        guestNm : "",
        content : "",
        pwd : ""
    })
    const handleChange = (key, value) => {
        
        setGuestbook((prev) => ({
          ...prev,
          [key]: value,
        }));

    };
    const [showAllGuestbooks, setShowAllGuestbooks] = useState(false);

    // 방명록 등록
    const fetchGuestbook = async () => {

        try {
            const response = await axios.post("https://api.euphoriacard.co.kr/api/preview/guestbook", guestbook, {
                headers: {
                "Content-Type": "application/json"
                }
            });
        
            console.log("저장 완료:", response.data);
            closeGuestbookModal();

        } catch (error) {
            console.error("초대장 저장 실패 ❌:", error);
        }

    }

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
    // *********************************[카톡인앱] 카톡인앱 > 외부브라우저 ***********************************************
    // -------------------------------------------------------------------------------------------------
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
        script.async = true;
        script.onload = () => {
          // 안전하게 확인 후 초기화
          if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init("5e85b98fd4f0ad015d88a1aaee9ef20d");
          }
        };
        document.head.appendChild(script);
      }, []);

    // useEffect(() => {
    //     initKakao();
    //     // window.Kakao.Share.sendDefault(...) 가능
    //   }, []);

    const shareKakao = () => {
        if (window.Kakao && window.Kakao.isInitialized()) {
                const currentUrl = window.location.href;
                window.Kakao.Link.sendDefault({
                    objectType: 'feed',
                    content: {
                        title: inv.kakaoTitle ? inv.kakaoTitle : inv.brideLastName + "❤️" + inv.groomLastName,
                        description: inv.kakaoContent ? inv.kakaoContent : "",
                        imageUrl: kakaoImg ? kakaoImg : mainImg , // 대표 이미지
                        link: {
                        mobileWebUrl: currentUrl,
                        webUrl: currentUrl
                        }
                    },
                    buttons: [
                        {
                        title: inv.kakaoTitle,
                        link: {
                            mobileWebUrl:currentUrl,
                            webUrl: currentUrl
                        }
                        }
                    ]
                });
        }
    };

    // -------------------------------------------------------------------------------------------------
    // *********************************[카톡인앱] 카톡인앱 > 외부브라우저 ***********************************************
    // -------------------------------------------------------------------------------------------------
    const isKakaoInApp = navigator.userAgent.toLowerCase().includes('kakaotalk');
    const handleOpenInChrome = () => {
        const isAndroid = /android/i.test(navigator.userAgent);
      
        if (isAndroid) {
          window.location.href =
            'intent://euphoria-psi.vercel.app/#Intent;scheme=https;package=com.android.chrome;end';
        } else {
          // iOS fallback → 그냥 새 탭으로 열기
          window.open(`https://euphoria-psi.vercel.app/preview?itemId=${itemId}` , '_blank');
        }
    };
    // ✅ 여기서 조건부로 화면 자체를 조기 종료 (오류 UI 렌더링)
    if (!inv || !inv.weddingDate) {
        return (
            <div style={{ padding: '30px', textAlign: 'center' }}>
            초대장 데이터를 불러오는 중 문제가 발생했습니다.
            </div>
        );
    }


    

   
  return (
    <>
          {/* <SEO title={inv.groomLastName + "와 " + inv.brideLastName} description={inv.mainTxt} image={mainImg} /> */}
        {/* Helmet으로 메타 태그 설정 */}
        {/* <Helmet>
            <title>{inv.groomLastName + "❤️" + inv.brideLastName + "의 결혼식"} </title>
            <meta property="og:title" content={inv.title || "청첩장 미리보기"} />
            <meta
            property="og:description"
            content={inv.description || "여기에 미리보기 텍스트 설명을 입력하세요."}
            />
            <meta property="og:image" content={mainImg || "기본 이미지 URL"} />
            <meta property="og:url" content={window.location.href} />
            <meta name="twitter:card" content="summary_large_image" />
        </Helmet> */}
        {isKakaoInApp && (
        <div className="inapp-notice">
            ⚠️ 카카오톡에서는 일부 기능이 정상 작동하지 않을 수 있어요.<br />
            👉<button
                onClick={handleOpenInChrome}
                style={{
                    color: '#fff',
                    backgroundColor: '#d58c98',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '10px 16px',
                    fontWeight: 'bold',
                }}
                >
                    브라우저에서 열기
                </button>
        </div>
        )}
        {inv.confirmedAt === null  && (
            <div className="watermark">
                <p>구매 후 워터마크를 제거해주세요.
                <br/>
                {/* <br/>2024.10.02 23:59까지 사용 가능합니다. */}
                <br/>
                {/* <br/>워터마크를 제거하셔도 무제한 수정이 가능합니다. */}
                </p>
                <div className="btn-wrap">
                    <a href="https://euphoriacard.co.kr/shop_view/?idx=3" className="watermark-buy">구매하러 가기</a>
                    {/* <a href="https://euphoriacard.co.kr/shop_view/?idx=3" className="watermark-remove">워터마크 제거하기</a>  */}
                </div>
            </div>
        )}
        
        {/* <div className="wedding-card"> */}

        {isPopupVisible && (
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

                                {inv.broomFatherPhone && (
                                <div style={{marginTop:"30px", marginBottom:"30px"}}>
                                    <p className="t2" >
                                        아버지 {inv.groomFatherFirstName}{inv.groomFatherLastName}
                                    </p>
                                    <p className="t3" style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"15px", position:"relative"}}>

                                        <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                            onClick={() => onClickPhoneCall(inv.broomFatherPhone)}>
                                            <CallIcon />
                                        </div>
                                        <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                            onClick={() => onClickSendSMS(inv.broomFatherPhone)}>
                                            <SmsIcon />
                                        </div>
                                    </p>
                                </div>
                                )}
                                
                                {inv.broomMotherPhone && (
                                <div style={{marginTop:"30px", marginBottom:"30px"}}>
                                    <p className="t2">
                                        어머니 {inv.groomMotherFirstName}{inv.groomMotherLastName}
                                    </p>
                                    <p className="t3" style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"15px", position:"relative"}}>

                                        <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                            onClick={() => onClickPhoneCall(inv.broomMotherPhone)}>
                                                <CallIcon />
                                        </div>
                                        <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                            onClick={() => onClickSendSMS(inv.broomMotherPhone)}>
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

                                {inv.brideFatherPhone && (
                                <div style={{marginTop:"30px", marginBottom:"30px"}}>
                                    <p className="t2" >
                                        아버지 {inv.brideFatherFirstName}{inv.brideFatherLastName}
                                    </p>
                                    <p className="t3" style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"15px", position:"relative"}}>

                                        <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                            onClick={() => onClickPhoneCall(inv.brideFatherPhone)}>
                                                <CallIcon />
                                        </div>
                                        <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                            onClick={() => onClickSendSMS(inv.brideFatherPhone)}>
                                            <SmsIcon />
                                        </div>
                                    </p>
                                </div>
                                )}

                                {inv.brideMotherPhone && (
                                <div style={{marginTop:"30px", marginBottom:"30px"}}>
                                    <p className="t2">
                                        어머니 {inv.brideMotherFirstName}{inv.brideMotherLastName}
                                    </p>
                                    <p className="t3" style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"15px", position:"relative"}}>

                                        <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                            onClick={() => onClickPhoneCall(inv.brideMotherPhone)}>
                                                <CallIcon />
                                        </div>
                                        <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}
                                            onClick={() => onClickSendSMS(inv.brideMotherPhone)}>
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

        {/* 방명록 */}
        {isGuestbookOpen && (
                <div className={`modal-overlay ${isGuestbookOpen ? 'active' : ''}`}>
                    <div className="guestbook-modal">
                    <div className="guestbook-header">
                        <h2>방명록 작성</h2>
                        <button className="close-btn" onClick={closeGuestbookModal}>✕</button>
                    </div>

                    <div className="guestbook-body">
                        <label htmlFor="name">성함</label>
                        <input
                            type="text"
                            className="input-sts"
                            value={guestbook.guestNm}
                            onChange={(e) => handleChange("guestNm", e.target.value)} // Update state
                        />

                        <label htmlFor="message">내용</label>
                        <textarea
                            className="textarea-sts"
                            rows="4"
                            value={guestbook.content} // Bind to invitationState
                            onChange={(e) => handleChange("content", e.target.value)} // Update state
                        ></textarea>

                        <label htmlFor="password">비밀번호</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="비밀번호 입력 (삭제 시 필요)" 
                            value={guestbook.pwd} // Bind to invitationState
                            onChange={(e) => handleChange("pwd", e.target.value)} // Update state
                        />

                        <button className="submit-btn" onClick={fetchGuestbook}>작성</button>
                    </div>
                    </div>
                </div>
        
        )}

        {showDeleteModal && (
        <div className="modal-overlay active">
            <div className="guestbook-modal">
            <div className="guestbook-header">
                <h2>방명록 삭제</h2>
                <button className="close-btn" onClick={() => setShowDeleteModal(false)}>✕</button>
            </div>
            <div className="guestbook-body">
                <label htmlFor="deletePwd">비밀번호 입력</label>
                <input
                type="password"
                id="deletePwd"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="작성 시 입력한 비밀번호를 입력해주세요."
                />
                <button
                className="submit-btn"
                onClick={() => handleConfirmDelete(deleteTargetIndex, deletePassword)}
                >
                삭제
                </button>
            </div>
            </div>
        </div>
        )}

        {selectedIndex && (
            <div className={`modal-overlay ${selectedIndex ? 'active' : ''}`}>
                <div className="gallery-modal" style={{width:"100%", height:"100%", maxWidth: "428px"}}>
                <div className="gallery-header">
                    <button className="close-btn" onClick={closeSlider}>✕</button>
                </div>
                <div className="gallery-body">

                    <GallerySlider 
                        images={gallImgs} 
                        showProgressBar={inv.galleryProgressBarVisible}
                        className=""
                        isPrv={"prv"}
                    />    
                </div>
                

                </div>
            </div>
        
        )}

        <div className="frame" style={{width: "100%", maxWidth: "428px", margin: "0 auto",  boxShadow:" 0 0 10px rgba(0, 0, 0, 0.1)", backgroundColor: "white" }}>
        {/* <button onClick={shareKakao}>카카오톡 공유</button> */}
            
            {/* 메인 */}
            {/* <div className="create-preview">
                <div className="noframe-wrap">
                    <div className="frame"> */}
                    <div className="frame"> 
                        <div className='kakao-wrap'>
                            <div className='kakao-box'>
                                <a id="kakaotalk-sharing-btn" href="javascript:;" onClick={shareKakao} className='kakaotalk-sharing-btn' >
                                    <img src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
                                    alt="카카오톡 공유 보내기 버튼"
                                    style={{width:"45px"}} />
                                </a>
                            </div>
                        </div>
                    
                        <section className="main" style={{height:"900px"}}> 
                            
                            <img className="bg" src={mainImg} alt="bg" />
                            <div className="cts">
                                <strong
                                    className="lettering type1"
                                    style={{
                                        color: inv.letteringClr,
                                        top: inv.letteringHg,
                                        display: inv.letteringMsg === 'type1' ? 'block' : 'none',
                                    }}
                                    >
                                    our<br />wedding<br />day
                                    </strong>
                                    <strong
                                    className="lettering type2"
                                    style={{
                                        color: inv.letteringClr,
                                        top: inv.letteringHg,
                                        display: inv.letteringMsg === "type2" ? 'block' : 'none',
                                    }}
                                    >
                                    We're getting<br />married!
                                    </strong>
                                    <strong
                                    className="lettering type3"
                                    style={{
                                        color: inv.letteringClr,
                                        top: inv.letteringHg,
                                        display: inv.letteringMsg === 'type3' ? 'block' : 'none',
                                    }}
                                    >
                                    Just married
                                </strong>
                                <strong
                                    className="lettering type4"
                                    style={{
                                        color: inv.letteringClr,
                                        top: inv.letteringHg, // 동적 스타일 적용
                                        display: inv.letteringMsg === 'type4' ? 'block' : 'none',
                                    }}
                                    >
                                    With love,<br /> always
                                </strong>
                                <strong
                                    className="lettering type5"
                                    style={{
                                        color: inv.letteringClr,
                                        top: inv.letteringHg, 
                                        display: inv.letteringMsg === 'type5' ? 'block' : 'none',
                                    }}
                                    >
                                    Happy <br />wedding<br /> day
                                </strong>

                                <strong
                                    className="lettering type6"
                                    style={{
                                        color: inv.letteringClr,
                                        top: inv.letteringHg, 
                                        display: inv.letteringMsg === 'type6' ? 'block' : 'none',
                                    }}
                                    >
                                    Our first page
                                </strong>
                                <strong
                                    className="lettering type7"
                                    style={{
                                        color: inv.letteringClr,
                                        top: inv.letteringHg, 
                                        display: inv.letteringMsg === 'type7' ? 'block' : 'none',
                                    }}
                                    >
                                    Happily ever after
                                </strong>

                                <p
                                    className="text"
                                    style={{
                                        color : inv.mainTxtClr,
                                        top: inv.mainTxtHg,
                                        fontFamily: "Nanum Myeongjo",
                                        wordWrap: "break-word", // 긴 단어를 자동으로 줄바꿈
                                        overflowWrap: "break-word", // 긴 단어가 깨지도록 줄바꿈
                                        whiteSpace: "normal", // 일반 줄바꿈 허용
                                    }}
                                    >
                                    {inv.mainTxt || ""}
                                </p>

                            </div>
                            
                        </section>

                        {/* 메인 하단 예식 정보 */}
                        {inv.mainWddInfoOnoff ? (
                        <section className="calendar" style={{textAlign: "center"}}>
                            <div style={{width:"300px", borderTop:"2px solid #c7c7c7",  borderBottom:"2px solid #c7c7c7", margin:"0 auto 20px", paddingTop:"20px", paddingBottom:"20px"}}>
                                <p className="info">{parseInt(inv.weddingDate.split("-")[0], 10)}년&nbsp;
                                                    {parseInt(inv.weddingDate.split("-")[1], 10)}월&nbsp;
                                                    {parseInt(inv.weddingDate.split("-")[2])}일&nbsp;
                                                    {/* {}요일 오후 {}시 */}
                                                    {getKoreanDateInfo(inv.weddingDate)}<br/>
                                                    {inv.weddingHallName || "예식장"}&nbsp;
                                </p>
                            </div>
                        </section>
                        ) : null}

                        {/* 글귀 */}
                        {inv.usePhrases ? (
                        <section className="calendar">
                            <div style={{margin:"10px"}}>
                                <span
                                className="infoP"
                                dangerouslySetInnerHTML={{ __html: inv.phrases }}
                                ></span>
                            </div>
                            
                        </section>
                        ) : null}

                        {/* 인사말 */}
                        {inv.useSalutations ? (
                        <section className="calendar">
                            <strong className="title">
                            {inv.salutationsTitle || "소중한 분들을 초대합니다."}</strong>
                            <div style={{margin:"10px"}}>
                                <span
                                className="infoP"
                                dangerouslySetInnerHTML={{ __html: inv.salutations }}
                                ></span>
                            </div>
                            {salutImg && (
                                <img 
                                src={salutImg || ""} 
                                alt="인사말" 
                                style={{
                                    visibility: salutImg ? "visible" : "hidden",
                                    width: "100%",             // 컨테이너에 맞춤
                                    height: "300px",           // 원하는 높이
                                    objectFit: "cover",        // 비율 유지 + 넘치는 부분 잘라냄
                                    objectPosition: `${inv.salutHrz}% ${inv.salutVtc}%`
                                }}
                                />
                            )}
                            
                        </section>
                        ) : null}
                        

                        {/* 프로필  */}
                        {inv.useProfile ? (
                        <section className="profile" id="profile">
                            <div className="profile-wrap" style={{marginTop : "70px"}}>
                                <div className="item">
                                    <div className="thumb">
                                        <img 
                                            className="bg"
                                            src={groomImg || ""} 
                                            alt="신랑이미지" 
                                            style={{
                                                objectFit: "cover",        // 비율 유지 + 넘치는 부분 잘라냄
                                                objectPosition: `${inv.groomHrz}% ${inv.groomVtc}%`
                                            }}
                                        />
                                    </div>
                                    <p className="t1"
                                    style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"3px", position:"relative"}}
                                    >
                                        <span className="blue">신랑</span>
                                    <strong>{inv.groomFirstName}{inv.groomLastName}</strong>
                                        {inv.groomPhoneNumber && (
                                                <div style={{marginLeft:"2px"}}
                                                onClick={() => onClickPhoneCall(inv.groomPhoneNumber)}>
                                                    <CallIcon />
                                                </div>
                                        )}
                                    </p>
                                    <p className="t2">{inv.groomIntroduction}</p>
                                    {/* <p className="t3"><span>신랑 아버지</span>의 {invitationState.groomRelationship}</p> */}
                                        <p className="t3">
                                            <span>
                                                {/* 고인표시 */}
                                                {inv.groomFatherDeceased ? (
                                                            <span>故</span> 
                                                ) : null}
                                                {inv.groomFatherFirstName}{inv.groomFatherLastName}
                                                

                                                {inv.groomFatherFirstName && (
                                                    <span>•</span> 
                                                )}

                                                {/* 고인표시 */}
                                                {inv.groomMotherDeceased ? (
                                                    <span>故</span> 
                                                ) : null}
                                                {inv.groomMotherFirstName}{inv.groomMotherLastName}
                                                

                                            </span>
                                            {inv.groomFatherFirstName &&(<>의</> )} {inv.groomRelationship}
                                        </p>
                                    
                                </div>
                                <div className="item">
                                    <div className="thumb">
                                        <img className="bg" src={brideImg || ""} alt=""
                                        style={{
                                            objectFit: "cover",        // 비율 유지 + 넘치는 부분 잘라냄
                                            objectPosition: `${inv.brideHrz}% ${inv.brideVtc}%`
                                        }} />
                                    </div>
                                    <p className="t1"
                                        style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"3px", position:"relative"}}
                                    >
                                        <span className="pink">신부</span>
                                        <strong>{inv.brideFirstName}{inv.brideLastName}</strong>
                                        {inv.bridePhoneNumber && (
                                                <div style={{marginLeft:"2px"}}
                                                onClick={() => onClickPhoneCall(inv.bridePhoneNumber)}>
                                                    <CallIcon />
                                                </div>
                                        )}
                                    </p>
                                    <p className="t2">{inv.brideIntroduction}</p>
                                        <p className="t3">
                                            <span>
                                                {/* 고인표시 */}
                                                {inv.brideFatherDeceased ? (
                                                    <span>故</span> 
                                                ) : null}
                                                {inv.brideFatherFirstName}{inv.brideFatherLastName}
                                                

                                                {inv.brideFatherFirstName && (
                                                    <span>•</span> 
                                                )}
                                                {/* 고인표시 */}
                                                {inv.brideMotherDeceased ? (
                                                    <span>故</span> 
                                                ) : null}
                                                {inv.brideMotherFirstName}{inv.brideMotherLastName}
                                                
                                            </span>
                                            {inv.brideFatherFirstName &&(<>의</> )} {inv.brideRelationship}
                                        </p>
                                </div>
                            </div>
                            {/* 목요일 이후 / 팝업 디자인 및 퍼블리싱 없음 */}
                            {/* <button className="btn">혼주에게 연락하기</button> */}
                        </section>
                        ) : null}


                        {inv.weddingHallName && (
                        <section className='calendar'>
                            <p className="info">{parseInt(inv.weddingDate.split("-")[0], 10)}년&nbsp;
                                                {parseInt(inv.weddingDate.split("-")[1], 10)}월&nbsp;
                                                {parseInt(inv.weddingDate.split("-")[2])}일&nbsp;
                                                {/* {}요일 오후 {}시 */}
                                                {getKoreanDateInfo(inv.weddingDate)}<br/>
                                                {inv.weddingHallName || ""}&nbsp;
                                                {inv.weddingHallFloorAndRoom || ""}<br/>
                                                <p 
                                                style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"5px", position:"relative"}}
                                                >
                                                    {inv.weddingHallAddress || ""}
                                                    {inv.weddingHallPhoneNumber && (
                                                        <strong onClick={() => onClickPhoneCall(inv.weddingHallPhoneNumber)}>
                                                            <CallIcon />
                                                        </strong>
                                                    )}
                                                </p>
                            </p>

                        </section>
                        )}

                        {/* 캘린더 */}
                        {inv.useCalendar ? (
                        <section className="calendar" id="calendar">
                                    
                            <strong className="title">{inv.calendarTitle || "예식 안내"}</strong>
                            
                            {inv.weddingDate && (
                            <p className="info">
                                                {/* {(inv.weddingDate?.substr(0, 4) || "")}년&nbsp;
                                                {(inv.weddingDate?.substr(6, 2) || "")}월&nbsp;
                                                {(inv.weddingDate?.substr(9, 2) || "")}일&nbsp; */}
                                                {(inv.weddingDate).substr(0, 4) || ""}년&nbsp;
                                                {(inv.weddingDate).substr(5, 2) || ""}월&nbsp;
                                                {(inv.weddingDate).substr(8, 2) || ""}일&nbsp;
                                                {/* {}요일 오후 {}시 */}
                                                {getKoreanDateInfo(inv.weddingDate)}<br/>
                                                {inv.weddingHallName || ""}&nbsp;
                                                {inv.weddingHallFloorAndRoom || ""}
                            </p>
                            )}

                            {inv.calendarImage && (
                                <img
                                    className="bg"
                                    src={calendarImg}
                                    alt="calbg"
                                    style={{ borderRadius: "60px", padding: "30px"}}
                                />  
                            )}



                            {/* <div className="month" data-aos="fade-up" data-aos-duration="600"> */}
                            {inv.weddingDate && (
                            <div className="month" >
                                <span className="month-title">{(inv.weddingDate).substr(5,2) || ""}월</span>
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
                                                    className={day ? (day === parseInt(inv.weddingDate.split("-")[2]) ? "target" : "") : ""}
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
                            )}

                            {inv.useDday ? (
                            <div
                                className={`d-day ${inv.useDday ? '' : 'hidden'}`}
                                style={{ display: inv.useDday ? 'block' : 'none' }}
                            >
                                <p className="point">
                                {/* <p className="point" data-aos="fade-up" data-aos-duration="600"> */}
                                    <span>{inv.groomLastName || "신랑"}</span>♥
                                    <span>{inv.brideLastName || "신부"}</span> 결혼식까지
                                </p>
                                <ul className="timer">
                                {/* <ul className="timer" data-aos="fade-up" data-aos-duration="600"> */}
                                    <li><span>{timeLeft.days}</span>Days</li>
                                    <li><span>{timeLeft.hours}</span>Hours</li>
                                    <li><span>{timeLeft.minutes}</span>Minutes</li>
                                    <li><span>{timeLeft.seconds}</span>Seconds</li>
                                </ul>
                            </div>
                        ) : null}
                        </section>
                        ) : null}

                        {/* 식전 영상 */}
                        {inv.useVideo ? (
                        <section className="calendar">
                            <strong className="title">
                            {/* <strong className="title" data-aos="fade-up" data-aos-duration="100"> */}
                            {inv.videoTitle || "식전 영상"}</strong>
                            <br/>
                            <div class="iframe-container" 
                                style={{ 
                                    width: "100%",
                                    maxWidth: "700px",
                                    textAlign: "center", 
                                    display: "flex", 
                                    justifyContent:"center",
                                    margin: "0 auto",
                                }}
                            >
                                <iframe 
                                    title="YouTube video player"
                                    style={{
                                        width: "100%", // Make it responsive to the container
                                        height: "300px", // Adjust height to your preference
                                        maxWidth: "700px", // Set maximum width
                                        border: "none",
                                    }}
                                    
                                    src={inv.videoUrl.replace("watch?v=", "embed/")}
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                ></iframe>
                            </div>
                        </section>
                        ) : null}

                        {/* [타임라인] useLoading 값의 true/false에 따라 이 섹션 활성화/비활성화 */}
                        {inv.useTimeLine && (
                        <section className="timeline">
                            <div className='title-wrap'>
                                <h2 className='timeline-title'>{inv.timeLineTitle}</h2>
                            </div>
                            
                            {tlList &&
                            tlList.map((list, index) => (
                                <div className={`item ${index % 2 === 0 ? 'row' : 'row-reverse'}`} key={index}>
                                <div className="left">
                                    {list.file && (
                                        <img
                                        className={inv.timeLineType === 'timeline1_2' ? 'bg-rectangle' : 'bg'}
                                        src={list.file}
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


                        {/* 갤러리 */}
                        {inv.useGallery ? (
                        // <section className="gallery">
                        //     {/* <strong className="title" data-aos="fade-up" data-aos-duration="600"> */}
                        //     <strong className="title">
                        //         {inv.galleryTitle || "갤러리"}
                        //     </strong>
                        //     {/* <div className="gallery-list" data-aos="fade-up" data-aos-duration="600"> */}
                        //     <div className="gallery-list">
                        //         {gallImgs &&
                        //             gallImgs.map((image, index) => (
                        //                 <div className="gallery-item" key={index} onClick={() => handleImageClick(image)}>
                        //                     <img src={image} alt={`gallery-${index}`} />
                        //                 </div>
                        //         ))}
                                
                        //     </div>
                        // </section>
                        <section className="gallery">
                            <strong className="title">
                                {inv.galleryTitle || "갤러리"}
                            </strong>
                            {/* 그리드 */}
                            {inv.galleryType === "grid" && (
                                <div className="gallery-list">
                                {gallImgs &&
                                    gallImgs.map((image, index) => (
                                        <div className="gallery-item" key={index} onClick={handleCircleImageClick}>
                                            <img src={image} alt={`gallery-${index}`} />
                                        </div>
                                    ))
                                }
                                </div>
                            )}    
                            {/* 서클 */}
                            {inv.galleryType === "circle" && (
                                <CircleGallery 
                                    images={gallImgs} 
                                    showProgressBar={inv.galleryProgressBarVisible}
                                    onImageClick={handleCircleImageClick}
                                    isPrv= {"prv"}
                                />    
                            )}
                                
                            {/* 슬라이드 */}
                            {inv.galleryType === "slide" && (
                                <GallerySlider images={gallImgs} showProgressBar={inv.galleryProgressBarVisible} isPrv= {"prv"}/>    
                            )}


                            {/* 그리드형 서클형 슬라이더 */}
                            {selectedIndex !== null && (
                                <GallerySlider images={gallImgs} showProgressBar={inv.galleryProgressBarVisible} isPrv= {"prv"}/>    
                            )}
                            
                        </section>

                        ) : null}
                        
                        {/* 웨딩 인터뷰 useInterview 값의 true/false에 따라 이 섹션 활성화/비활성화화 */}
                        {inv.useInterview && (
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



                        {/* 안내문 */}
                        {inv.useNotice ? (
                        <section className="infomation">
                            {/* <div className="infomation-box" data-aos="fade-up" data-aos-duration="600"> */}
                            <div className="infomation-box">
                                <strong className="title">{inv.noticeTitle || "안내문"}</strong>
                                <p>
                                    {inv.noticeContent}
                                </p>
                                {/* 목요일 구현  */}
                                {/* <a href="#" className="btn">버튼</a> */}
                            </div>
                        </section>
                        ) : null}
                        


                        {/* 화환보내기 */}
                        {inv.useFlower ? (
                        <section className="flower">
                            {/* <div className="flower-box" data-aos="fade-up" data-aos-duration="600"> */}
                            <div className="flower-box" onClick={onClickFlower}>
                                <img src={flower} alt="화환"/>
                                <div className="text">
                                    <strong className="title">축하 화환 보내기</strong>
                                    <p>축하의 마음을 담아 전해보세요.</p>
                                </div>
                            </div>
                        </section>
                        ) : null}


                        {/* 함꼐한 시간 */}
                        {inv.useFirstMeetTime ? (
                        <section className="our-time">
                            {/* <span className="title" data-aos="fade-up" data-aos-duration="600">함께한 시간</span>
                            <p className="timer" data-aos="fade-up" data-aos-duration="600">{elapsedTime}</p> */}
                            <strong className="title">함께한 시간</strong>
                            <p className="timer" >{elapsedTime}</p>
                        </section>
                        ) : null}



                        {/* 오시는길 */}
                        {inv.useMap ? (
                        <section className="directions">
                            {/* <strong className="title" data-aos="fade-up" data-aos-duration="600">오시는 길</strong>
                            <div className="info" data-aos="fade-up" data-aos-duration="600"> */}
                            <strong className="title" >오시는 길</strong>
                            <div className="info" >
                                <strong className="name">
                                    {inv.weddingHallName || "예식장 이름"}
                                    {/* <a href="#" className="call"></a> */}
                                    {inv.weddingHallPhoneNumber && (
                                            <div style={{marginLeft:"4px"}} className="call"
                                            onClick={() => onClickPhoneCall(inv.weddingHallPhoneNumber)}>
                                                <CallIcon />
                                            </div>
                                    )}
                                </strong>
                                <p className="place">{inv.weddingHallFloorAndRoom || "OOO홀"}</p>
                                <p className="address">{ inv.weddingHallAddress||"경기 성남시 분당구 판교역로 4"}</p>
                                {inv.useMap ? (
                                <div>
                                    <div className="map">
                                        {/* <div
                                            id="map"
                                            style={{
                                                width: "100%",
                                                height: inv.mapHeight || "400px", // 기본 높이
                                            }}
                                        ></div> */}
                                        <MapComponent 
                                            mapId="map2" 
                                            address={inv.weddingHallAddress} 
                                            mapHeight={inv.mapHeight} 
                                            mapFix={inv.mapFix}
                                        />
                                    </div>
                                </div>
                                ) : null}
                                {!inv.navigationRemove ? (
                                <div className="map-btns">
                                    <a 
                                        href={`tmap://search?name=${encodeURIComponent(inv.weddingHallAddress)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="map-btn"
                                    >
                                        <img src={map_t} alt=""/>티맵
                                    </a>
                                    <a 
                                        href={`kakaonavi://search?q=${encodeURIComponent(inv.weddingHallAddress)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="map-btn"
                                    >
                                        <img src={map_kakao} alt=""/>카카오 내비
                                    </a>
                                    <a 
                                        href={`nmap://search?query=${encodeURIComponent(inv.weddingHallAddress)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="map-btn"
                                    >
                                        <img src={map_naver} alt=""/>네이버 지도
                                    </a>
                                </div>
                                ) : null}
                            </div>
                        </section>
                        ) : null}



                        {/* 교통수단 */}
                        {inv.useTransportation ? (
                        <section className="transportion">
                            {trsptList &&
                                trsptList.map((list, index) => (
                                    <div key={index}>
                                        {/* <span className="title" data-aos="fade-up" data-aos-duration="1000">{list.method}</span>
                                        <p className="text" data-aos="fade-up" data-aos-duration="1000">{list.details}</p> */}
                                        <span className="title" >{list.method}</span>
                                        <p className="text" >{list.details}</p> 
                                    </div>
                            ))}
                        </section>
                        ) : null}

                        {/* [계좌번호] useAcnt 값의 true/false에 따라 이 섹션 활성화/비활성화 */}
                        {inv.useAcnt && (
                        <section className="calendar">
                            <div >
                                <span className="title" >{inv.acntTitle}</span>
                                <div style={{margin:"10px"}}>
                                    <span
                                        className="infoP"
                                        dangerouslySetInnerHTML={{ __html: inv.acntContent}}
                                    ></span>
                                </div>
                            </div>
                                {inv.brmAcnt && (
                                    <div className="item" style={{border: "1px solid #c2c0c0", margin:"10px", padding:"10px"}}>
                                        <div className="blue-acnt" style={{borderBottom:"1px solid #c2c0c0", paddingBottom:"2px"}}>신랑</div>
                                        <div className="font-acnt">
                                            <span>{inv.brmNm}</span>
                                        </div>
                                        <div className="font-acnt">
                                            <span>{inv.brmBank}&nbsp;</span>
                                            <span>{inv.brmAcnt}</span>
                                        </div>
                                    </div>
                                )}
                                {inv.brdAcnt && (
                                    <div className="item" style={{border: "1px solid #c2c0c0", margin:"10px", padding:"10px"}}>
                                        <div className="pink-acnt" style={{borderBottom:"1px solid #c2c0c0", paddingBottom:"2px"}}>신부</div>
                                        <div className="font-acnt">
                                            <span>{inv.brdNm}</span>
                                        </div>
                                        <div className="font-acnt">
                                            <span>{inv.brdBank}&nbsp;</span>
                                            <span>{inv.brdAcnt}</span>
                                        </div>
                                    </div>
                                )}
                                {inv.brmfAcnt && (
                                    <div className="item" style={{border: "1px solid #c2c0c0", margin:"10px", padding:"10px"}}>
                                        <div className="blue-acnt" style={{borderBottom:"1px solid #c2c0c0", paddingBottom:"2px"}}>신랑 아버지</div>
                                        <div className="font-acnt">
                                            <span>{inv.brmfNm}</span>
                                        </div>
                                        <div className="font-acnt">
                                            <span>{inv.brmfBank}&nbsp;</span>
                                            <span>{inv.brmfAcnt}</span>
                                        </div>
                                    </div>
                                )}
                                {inv.brmmAcnt && (
                                    <div className="item" style={{border: "1px solid #c2c0c0", margin:"10px", padding:"10px"}}>
                                        <div className="blue-acnt" style={{borderBottom:"1px solid #c2c0c0", paddingBottom:"2px"}}>신랑 어머니</div>
                                        <div className="font-acnt">
                                            <span>{inv.brmmNm}</span>
                                        </div>
                                        <div className="font-acnt">
                                            <span>{inv.brmmBank}&nbsp;</span>
                                            <span>{inv.brmmAcnt}</span>
                                        </div>
                                    </div>
                                )}
                                {inv.brdfAcnt && (
                                    <div className="item" style={{border: "1px solid #c2c0c0", margin:"10px", padding:"10px"}}>
                                        <div className="pink-acnt" style={{borderBottom:"1px solid #c2c0c0", paddingBottom:"2px"}}>신부 아버지</div>
                                        <div className="font-acnt">
                                            <span>{inv.brdfNm}</span>
                                        </div>
                                        <div className="font-acnt">
                                            <span>{inv.brdfBank}&nbsp;</span>
                                            <span>{inv.brdfAcnt}</span>
                                        </div>
                                    </div>
                                )}
                                {inv.brdmAcnt && (
                                    <div className="item" style={{border: "1px solid #c2c0c0", margin:"10px", padding:"10px"}}>
                                        <div className="pink-acnt" style={{borderBottom:"1px solid #c2c0c0", paddingBottom:"2px"}}>신부 어머니</div>
                                        <div className="font-acnt">
                                            <span>{inv.brdmNm}</span>
                                        </div>
                                        <div className="font-acnt">
                                            <span>{inv.brdmBank}&nbsp;</span>
                                            <span>{inv.brdmAcnt}</span>
                                        </div>
                                    </div>
                                )}
                                
                                
                            
                        </section>
                        )}
                        

                        {inv.useGuestbook && (
                        <section className="guestbook">
                            <div className="guestbook-empty">
                            <h2 className="guestbook-title">방명록</h2>

                            {guestbookList && guestbookList.length > 0 ? (
                                <>
                                {(showAllGuestbooks ? guestbookList : guestbookList.slice(0, 3)).map((item, index) => (
                                    <div className="guestbook-item" key={index}>
                                        <div className="top">
                                            <span className="name">{item.guestNm}</span>
                                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                <span className="date">{item.createAt}</span>
                                                <button
                                                    className="delete-trigger"
                                                    onClick={() => {
                                                        setDeleteTargetIndex(index);
                                                        setShowDeleteModal(true);
                                                    }}
                                                >✕</button>
                                            </div>
                                        </div>
                                        <p className="message">{item.content}</p>

                                    </div>
                                ))}
                                </>
                            ) : (
                                <p className="guestbook-message">
                                아직 작성된 방명록이 없습니다.<br />
                                첫 방명록을 작성해주세요.
                                </p>
                            )}

                            <div className="guestbook-buttons">
                                {/* <button className="btn-outline">전체보기</button> */}
                                <button className="btn-outline" onClick={() => setShowAllGuestbooks(!showAllGuestbooks)}>
                                {showAllGuestbooks ? '접기' : '전체보기'}
                                </button>
                                <button className="btn-primary" onClick={openGuestbookModal}>
                                작성
                                </button>
                            </div>
                            </div>
                        </section>
                        )}
                        
                        {/* [안내사항] useInfo 값의 true/false에 따라 이 섹션 활성화/비활성화 */}
                        {inv.useInfo && (
                            <section className="calendar">
                            {infoList &&
                                infoList.map((list, index) => (
                                    <div key={index}  style={{marginTop:"30px"}} >
                                        <strong className="title">{list.title || ""}</strong>
                                        {list.file && (
                                            <img
                                            className="bg"
                                            src={list.file }
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
                    
                        {/* 엔딩 */}
                        {/* <section className="land" data-aos="fade-up" data-aos-duration="600"> */}
                        {inv.useEnding ? (
                        <section className="land">
                            <img className="bg" src={endingImg || ""} alt="bg" />
                            <p className="text" 
                                style={{top: inv.endingHg}}>
                                {inv.endingContent}
                            </p>
                        </section>
                        ) : null}
                        
                    </div>    
            {/* </div>         
            </div> */}

            {/* <BasicModal /> */}
            
        </div>
    </>
  ) }


export default PreviewPage;