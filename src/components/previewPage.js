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
    }, [inv]);
    
    // -------------------------------------------------------------------------------------------------
    // *********************************[메인] 배경이미지************************************************
    // -------------------------------------------------------------------------------------------------
    const [mainImg, setMainImg] = useState(); // Default image
    const [brideImg, setBrideImg] = useState(); // Default image
    const [groomImg, setGroomImg] = useState(); // Default image

    function setImg() {
        galList.forEach(img => {
            const fixedFilename = encodeURIComponent((img.pic1).replace(/\\/g, '/'));
            const imageUrl = `https://api.euphoriacard.co.kr/api/image?filename=${fixedFilename}`;
            switch(img.type){
                case "main" : 
                    setMainImg(imageUrl);
                case "bride" : 
                    setBrideImg(imageUrl);
                case "groom" : 
                    setGroomImg(imageUrl);
            }
        });
        
    }


  return (
    <>
        {/* confirmCnt가 0일 경우에만 watermark를 표시 */}
        {confirm != 'Y'  && (
            <div className="watermark">
                <p>구매 후 워터마크를 제거해주세요. {confirmCnt}
                <br/>
                <br/>2024.10.02 23:59까지 사용 가능합니다.
                <br/>
                <br/>워터마크를 제거하셔도 무제한 수정이 가능합니다.</p>
                <div className="btn-wrap">
                    <a href="https://euphoriacard.co.kr/shop_view/?idx=3" className="watermark-buy">구매하러 가기</a>
                    <a href="https://euphoriacard.co.kr/shop_view/?idx=3" className="watermark-remove">워터마크 제거하기</a>
                </div>
            </div>
        )}
        
        <div className="wedding-card">

            {/* 메인 */}
            {/* <div className="create-preview">
                <div className="noframe-wrap">
                    <div className="frame"> */}
                    <div className="frame"> 
                        
                        <section className="main"> 
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
                        <section className="main">
                            <div className="profile-wrap">
                                <div className="item">
                                    <div className="thumb">
                                        <img 
                                            src={galList.groom || ""} 
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
                                            src={galList.bride || ""} 
                                            alt="신랑이미지" 
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

                    </div>    
            {/* </div>         
            </div> */}


            
        </div>
    </>
  ) }


export default PreviewPage;