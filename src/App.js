import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Create from './components/create.js';
import Header from './components/header/header.js';
import ProductionList from './components/productionHistoryPage.js';

function App() {
  const location = useLocation();

  // 경로에 따라 클래스명을 설정합니다
  const wrapClassName = location.pathname === '/production-list' ? 'list-layout' : '';

  return (
    <div id="wrap" className={wrapClassName}>
      <Header />
      <Routes>
        <Route path="/" element={<Create />} /> {/* 기본 경로에서 Create 컴포넌트 */}
        <Route path="/production-list" element={<ProductionList />} /> {/* /production-list에서 ProductionList 컴포넌트 */}
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
