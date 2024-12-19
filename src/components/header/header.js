import React, {useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate import
import Menu from './menuWrap.js';
import logoimg from '../../images/logo.svg';
import makeHistory from '../../images/make_history_b.png';
import logoutB from '../../images/login_b.png';
import axios from 'axios';
import { axiosPost } from '../common/common.js';
function Header() {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const location = useLocation();

    // 인가코드 콜 
    function redirectToAuth(){
        const authUrl =
          'https://openapi.imweb.me/oauth2/authorize?responseType=code&clientId=aaa77bb6-2ab9-4836-8a26-8c58079959dc&redirectUri=https://euphoria-psi.vercel.app/&scope=member-info:read order:read&siteCode=S2024082926c7c40e12877';
    
        window.location.href = authUrl;
    };

    // 인가코드 세션스토리지에 저장 후 백엔드 호출 
    const handleAuthCode = async() => {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get('code');
        
            if (code) {
                console.log('세션스토리지 저장된 code :',  code);
                try {
                    // 요청 URL 및 데이터 설정
                    const url = 'https://api.euphoriacard.co.kr/api/oauth';
                    const formData = new FormData();
                    formData.append('code', code);
                
                    // Axios 요청
                    const response = await axios.post(url, formData, {
                      headers: {
                        'Content-Type': 'multipart/form-data',
                      },
                    });
                
                    // 결과 반환
                    console.log('Response:', response.data);
                    if(response.data === 200){
                        localStorage.setItem("isAccessToken", 1);
                    }
                
                  } catch (error) {
                    console.error('Error:', error);
                    throw error;
                  }

                
            } else {
                redirectToAuth(); // code가 없으면 인증 URL로 이동
            }    
        // }
    };
    
    useEffect(() => {
        console.log("header - useEffect", localStorage.getItem("isAccessToken"));
        if(localStorage.getItem("isAccessToken") !== 1 || localStorage.getItem("isAccessToken") !== "1"){
            console.log("header - useEffect if~~~~~", localStorage.getItem("isAccessToken"));
            console.log("적용2", localStorage.getItem("isAccessToken"));
            handleAuthCode();
        }
        
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
