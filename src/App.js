import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Create from './components/create.js';
import Header from './components/header/header.js';
import ProductionList from './components/list.js';
import PreviewPage from './components/previewPage.js';
import Invitations from './components/Invitaions.js';
import { InvitationProvider } from "../src/components/InvitationProvider.js";  // 입력폼의 전역변수

import axios from 'axios';
import { useEffect, useState } from 'react';


import "aos/dist/aos.css";
import AOS from "aos"

import { getAccessToken, fetchProducts } from './components/ImwebAPI/AccessToken.js';



function App() {

  // useEffect(() => {
  //   const runApiExample = async () => {
  //     const token = await getAccessToken();
  //     console.log('세션 토큰 : ', sessionStorage.getItem("access_token"))
  //     if (token) {
  //       const members = await fetchProducts(token);
  //       console.log("Fetched Members:", members);
  //     }
  //   };

  //   runApiExample();
  // }, []); // 빈 배열을 전달해 컴포넌트 마운트 시 한 번만 실행

  const location = useLocation();
  


  // 경로에 따라 클래스명을 설정합니다
  const wrapClassName =
  location.pathname === '/production-list'
    ? 'list-layout'
    : location.pathname === '/preview'
    ? 'view-layout'
    : '';


  return (
    <div id="wrap" className={wrapClassName}>
      <Header />
      <InvitationProvider>
      <Routes>
        <Route path="/" element={<Create />} /> 
        <Route path="/production-list" element={<ProductionList />} /> 
        <Route path="/preview" element={<PreviewPage />} /> 
        <Route path="/invitations" element={<Invitations />} />

      </Routes>
      </InvitationProvider>
      

    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
