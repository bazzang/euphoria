import React, {useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate import
import Menu from './menuWrap.js';
import logoimg from '../../images/logo.svg';
import makeHistory from '../../images/make_history_b.png';
import logoutB from '../../images/login_b.png';
import axios from 'axios';

function Header() {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const location = useLocation();

    // useEffect(() => {
    //     // 리다이렉션 URL
    //     const authUrl =
    //       'https://openapi.imweb.me/oauth2/authorize?responseType=code&clientId=4327ff80-a2b4-4619-958e-de807e8cdcf7&redirectUri=https://euphoria-psi.vercel.app/&scope=member-info:read&siteCode=S2024082926c7c40e12877';
    //     // 'https://openapi.imweb.me/oauth2/authorize?responseType=code&clientId=4327ff80-a2b4-4619-958e-de807e8cdcf7&redirectUri=http://localhost:3000/&scope=member-info:read&siteCode=S2024082926c7c40e12877';
    
    //     // 페이지 이동
    //     window.location.href = authUrl;

        
    // }, []);

    const redirectToAuth = () => {
        const authUrl =
          'https://openapi.imweb.me/oauth2/authorize?responseType=code&clientId=4327ff80-a2b4-4619-958e-de807e8cdcf7&redirectUri=https://euphoria-psi.vercel.app/&scope=member-info:read&siteCode=S2024082926c7c40e12877';
    
        window.location.href = authUrl;
    };

    const handleAuthCode = () => {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get('code');
    
        if (code) {
          sessionStorage.setItem('authCode', code);
          console.log('Authorization Code saved to sessionStorage:', code);
        } else {
          redirectToAuth(); // 'code'가 없으면 인증 URL로 이동
        }
    };
    
    useEffect(() => {
        handleAuthCode();
    }, []);

    
    

    return (
        <div className="header-wrap">
            <div className="container">
                <header>
                    <div className="hd-left">
                        <button className="btn-menu">menu</button>
                        <a href="https://euphoriacard.co.kr/">
                            <img className="hd-logo" src={logoimg} alt="Photomag" />
                        </a>
                    </div>
                    <nav className="hd-gnb">
                        <a href="https://euphoriacard.co.kr/order" target="_blank" rel="noopener noreferrer">스토어</a>
                        <a href="https://euphoriacard.co.kr/FAQ" target="_blank" rel="noopener noreferrer">자주묻는질문</a>
                        <a href="https://euphoriacard.co.kr/contact" target="_blank" rel="noopener noreferrer">고객센터</a>
                        <a onClick={() => navigate('/')}>모바일청첩장</a> {/* 경로 수정 */}
                    </nav>
                    <div className="hd-right">
                        <button className="btn-login" onClick={() => navigate('/production-list')}> {/* 클릭 시 경로 이동 */}
                            <img src={makeHistory} style={{ width: "70px" }} alt="제작내역" />
                        </button>
                        {/* <a href="https://euphoriacard.co.kr/login?back_url=L0hPTUU%3D&used_login_btn=Y" className="btn-login"
                            onClick={}
                        >로그인</a> */}
                        {/* <a href="https://openapi.imweb.me/oauth2/authorize?responseType=code&clientId=4327ff80-a2b4-4619-958e-de807e8cdcf7&redirectUri=https://euphoria-psi.vercel.app/&scope=member-info:read&siteCode=S2024082926c7c40e12877" 
                        className="btn-login">로그인</a> */}
                        

                         {/* <button onClick={onclicktest}>로그인</button> */}
                    </div>
                </header>
            </div>
            <Menu />
        </div>
    );
}

export default Header;
