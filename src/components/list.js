import React, { useState } from 'react';

import "../styles/common.css";
import "../styles/contents.css";
import wd_thumb from "../images/list/wd_thumb.png";
import wd_option_icon_1 from '../images/list/wd_option_icon_1.svg';
import wd_option_icon_2 from '../images/list/wd_option_icon_2.svg';
import wd_option_icon_3 from '../images/list/wd_option_icon_3.svg';
import wd_option_icon_4 from '../images/list/wd_option_icon_4.svg';
import wd_option_icon_5 from '../images/list/wd_option_icon_5.svg';
function ProductionList() {

  return (
    <>
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
                <div className="list-btn"><button className="btn-create">제작하기</button></div>
                <strong className="list-title">모바일 청첩장</strong>
                <div className="wd-list"> 
                    <div className="wd-item">
                        <div className="wd-thumb"><img src={wd_thumb} alt=""/></div>
                        <div className="wd-contents">
                            <div className="wd-info">
                                <div>
                                    <strong className="wd-title">홍길동님의 청첩장-1</strong>
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
                                    <button className="wd-option-btn"><img src={wd_option_icon_1} alt=""/>청첩장 확인하기</button>
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
                    </div>
                    <div className="wd-item">
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
                                    <button className="wd-option-btn"><img src={wd_option_icon_1} alt=""/>청첩장 확인하기</button>
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
                    </div>
                </div> 
            </div>
        </div>
        </>
  ) }


export default ProductionList;
