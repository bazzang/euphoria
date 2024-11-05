import React, { useState } from 'react';

import "../styles/common.css";
import "../styles/contents.css";

function ProductionHistoryPage() {
    return (
        <>
        
            <div class="contents-wrap">
                <div class="container">
                    <div class="using">
                        <strong class="using-title">이용기간 안내</strong>
                        <ul class="using-list">
                            <li>예식 후 <strong>30일까지</strong> 이용 가능합니다.</li>
                            <li>예식일 <strong> 335일(11개월) 전부터</strong> 제작이 가능합니다.</li>
                            <li>워터마크 미제거 청첩장은 <strong>7일</strong>이 지나면 자동으로 삭제됩니다.</li>
                        </ul>
                    </div>
                    <div class="list-btn"><button class="btn-create">제작하기</button></div>
                    <strong class="list-title">모바일 청첩장</strong>
                    <div class="wd-list"> 
                        <div class="wd-item">
                            <div class="wd-thumb"><img src="./images/list/wd_thumb.png" alt=""/></div>
                            <div class="wd-contents">
                                <div class="wd-info">
                                    <div>
                                        <strong class="wd-title">홍길동님의 청첩장-1</strong>
                                        <ul class="wd-desc">
                                            <li>2024. 09. 01 21:30 제작</li> 
                                            <li>워터마크 제거여부 : <strong>제거안함</strong></li> 
                                            <li>사용기간 : <span class="red">2024. 10. 02. 23:59</span> 까지</li> 
                                        </ul>
                                    </div>
                                    <div class="wd-btn">
                                        <button class="wd-btn-gray">복제</button>
                                        <button class="wd-btn-blue">수정</button>
                                        <button class="wd-btn-red">삭제</button>
                                    </div>
                                </div>
                                <div class="wd-etc">
                                    <div class="wd-option">
                                        <button class="wd-option-btn"><img src="./images/list/wd_option_icon_1.svg" alt=""/>청첩장 확인하기</button>
                                        <button class="wd-option-btn"><img src="./images/list/wd_option_icon_2.svg" alt=""/>참석여부 확인</button>
                                        <button class="wd-option-btn"><img src="./images/list/wd_option_icon_3.svg" alt=""/>URL 복사하기</button>
                                        <button class="wd-option-btn"><img src="./images/list/wd_option_icon_4.svg" alt=""/>카톡 공유하기</button>
                                        <button class="wd-option-btn"><img src="./images/list/wd_option_icon_5.svg" alt=""/>QR코드</button>
                                    </div>
                                    <div class="wd-btn">
                                        <button class="wd-btn-gray">워터마크 제거하기</button>
                                    </div>  
                                </div>
                            </div> 
                        </div>
                        <div class="wd-item">
                            <div class="wd-thumb"><img src="./images/wd_thumb.png" alt=""/></div>
                            <div class="wd-contents">
                                <div class="wd-info">
                                    <div>
                                        <strong class="wd-title">홍길동님의 청첩장-2</strong>
                                        <ul class="wd-desc">
                                            <li>2024. 09. 01 21:30 제작</li> 
                                            <li>워터마크 제거여부 : <strong>제거안함</strong></li> 
                                            <li>사용기간 : <span class="red">2024. 10. 02. 23:59</span> 까지</li> 
                                        </ul>
                                    </div>
                                    <div class="wd-btn">
                                        <button class="wd-btn-gray">복제</button>
                                        <button class="wd-btn-blue">수정</button>
                                        <button class="wd-btn-red">삭제</button>
                                    </div>
                                </div>
                                <div class="wd-etc">
                                    <div class="wd-option">
                                        <button class="wd-option-btn"><img src="./images/wd_option_icon_1.svg" alt=""/>청첩장 확인하기</button>
                                        <button class="wd-option-btn"><img src="./images/wd_option_icon_2.svg" alt=""/>참석여부 확인</button>
                                        <button class="wd-option-btn"><img src="./images/wd_option_icon_3.svg" alt=""/>URL 복사하기</button>
                                        <button class="wd-option-btn"><img src="./images/wd_option_icon_4.svg" alt=""/>카톡 공유하기</button>
                                        <button class="wd-option-btn"><img src="./images/wd_option_icon_5.svg" alt=""/>QR코드</button>
                                    </div>
                                    <div class="wd-btn">
                                        <button class="wd-btn-gray">워터마크 제거하기</button>
                                    </div>  
                                </div>
                            </div> 
                        </div>
                    </div> 
                </div>
            </div>

            <div class="footer-wrap">
                <div class="container">
                    <footer>
                        <div class="ft-top">
                            <div class="ft-top-left">
                                <img class="ft-logo" src="./images/footer_logo.png" alt=""/>
                                <div class="ft-link">
                                    <a href="#">개인정보처리방침</a>
                                    <a href="#">이용약관</a>
                                </div>
                            </div>
                            <div class="ft-top-right">
                                <ul class="ft-info">
                                    <li>상호명. 유포리아</li>  
                                    <li>대표. 이현진</li> 
                                    <li>사업자 등록번호. 184-46-01168</li> 
                                    <li>통신판매업번호. 2024-서울강남-0000</li> 
                                    <li>전화. 010-6669-6430 이메일: wlsl8013@naver.com</li> 
                                    <li>주소. 서울특별시 강남구 테헤란로82길 15, 19호(대치동, 디아이타워)</li>
                                </ul>
                                <p class="copyright">COPYRIGHT NeedIT. All rights reserved.</p>
                            </div> 
                        </div>
                        <div class="ft-bottom">
                            <div class="sitemap">
                                <a href="#">주문하기</a>
                                <a href="#">자주묻는질문</a>
                                <a href="#">고객센터</a>
                                <a href="#">모바일 청첩장</a>
                            </div>
                            <div class="site-name">Site name</div>
                            <div class="site-desc">I'm a paragraph. Click here to add your own text and edit me.<br/>Hosting by I'MWEB</div>
                            <div class="site-link">
                                <a href="#">이용약관</a> 
                                <a href="#">개인정보처리방침</a> 
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    ) 
}

export default ProductionHistoryPage;