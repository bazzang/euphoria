import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate import
import axios from 'axios';
import "../styles/common.css";
import "../styles/contents.css";
import wd_thumb from "../images/list/wd_thumb.png";
import wd_option_icon_1 from '../images/list/wd_option_icon_1.svg';
import wd_option_icon_2 from '../images/list/wd_option_icon_2.svg';
import wd_option_icon_3 from '../images/list/wd_option_icon_3.svg';
import wd_option_icon_4 from '../images/list/wd_option_icon_4.svg';
import wd_option_icon_5 from '../images/list/wd_option_icon_5.svg';
import FormDialog, { openDialog } from "./dialog.js";
function ProductionList() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const { ordererNm, ordererCall } = location.state || {}; // 저장 후 제작 내역으로 왔을 경우 
    const [orderList, setOrderList] = useState([]);
    const [orderDetailCnt, setOrderDetailCnt] = useState(0); // 배송완료 count  제일 먼저 제작한 청첩장부터 워터마크를 제거한다
    // 페이지 로드 시 다이얼로그 열기
    useEffect(() => {
            openDialog();
    }, []);


    // 주문자정보로 청첩장 제작 목록 가져오기 
    const handleDialogConfirm = async (data) => {
        sessionStorage.setItem('ordererName', data.ordererName);
        sessionStorage.setItem('ordererCall', data.ordererCall);
        
        try {
            const response = await axios.post("https://api.euphoriacard.co.kr/api/list",
              {
                ordererNm: data.ordererName,
                ordererCall: data.ordererCall,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
        
            console.log("Response Data: ", response.data);

            if(response.data){
                setOrderList(response.data.ovolist);
                setOrderDetailCnt(response.data.orderDetailCnt);
            }
            
        } catch (error) {
            console.error("리스트 가져오기 에러1: ", error);
            
            if(error.response.data?.error?.errorCode === "30102" || error.response.data?.error?.errorCode === "30101" ){
                alert("토큰이 만료 되었습니다.")
                const authUrl =
                'https://openapi.imweb.me/oauth2/authorize?responseType=code&clientId=aaa77bb6-2ab9-4836-8a26-8c58079959dc&redirectUri=https://euphoria-psi.vercel.app/&scope=member-info:read order:read&siteCode=S2024082926c7c40e12877';
            
                window.location.href = authUrl;
                localStorage.setItem("isAccessToken", null);
                
            }else{
                console.log('리스트 가져오기 에러2: ', error)
                alert("오류가 발생하였습니다.")
            }
            
        }
    }

    useEffect(() => {
        orderList.forEach((ord, idx) => {
            if((idx+1) <= orderDetailCnt){
                ord.confirmYn = 'Y'
            }
        });
    }, [orderDetailCnt]);

    useEffect(() => {
    }, [orderList]);


    // 사용기간 시간 계산 
    function formattedDate (date) {
        const createdDate = new Date(date);
        createdDate.setDate(createdDate.getDate() + 7);
        createdDate.setHours(createdDate.getHours() + 9);
        return createdDate.toISOString().replace("T", " ").slice(0, 19);
    }

    // url 복사하기 
    const copyToClipboard = (url) => {
        navigator.clipboard
            .writeText(url)
            .then(() => {
                alert("URL이 클립보드에 복사되었습니다!");
            })
            .catch((err) => {
                console.error("클립보드 복사 실패: ", err);
                alert("URL 복사에 실패했습니다.");
            });
    };

    
  return (
    <>
    <FormDialog disableBackdropClick={true} hideCancelButton={true} onSave={handleDialogConfirm}/>
    <div className="contents-wrap">

            <div className="container">
                <div className="using">
                    <strong className="using-title">이용기간 안내</strong>
                    <ul className="using-list">
                        <li>예식 후 <strong>30일까지</strong> 이용 가능합니다.</li>
                        <li>예식일 <strong> 335일(11개월) 전부터</strong> 제작이 가능합니다.</li>
                        {/* <li>워터마크 미제거 청첩장은 <strong>7일</strong>이 지나면 자동으로 삭제됩니다.</li> */}
                    </ul>
                </div>
                <div className="list-btn">
                    <button className="btn-create" onClick={() => navigate('/')}>제작하기</button>
                </div>
                <strong className="list-title">모바일 청첩장</strong>
                <div className="wd-list"> 
            
                {orderList.length === 0 ? (
                    <div className="wd-item">
                            직접 꾸미는 나만의 청첩장, 이 세상에 하나밖에 없는 청첩장을 제작해보세요.
                        
                    </div>
                ) : (
                orderList.map((item, index) => (

                    <div className="wd-item" key={item.id || index}>
                        <div className="wd-thumb"
                        
                        style={{
                            backgroundImage: `url('data:image/jpeg;base64,${item.imageData}')`,
                            backgroundSize: "cover",        // 비율을 유지하면서 요소를 채움
                            backgroundPosition: "center",   // 이미지를 중앙 정렬
                            backgroundRepeat: "no-repeat",  // 이미지 반복 방지
                            width: "260px",                 // 너비 설정
                            height: "350px",                // 높이 설정
                            borderRadius: "10px",           // 모서리 둥글게
                            boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.15)", // 그림자 효과
                        }}>
                            {/* <img src={`data:image/jpeg;base64,${item.imageData}`} alt="" /> */}
                            {/* <div
                            style={{
                                backgroundImage: `url('data:image/jpeg;base64,${item.imageData}')`,
                                backgroundSize: "cover",        // 비율을 유지하면서 요소를 채움
                                backgroundPosition: "center",   // 이미지를 중앙 정렬
                                backgroundRepeat: "no-repeat",  // 이미지 반복 방지
                                width: "100px",                 // 너비 설정
                                height: "300px",                // 높이 설정
                                borderRadius: "10px",           // 모서리 둥글게
                                boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.15)", // 그림자 효과
                            }}
                            ></div> */}
                        </div>
                        <div className="wd-contents">
                            <div className="wd-info">
                                <div>
                                    <strong className="wd-title">{item.ordererNm}님의 청첩장-{index +1}</strong>
                                    <ul className="wd-desc">
                                        {/* <li>2024. 09. 01 21:30 제작</li>  */}
                                        <li>{item.createdAt} 제작</li> 
                                        <li>워터마크 제거여부 : <strong>제거안함</strong></li> 
                                        <li>사용기간 : <span className="red">{formattedDate(item.createdAt)}</span> 까지</li> 
                                    </ul>
                                </div>
                                {/* <div className="wd-btn">
                                    <button className="wd-btn-gray">복제</button>
                                    <button className="wd-btn-blue">수정</button>
                                    <button className="wd-btn-red">삭제</button>
                                </div> */}
                            </div>
                            <div className="wd-etc">
                                <div className="wd-option">
                                    {/* <button className="wd-option-btn" onClick={() => navigate('/preview')}><img src={wd_option_icon_1} alt=""/>청첩장 확인하기</button> */}
                                    <button
                                    className="wd-option-btn"
                                    // onClick={() => navigate('/preview', { state: { item  } })}
                                    onClick={() => {
                                        // orderDetailCnt 값에 따라 orderList의 데이터를 준비
                                        const selectedItems = orderList.slice(0, orderDetailCnt);
                                        navigate(`/preview?itemId=${item.invSeq}&index=${index}&confirm=${item.confirmYn}`);
                                        // 선택된 데이터와 orderDetailCnt를 함께 전달
                                        // navigate('/preview', {
                                        //   state: {
                                        //     item,
                                        //     selectedItems: selectedItems, // 선택된 인덱스 데이터
                                        //     orderDetailCnt,       // orderDetailCnt 값
                                        //   },
                                        // });
                                        
                                      }}
                                    >
                                        <img src={wd_option_icon_1} alt="" />청첩장 확인하기
                                    </button>
                                    {/* <button className="wd-option-btn"><img src={wd_option_icon_2} alt=""/>참석여부 확인</button> */}
                                    <button className="wd-option-btn"
                                        onClick={() => {
                                            const url = `${window.location.origin}/preview?itemId=${item.invSeq}&index=${index}&confirm=${item.confirmYn}`;
                                            copyToClipboard(url);
                                        }}
                                    >
                                        <img src={wd_option_icon_3} alt=""/>URL 복사하기
                                    </button>
                                    {/* <button className="wd-option-btn"><img src={wd_option_icon_4} alt=""/>카톡 공유하기</button> */}
                                    {/* <button className="wd-option-btn"><img src={wd_option_icon_5} alt=""/>QR코드</button> */}
                                </div>
                                {/* <div className="wd-btn">
                                    <button className="wd-btn-gray">워터마크 제거하기</button>
                                </div>   */}
                            </div>
                        </div> 
                    </div>
                ))
                )}

                    {/* <div className="wd-item">
                        <div className="wd-thumb">
                            <img src={wd_thumb} alt=""/></div>
                        <div className="wd-contents">
                            <div className="wd-info">
                                <div>
                                    <strong className="wd-title">홍길동님의 청첩장-2</strong>
                                    <ul className="wd-desc">
                                        <li>2024. 09. 01 21:30 제작</li> 
                                        <li>워터마크 제거여부 : <strong>제거안함</strong></li> 
                                        <li>사용기간 : <span className="red">2024. 10. 02. 23:59</span> 까지</li> 
                                    </ul>
                                </div>
                                <div className="wd-btn">
                                    <button className="wd-btn-gray">복제</button>
                                    <button className="wd-btn-blue">수정</button>
                                    <button className="wd-btn-red">삭제</button>
                                </div>
                            </div>
                            <div className="wd-etc">
                                <div className="wd-option">
                                    <button className="wd-option-btn" onClick={() => navigate('/preview')}><img src={wd_option_icon_1} alt=""/>청첩장 확인하기</button>
                                    <button className="wd-option-btn"><img src={wd_option_icon_2} alt=""/>참석여부 확인</button>
                                    <button className="wd-option-btn"><img src={wd_option_icon_3} alt=""/>URL 복사하기</button>
                                    <button className="wd-option-btn"><img src={wd_option_icon_4} alt=""/>카톡 공유하기</button>
                                    <button className="wd-option-btn"><img src={wd_option_icon_5} alt=""/>QR코드</button>
                                </div>
                                <div className="wd-btn">
                                    <button className="wd-btn-gray">워터마크 제거하기</button>
                                </div>  
                            </div>
                        </div> 
                    </div> */}


                </div> 
            </div>
        </div>
        </>
  ) }


export default ProductionList;
