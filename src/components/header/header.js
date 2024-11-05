import React from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate import
import Menu from './menuWrap.js';
import logoimg from '../../images/logo.svg';
import makeHistory from '../../images/make_history_b.png';
import logoutB from '../../images/login_b.png';

function Header() {
    const navigate = useNavigate(); // useNavigate 훅 사용

    return (
        <div className="header-wrap">
            <div className="container">
                <header>
                    <div className="hd-left">
                        <button className="btn-menu">menu</button>
                        <a href="https://u4ria.imweb.me/">
                            <img className="hd-logo" src={logoimg} alt="Photomag" />
                        </a>
                    </div>
                    <nav className="hd-gnb">
                        <a href="https://u4ria.imweb.me/shop_view/?idx=3" target="_blank" rel="noopener noreferrer">
                            주문하기
                        </a>
                        <a href="https://u4ria.imweb.me/FAQ" target="_blank" rel="noopener noreferrer">자주묻는질문</a>
                        <a href="https://u4ria.imweb.me/contact" target="_blank" rel="noopener noreferrer">고객센터</a>
                        <a onClick={() => navigate('/preview')}>모바일청첩장</a> {/* 경로 수정 */}
                    </nav>
                    <div className="hd-right">
                        <button onClick={() => navigate('/production-list')}> {/* 클릭 시 경로 이동 */}
                            <img src={makeHistory} style={{ width: "70px" }} alt="제작내역" />
                        </button>
                        <a href="https://u4ria.imweb.me/login?back_url=Lw%3D%3D&used_login_btn=Y" target="_blank" rel="noopener noreferrer">
                            LOGIN
                        </a>
                    </div>
                </header>
            </div>
            <Menu />
        </div>
    );
}

export default Header;
