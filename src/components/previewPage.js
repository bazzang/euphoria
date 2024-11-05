import React, { useState } from 'react';

import "../styles/common.css";
import "../styles/contents.css";

function PreviewPage() {

  return (
    <>
        <div class="watermark">
            <p>구매 후 워터마크를 제거해주세요.
            <br/>
            <br/>2024.10.02 23:59까지 사용 가능합니다.
            <br/>
            <br/>워터마크를 제거하셔도 무제한 수정이 가능합니다.</p>
            <div class="btn-wrap">
                <a href="#" class="watermark-buy">구매하러 가기</a>
                <a href="#" class="watermark-remove">워터마크 제거하기</a>
            </div>
        </div>
        <div class="wedding-card">
            <section class="main"> 
                <div class="cardbg-img">
                    <img src="./images/card/typo.png" class="main-typo"/>
                    <img src="./images/card/page3_bg.png" class="marry-main-bg"/> 
                </div>
                <div class="info-card">
                    <div class="title-name">
                        <p>김견우</p>
                        <p>그리고</p>
                        <p>임직녀</p>
                    </div>
                    <div class="name-txt">
                        <strong>김견우</strong><span class="cursive">and</span><strong> 임직녀</strong>
                        <div class="m-days">
                            <div class="wedding-info">
                                <span class="marry-year">2024년</span>
                                <span class="marry-month">10월</span>
                                <span class="marry-date">31일</span>
                                <span class="marry-day">목요일</span>
                                <span class="marry-hour">오후 1시</span>
                            </div>
                            <p class="marry-location">아가테아트 1층 팬톤홀</p>
                        </div>
                    </div>
                </div>
                
            </section>
        </div>
    </>
  ) }


export default PreviewPage;