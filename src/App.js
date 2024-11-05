import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Create from './components/create.js';
import Header from './components/header/header.js';
import ProductionList from './components/list.js';
import PreviewPage from './components/previewPage.js';

function App() {
  const location = useLocation();

  // 경로에 따라 클래스명을 설정합니다
  const wrapClassName = location.pathname === '/production-list' ? 'list-layout' : 'PreviewPage' ? 'view-layout' : '';

  return (
    <div id="wrap" className={wrapClassName}>
      <Header />
      <Routes>
        <Route path="/" element={<Create />} /> 
        <Route path="/production-list" element={<ProductionList />} /> 
        <Route path="/preview" element={<PreviewPage />} /> 
      </Routes>
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
