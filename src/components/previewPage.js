import React, { useState } from 'react';

import "../styles/common.css";
import "../styles/contents.css";

function PreviewPage() {

  return (
    <>
        <div className="watermark">
            <p>구매 후 워터마크를 제거해주세요.
            <br/>
            <br/>2024.10.02 23:59까지 사용 가능합니다.
            <br/>
            <br/>워터마크를 제거하셔도 무제한 수정이 가능합니다.</p>
            <div className="btn-wrap">
                <a href="#" className="watermark-buy">구매하러 가기</a>
                <a href="#" className="watermark-remove">워터마크 제거하기</a>
            </div>
        </div>
        <div className="wedding-card">
            <section className="main"> 
                <div className="cardbg-img">
                    <img src="./images/card/typo.png" className="main-typo"/>
                    <img src="./images/card/page3_bg.png" className="marry-main-bg"/> 
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
                </div>
                
            </section>
        </div>
    </>
  ) }


export default PreviewPage;