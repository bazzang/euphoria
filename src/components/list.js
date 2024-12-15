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

    // 페이지 로드 시 다이얼로그 열기
    useEffect(() => {
        openDialog();
    }, []);

    // 주문자정보로 청첩장 제작 목록 가져오기 
    const handleDialogConfirm = async (data) => {
        
        try {
            const response = await axios.post(
              "http://localhost:8080/api/list",
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
            
            setOrderList(response.data);
        } catch (error) {
            console.error("Error fetching order list: ", error);
        }
    }

    // 사용기간 시간 계산 
    function formattedDate (date) {
        const createdDate = new Date(date);
        createdDate.setDate(createdDate.getDate() + 7);
        createdDate.setHours(createdDate.getHours() + 9);
        return createdDate.toISOString().replace("T", " ").slice(0, 19);
    }


    
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
                        <li>워터마크 미제거 청첩장은 <strong>7일</strong>이 지나면 자동으로 삭제됩니다.</li>
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
                        <div className="wd-thumb">
                            <img src={`data:image/jpeg;base64,${item.imageData}`} alt="thumbnail" style={{objectFit:"cover", height:"100%"}}/>
                        </div>
                        <div className="wd-contents">
                            <div className="wd-info">
                                <div>
                                    <strong className="wd-title">{item.ordererNm}님의 청첩장-1</strong>
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
                                    <button className="wd-option-btn" onClick={() => navigate('/preview')}><img src={wd_option_icon_1} alt=""/>청첩장 확인하기</button>
                                    {/* <button className="wd-option-btn"><img src={wd_option_icon_2} alt=""/>참석여부 확인</button> */}
                                    <button className="wd-option-btn"><img src={wd_option_icon_3} alt=""/>URL 복사하기</button>
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
                        <div className="wd-thumb"><img src="./images/wd_thumb.png" alt=""/></div>
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
