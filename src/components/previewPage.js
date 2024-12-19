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
    const index = searchParams.get('index');
    const confirm = searchParams.get('confirm');
    
    const [trsptList, setTrsptList] = useState([]);
    const [galList, setGalList] = useState([]);
    const [inv, setInv] = useState({});

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
            const response = await axios.post("https://api.euphoriacard.co.kr/api/invitation/detail", itemId,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
        
            console.log("Response Data: ", response.data);

            setTrsptList(response.data.tvolist);
            setInv(response.data.ivo);
            setGalList(response.data.gvolist);
            
        } catch (error) {
            console.error("Error fetching order list: ", error);
        }
    }

    useEffect(() => {
        setImg();
    }, [galList]);
    
    useEffect(() => {
    }, [trsptList]);

    useEffect(() => {
        generateCalendar(inv.weddingDate);
    }, [inv]);
    
    const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 }); // 기본 좌표
    const [address, setAddress] = useState("경기 성남시 분당구 판교역로 4"); // 기본 주소
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        setAddress(inv.weddingHallAddress)
        // 주소 검색
        geocoder.addressSearch(address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const coords = { lat: parseFloat(result[0].y), lng: parseFloat(result[0].x) };
                setMapCenter(coords);
                setLoading(false);
            } else {
                console.error("Geocoder failed: ", status);
                setLoading(false);
            }
        });
    }, [address]);


    const onClickFlower = () => {
        var url = inv.sendWreathUrl 
        window.location.href = url;
    }

     // 전화하기 함수 
     const onClickPhoneCall = (phoneNumber) =>{
        if (!phoneNumber) {
            return;
        }
        window.location.href = `tel:${phoneNumber}`;
    }

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
    
            setElapsedTime(`${years}년 ${months}개월 ${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
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
      
        // 최종 문자열 생성
        return `${dayOfWeek}  ${period}  ${twelveHourFormat}시  ${minutes}분`;

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
    const [gallImgs, setGallImgs] = useState([]); // 상태로 설정
    
    function setImg() {

        const newImages = [];
        galList.forEach(img => {
            const fixedFilename = encodeURIComponent((img.pic1).replace(/\\/g, '/'));
            const imageUrl = `https://api.euphoriacard.co.kr/api/image?filename=${fixedFilename}`;
            switch(img.type){
                case "main" : 
                    setMainImg(imageUrl);
                    break;
                case "bride" : 
                    setBrideImg(imageUrl);
                    break;
                case "groom" : 
                    setGroomImg(imageUrl);
                    break;
                case "calendar" : 
                    setCalendarImg(imageUrl);
                    break;
                case "ending" : 
                    setEndingImg(imageUrl);
                    break;
                case "gallery":
                    newImages.push(imageUrl);
                    break;
                default:
                    break;
            }
        });
        
        setGallImgs(newImages); // 상태 업데이트
        
    }
    useEffect(() => {
        if (gallImgs.length > 0) {
            setImg();
        }
    }, [gallImgs]); // gallist가 업데이트되면 setImg 호출



  return (
    <>
        {/* confirmCnt가 0일 경우에만 watermark를 표시 */}
        {confirm != 'Y'  && (
            <div className="watermark">
                <p>구매 후 워터마크를 제거해주세요.
                <br/>
                {/* <br/>2024.10.02 23:59까지 사용 가능합니다. */}
                <br/>
                {/* <br/>워터마크를 제거하셔도 무제한 수정이 가능합니다. */}
                </p>
                <div className="btn-wrap">
                    <a href="https://euphoriacard.co.kr/shop_view/?idx=3" className="watermark-buy">구매하러 가기</a>
                    <a href="https://euphoriacard.co.kr/shop_view/?idx=3" className="watermark-remove">워터마크 제거하기</a>
                </div>
            </div>
        )}
        
        {/* <div className="wedding-card"> */}
        <div className="frame" style={{width: "100%", maxWidth: "428px", margin: "0 auto",  boxShadow:" 0 0 10px rgba(0, 0, 0, 0.1)", backgroundColor: "white" }}>
            
            {/* 메인 */}
            {/* <div className="create-preview">
                <div className="noframe-wrap">
                    <div className="frame"> */}
                    <div className="frame"> 
                        
                        <section className="main" style={{height:"900px"}}> 
                            {/* <div className="cardbg-img">
                                <img src={typo} className="main-typo"/>
                                <img src={page3_bg} className="marry-main-bg"/> 
                            </div>
                            <div className="info-card">
                                <div className="title-name">
                                    <p>김견우</p>
                                    <p>그리고</p>
                                    <p>임직녀</p>
                                </div>
                                <div className="name-txt">
                                    <strong>김견우</strong><span className="cursive">and</span><strong> 임직녀</strong>
                                    <div className="m-days">
                                        <div className="wedding-info">
                                            <span className="marry-year">2024년</span>
                                            <span className="marry-month">10월</span>
                                            <span className="marry-date">31일</span>
                                            <span className="marry-day">목요일</span>
                                            <span className="marry-hour">오후 1시</span>
                                        </div>
                                        <p className="marry-location">아가테아트 1층 팬톤홀</p>
                                    </div>
                                </div>
                            </div> */}

                            <img className="bg" src={mainImg} alt="bg" />
                            <div className="cts">
                                <strong
                                    className="lettering type1"
                                    style={{
                                        color: inv.letteringClr,
                                        top: '18%',
                                        display: inv.letteringMsg === 'our wedding day' ? 'block' : 'none',
                                    }}
                                    >
                                    our<br />wedding<br />day
                                    </strong>
                                    <strong
                                    className="lettering type2"
                                    style={{
                                        color: inv.letteringClr,
                                        top: '22%',
                                        display: inv.letteringMsg === "We're getting married_1" ? 'block' : 'none',
                                    }}
                                    >
                                    We're getting<br />married!
                                    </strong>
                                    <strong
                                    className="lettering type3"
                                    style={{
                                        color: inv.letteringClr,
                                        top: '26%',
                                        display: inv.letteringMsg === 'Just married' ? 'block' : 'none',
                                    }}
                                    >
                                    Just married
                                </strong>

                                <p
                                    className="text"
                                    style={{
                                        color : inv.mainTxtClr,
                                        top: "55%",
                                        wordWrap: "break-word", // 긴 단어를 자동으로 줄바꿈
                                        overflowWrap: "break-word", // 긴 단어가 깨지도록 줄바꿈
                                        whiteSpace: "normal", // 일반 줄바꿈 허용
                                    }}
                                    >
                                    {inv.mainTxt || ""}
                                </p>

                            </div>
                            
                        </section>

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
                                        />
                                    </div>
                                    <p className="t1"><span className="blue">신랑</span><strong>{inv.groomFirstName}{inv.groomLastName}</strong></p>
                                    <p className="t2">{inv.groomIntroduction}</p>
                                    {/* <p className="t3"><span>신랑 아버지</span>의 {invitationState.groomRelationship}</p> */}

                                        <p className="t3">
                                            <span>
                                                {inv.groomFatherFirstName}{inv.groomFatherLastName}

                                                {inv.groomFatherFirstName && (
                                                    <span>•</span> 
                                                )}

                                                {inv.groomMotherFirstName}{inv.groomMotherLastName}
                                            </span>
                                            {inv.groomFatherFirstName &&(<>의</> )} {inv.groomRelationship}
                                        </p>
                                    
                                </div>
                                <div className="item">
                                    <div className="thumb">
                                        <img 
                                            className="bg"
                                            src={brideImg || ""} 
                                            alt="신부이미지" 
                                        />

                                    </div>
                                    <p className="t1"><span className="pink">신부</span><strong>{inv.brideFirstName}{inv.brideLastName}</strong></p>
                                    <p className="t2">{inv.brideIntroduction}</p>
                                        <p className="t3">
                                            <span>
                                                {inv.brideFatherFirstName}{inv.brideFatherLastName}
                                                {inv.brideFatherFirstName && (
                                                    <span>•</span> 
                                                )}
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
                                                {inv.weddingHallFloorAndRoom || ""}
                                                {inv.weddingHallAddress || ""}
                                                {inv.weddingHallPhoneNumber && (
                                                    <strong onClick={() => onClickPhoneCall(inv.weddingHallPhoneNumber)}>📞</strong>
                                                )}
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

                            <div
                                className={`d-day ${inv.useDday ? '' : 'hidden'}`}
                                style={{ display: inv.useDday ? 'block' : 'none' }}
                            >
                                <p className="point" data-aos="fade-up" data-aos-duration="600">
                                    <span>{inv.groomLastName || "신랑"}</span>♥
                                    <span>{inv.brideLastName || "신부"}</span> 결혼식까지
                                </p>
                                <ul className="timer" data-aos="fade-up" data-aos-duration="600">
                                    <li><span>{timeLeft.days}</span>Days</li>
                                    <li><span>{timeLeft.hours}</span>Hours</li>
                                    <li><span>{timeLeft.minutes}</span>Minutes</li>
                                    <li><span>{timeLeft.seconds}</span>Seconds</li>
                                </ul>
                            </div>
                        </section>
                        ) : null}


                        {/* 갤러리 */}
                        {inv.useGallery ? (
                        <section className="gallery">
                            {/* <strong className="title" data-aos="fade-up" data-aos-duration="600"> */}
                            <strong className="title">
                                {inv.galleryTitle || "갤러리"}
                            </strong>
                            {/* <div className="gallery-list" data-aos="fade-up" data-aos-duration="600"> */}
                            <div className="gallery-list">
                                {gallImgs &&
                                    gallImgs.map((image, index) => (
                                        <div className="gallery-item" key={index}>
                                            <img src={image} alt={`gallery-${index}`} />
                                        </div>
                                ))}
                                
                            </div>
                        </section>
                        ) : null}
                        



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
                        {inv.useDirections ? (
                        <section className="directions">
                            {/* <strong className="title" data-aos="fade-up" data-aos-duration="600">오시는 길</strong>
                            <div className="info" data-aos="fade-up" data-aos-duration="600"> */}
                            <strong className="title" >오시는 길</strong>
                            <div className="info" >
                                <strong className="name">
                                    {inv.weddingHallName || "예식장 이름"}
                                    {/* <a href="#" className="call"></a> */}
                                </strong>
                                <p className="place">{inv.weddingHallFloorAndRoom || "OOO홀"}</p>
                                <p className="address">{ inv.weddingHallAddress||"경기 성남시 분당구 판교역로 4"}</p>
                                {/* <div className="map" id="map" ></div> */}
                                {/* <Map 
                                    center={{ lat: 37.5665, lng: 126.978 }} // 기본 좌표 설정 (서울시청 예시)
                                    style={{ width: "100%", height: "400px" }}
                                    level={3}
                                >
                                    <MapMarker position={{ lat: 37.5665, lng: 126.978 }}>
                                    <div style={{ padding: "5px", color: "#000" }}>
                                        {inv.weddingHallName || "예식장"}
                                    </div>
                                    </MapMarker>
                                </Map>
                                 */}
                                 <Map center={mapCenter} style={{ width: "100%", height: "400px" }} level={3}>
                                    <MapMarker position={mapCenter}>
                                        <div style={{ padding: "5px", color: "#000" }}>{inv.weddingHallName}</div>
                                    </MapMarker>
                                </Map>
                                {/* <div className="map-btns">
                                    <a href="#" className="map-btn"><img src={map_t} alt=""/>티맵</a>
                                    <a href="#" className="map-btn"><img src={map_kakao} alt=""/>카카오 내비</a>
                                    <a href="#" className="map-btn"><img src={map_naver} alt=""/>네이버 지도</a>
                                </div> */}
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


                        {/* 엔딩 */}
                        {/* <section className="land" data-aos="fade-up" data-aos-duration="600"> */}
                        {inv.useEnding ? (
                        <section className="land">
                            <img className="bg" src={endingImg || ""} alt="bg" />
                            <p className="text">
                                {inv.endingContent}
                            </p>
                        </section>
                        ) : null}

                    </div>    
            {/* </div>         
            </div> */}


            
        </div>
    </>
  ) }


export default PreviewPage;