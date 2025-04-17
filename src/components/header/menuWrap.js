
import { useNavigate, useLocation } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate import
function Menu({ isOpen }){
    const navigate = useNavigate(); // useNavigate 훅 사용
    return (
        <div className={`menu-wrap ${isOpen ? 'active' : ''}`}>
            <nav>
                <a href="https://euphoriacard.co.kr/order" target="_blank" rel="noopener noreferrer">주문하기</a>
                <a href="https://euphoriacard.co.kr/FAQ" target="_blank" rel="noopener noreferrer">자주묻는질문</a>
                <a href="https://euphoriacard.co.kr/contact" target="_blank" rel="noopener noreferrer">고객센터</a>
                <a onClick={() => navigate('/')}>모바일청첩장</a> {/* 경로 수정 */}
            </nav>
        </div>
    )
}

export default Menu;



                        
                        
                        