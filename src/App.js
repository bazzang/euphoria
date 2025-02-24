import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Create from './components/create.js';
import Header from './components/header/header.js';
import ProductionList from './components/list.js';
import PreviewPage from './components/previewPage.js';
import Invitations from './components/Invitaions.js';
import { InvitationProvider } from "../src/components/InvitationProvider.js";  // 입력폼의 전역변수
import { HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import { useEffect, useState } from 'react';


import "aos/dist/aos.css";
import AOS from "aos"

import { getAccessToken, fetchProducts } from './components/ImwebAPI/AccessToken.js';

function App() {

  const location = useLocation();
  
  // 경로에 따라 Header를 숨기기
  const hideHeader = location.pathname === '/preview';

  // 경로에 따라 클래스명을 설정합니다
  const wrapClassName =
  location.pathname === '/production-list'
    ? 'list-layout'
    : location.pathname === '/preview'
    ? 'view-layout'
    : '';


  return (
    <HelmetProvider>
      <div id="wrap" className={wrapClassName}>
      {/* 조건부 렌더링: Header를 숨김 */}
      {!hideHeader && <Header />}

        <InvitationProvider>
          <Routes>
            <Route path="/" element={<Create />} /> 
            <Route path="/production-list" element={<ProductionList />} /> 
            <Route path="/preview" element={<PreviewPage />} /> 
            <Route path="/invitations" element={<Invitations />} />

          </Routes>
        </InvitationProvider>
        

      </div>
    </HelmetProvider>
    
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
