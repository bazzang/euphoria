import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate import
import axios from 'axios';
import "../styles/common.css";
import "../styles/contents.css";
import wd_thumb from "../images/list/wd_thumb.png";
import wd_option_icon_1 from '../images/list/wd_option_icon_1.svg';
import wd_option_icon_2 from '../images/list/wd_option_icon_2.svg';
import wd_option_icon_3 from '../images/list/wd_option_icon_3.svg';
import wd_option_icon_4 from '../images/list/wd_option_icon_4.svg';
import wd_option_icon_5 from '../images/list/wd_option_icon_5.svg';
import FormDialog, { openDialog } from "./dialog.js";
import AlertDialog, { openAlertDialog } from "./AlertDialog.js";
function ProductionList() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const { ordererNm, ordererCall } = location.state || {}; // 저장 후 제작 내역으로 왔을 경우 
    const [orderList, setOrderList] = useState([]);
    const [orderDetailCnt, setOrderDetailCnt] = useState(0); // 배송완료 count  제일 먼저 제작한 청첩장부터 워터마크를 제거한다
    const [confCnt, setConfCnt] = useState(0); // 워터마크 제거된 갯수 
    // 페이지 로드 시 다이얼로그 열기
    useEffect(() => {
        if (ordererNm && ordererCall) {
            console.log('state 없음', ordererNm, ordererCall);
            handleDialogConfirm();
        }else{
            openDialog();
        }
    }, []);


    // 주문자정보로 청첩장 제작 목록 가져오기 
    const handleDialogConfirm = async (data) => {
        sessionStorage.setItem('ordererName', ordererNm);
        sessionStorage.setItem('ordererCall', ordererCall);
        
        try {
            const response = await axios.post("https://api.euphoriacard.co.kr/api/list",
              {
                ordererNm: ordererNm ? ordererNm : data.ordererName,
                ordererCall: ordererCall ? ordererCall : data.ordererCall,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
        
            console.log("Response Data: ", response.data);

            if(response.data){
                setOrderList(response.data.ovolist);
                setOrderDetailCnt(response.data.orderDetailCnt);
            }
            
        } catch (error) {
            console.error("리스트 가져오기 에러1: ", error);
            
            if(error.response.data?.error?.errorCode === "30102" || error.response.data?.error?.errorCode === "30101" ){
                alert("토큰이 만료 되었습니다.");
                localStorage.setItem("isAccessToken", null);
                const authUrl =
                'https://openapi.imweb.me/oauth2/authorize?responseType=code&clientId=aaa77bb6-2ab9-4836-8a26-8c58079959dc&redirectUri=https://euphoria-psi.vercel.app/&scope=member-info:read order:read&siteCode=S2024082926c7c40e12877';
            
                window.location.href = authUrl;
                
                
            }else{
                console.log('리스트 가져오기 에러2: ', error)
                alert("오류가 발생하였습니다.")
            }
            
        }
    }

    useEffect(() => {
        // 컨펌된 갯수만큼 주문 갯수에서 차감
        var cnt = 0;
        orderList.forEach((ord, idx) => {
            if (ord.confirmedAt !== 0 && ord.confirmedAt !== null) {
                cnt++;
            }
        });
        console.log('cnt?', cnt);
        setConfCnt(cnt);
        
        var tempCnt1 = orderDetailCnt;

        var tempCnt2 = tempCnt1 - cnt;

        // 워터마크 제거 가능 횟수 
        setOrderDetailCnt(tempCnt2);
        
    }, [orderList]);


    const onClickUpdateConfirmed = async (data) => {
        if(orderDetailCnt < 1 || orderDetailCnt === null){
            alert("구매 후 이용해주세요.");
            return;
        }

        try {
            const response = await fetch('https://api.euphoriacard.co.kr/api/list/confirm', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // seq는 숫자로 전달됩니다
            });
        
            if (response.ok) {
                const message = await response.text(); // 서버에서 보낸 메시지 받기
                console.log('Response:', message);
                alert('Success: ' + message);
            } else {
                console.error('Failed to update confirmation:', response.status);
                alert('Error: ' + response.status);
            }
        } catch (error) {
            console.error('Error during API call:', error);
            alert('Error: ' + error.message);
        }
    };

    // 사용기간 시간 계산 
    function formattedDate (date) {
        const createdDate = new Date(date);
        createdDate.setDate(createdDate.getDate() + 7);
        createdDate.setHours(createdDate.getHours() + 9);
        return createdDate.toISOString().replace("T", " ").slice(0, 19);
    }

    // url 복사하기 
    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url).then(() => {
                alert("URL이 클립보드에 복사되었습니다!");
            })
            .catch((err) => {
                console.error("클립보드 복사 실패: ", err);
                alert("URL 복사에 실패했습니다.");
            });
    };


    
    const shareKakao = (index) => {
        // if (window.kakao) {
        //   const kakao = window.kakao;
        //   if (!kakao.isInitialized()) {
        //     kakao.init("267e72e5ca94418235ab871f6c69fe40");
        //   }
    
        //   kakao.Link.sendDefault({
        //     objectType: "feed", 
        //     content: {
        //       title: "제목입니다"+index,
        //       description: "설명란입니다",
        //       imageUrl:
        //         "https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png",
        //       link: {
        //         mobileWebUrl: "https://www.naver.com",
        //         webUrl: "https://www.google.com",
        //       },
        //     },
        //     buttons: [
        //       {
        //         title: "자세히 보러 가기",
        //         link: {
        //           mobileWebUrl: "https://www.naver.com",
        //           webUrl: "https://www.google.com",
        //         },
        //       },
        //     ],
        //   });
        // }
        window.kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
              title: '오늘의 디저트',
              description: '아메리카노, 빵, 케익',
              imageUrl:
                'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
              link: {
                mobileWebUrl: 'https://developers.kakao.com',
                webUrl: 'https://developers.kakao.com',
              },
            },
            itemContent: {
              profileText: 'Kakao',
              profileImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
              titleImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
              titleImageText: 'Cheese cake',
              titleImageCategory: 'Cake',
              items: [
                {
                  item: 'Cake1',
                  itemOp: '1000원',
                },
                {
                  item: 'Cake2',
                  itemOp: '2000원',
                },
                {
                  item: 'Cake3',
                  itemOp: '3000원',
                },
                {
                  item: 'Cake4',
                  itemOp: '4000원',
                },
                {
                  item: 'Cake5',
                  itemOp: '5000원',
                },
              ],
              sum: '총 결제금액',
              sumOp: '15000원',
            },
            social: {
              likeCount: 10,
              commentCount: 20,
              sharedCount: 30,
            },
            buttons: [
              {
                title: '웹으로 이동',
                link: {
                  mobileWebUrl: 'https://developers.kakao.com',
                  webUrl: 'https://developers.kakao.com',
                },
              },
              {
                title: '앱으로 이동',
                link: {
                  mobileWebUrl: 'https://developers.kakao.com',
                  webUrl: 'https://developers.kakao.com',
                },
              },
            ],
          });
    };
    
  return (
    <>
    <FormDialog disableBackdropClick={true} hideCancelButton={true} onSave={handleDialogConfirm}/>
    <AlertDialog onConfirm={onClickUpdateConfirmed} />
    <div className="contents-wrap">

            <div className="container">
                <div className="using">
                    <strong className="using-title">이용기간 안내</strong>
                    <ul className="using-list">
                        <li>예식 후 <strong>30일까지</strong> 이용 가능합니다.</li>
                        {/* <li>예식일 <strong> 335일(11개월) 전부터</strong> 제작이 가능합니다.</li> */}
                        <li>워터마크 미제거 청첩장은 <strong>7일</strong>이 지나면 자동으로 삭제됩니다.</li> 
                    </ul>
                </div>
                <div className="list-btn">
                    <button className="btn-create" onClick={() => navigate('/')}>제작하기</button>
                </div>
                <strong className="list-title">모바일 청첩장</strong>
                <div className="wd-list"> 
            
                {orderList.length === 0 ? (
                    <div className="wd-item">
                            직접 꾸미는 나만의 청첩장, 이 세상에 하나밖에 없는 청첩장을 제작해보세요.
                        
                    </div>
                ) : (
                orderList.map((item, index) => (

                    <div className="wd-item" key={item.id || index}>
                        <div className="wd-thumb"
                        
                        style={{
                            backgroundImage: `url('data:image/jpeg;base64,${item.imageData}')`,
                            backgroundSize: "cover",        // 비율을 유지하면서 요소를 채움
                            backgroundPosition: "center",   // 이미지를 중앙 정렬
                            backgroundRepeat: "no-repeat",  // 이미지 반복 방지
                            width: "260px",                 // 너비 설정
                            height: "350px",                // 높이 설정
                            borderRadius: "10px",           // 모서리 둥글게
                            boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.15)", // 그림자 효과
                        }}>
                            {/* <img src={`data:image/jpeg;base64,${item.imageData}`} alt="" /> */}
                            {/* <div
                            style={{
                                backgroundImage: `url('data:image/jpeg;base64,${item.imageData}')`,
                                backgroundSize: "cover",        // 비율을 유지하면서 요소를 채움
                                backgroundPosition: "center",   // 이미지를 중앙 정렬
                                backgroundRepeat: "no-repeat",  // 이미지 반복 방지
                                width: "100px",                 // 너비 설정
                                height: "300px",                // 높이 설정
                                borderRadius: "10px",           // 모서리 둥글게
                                boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.15)", // 그림자 효과
                            }}
                            ></div> */}
                        </div>
                        <div className="wd-contents">
                            <div className="wd-info">
                                <div>
                                    <strong className="wd-title">{item.ordererNm}님의 청첩장-{index +1}</strong>
                                    <ul className="wd-desc">
                                        {/* <li>2024. 09. 01 21:30 제작</li>  */}
                                        <li>{item.createdAt} 제작</li> 
                                        <li>워터마크 제거여부 : 
                                            <strong>
                                            {item.confirmedAt ? ' 제거됨' : ' 제거 안함'}
                                            </strong>


                                        </li> 
                                        <li>사용기간 : <span className="red">{formattedDate(item.createdAt)}</span> 까지</li> 
                                    </ul>
                                </div>
                                {/* <div className="wd-btn">
                                    <button className="wd-btn-gray">복제</button>
                                    <button className="wd-btn-blue">수정</button>
                                    <button className="wd-btn-red">삭제</button>
                                </div> */}
                            </div>
                            <div className="wd-etc">
                                <div className="wd-option">
                                    {/* <button className="wd-option-btn" onClick={() => navigate('/preview')}><img src={wd_option_icon_1} alt=""/>청첩장 확인하기</button> */}
                                    <button
                                    className="wd-option-btn"
                                    // onClick={() => navigate('/preview', { state: { item  } })}
                                    onClick={() => {
                                        // orderDetailCnt 값에 따라 orderList의 데이터를 준비
                                        const selectedItems = orderList.slice(0, orderDetailCnt);
                                        navigate(`/preview?itemId=${item.invSeq}&index=${index}&confirm=${item.confirmedAt}`);
                                      }}
                                    >
                                        <img src={wd_option_icon_1} alt="" />청첩장 확인하기
                                    </button>
                                    {/* <button className="wd-option-btn"><img src={wd_option_icon_2} alt=""/>참석여부 확인</button> */}
                                    <button className="wd-option-btn"
                                        onClick={() => {
                                            const url = `${window.location.origin}/preview?itemId=${item.invSeq}&index=${index}&confirm=${item.confirmedAt}`;
                                            copyToClipboard(url);
                                        }}
                                    >
                                        <img src={wd_option_icon_3} alt=""/>URL 복사하기
                                    </button>
                                    <button className="wd-option-btn"><img src={wd_option_icon_4} alt="" onClick={shareKakao(index)}/>카톡 공유하기</button>
                                    {/* <button className="wd-option-btn"><img src={wd_option_icon_5} alt=""/>QR코드</button> */}
                                </div>

                                
                                {item.confirmedAt === null && (
                                <div className="wd-btn">
                                    <button 
                                    className="wd-btn-gray" 
                                    onClick={() => {openAlertDialog(item.invSeq)}}
                                    >
                                        워터마크 제거하기
                                    </button>
                                </div>  
                                )}


                            </div>
                        </div> 
                    </div>
                ))
                )}

                    {/* <div className="wd-item">
                        <div className="wd-thumb">
                            <img src={wd_thumb} alt=""/></div>
                        <div className="wd-contents">
                            <div className="wd-info">
                                <div>
                                    <strong className="wd-title">홍길동님의 청첩장-2</strong>
                                    <ul className="wd-desc">
                                        <li>2024. 09. 01 21:30 제작</li> 
                                        <li>워터마크 제거여부 : <strong>제거안함</strong></li> 
                                        <li>사용기간 : <span className="red">2024. 10. 02. 23:59</span> 까지</li> 
                                    </ul>
                                </div>
                                <div className="wd-btn">
                                    <button className="wd-btn-gray">복제</button>
                                    <button className="wd-btn-blue">수정</button>
                                    <button className="wd-btn-red">삭제</button>
                                </div>
                            </div>
                            <div className="wd-etc">
                                <div className="wd-option">
                                    <button className="wd-option-btn" onClick={() => navigate('/preview')}><img src={wd_option_icon_1} alt=""/>청첩장 확인하기</button>
                                    <button className="wd-option-btn"><img src={wd_option_icon_2} alt=""/>참석여부 확인</button>
                                    <button className="wd-option-btn"><img src={wd_option_icon_3} alt=""/>URL 복사하기</button>
                                    <button className="wd-option-btn"><img src={wd_option_icon_4} alt=""/>카톡 공유하기</button>
                                    <button className="wd-option-btn"><img src={wd_option_icon_5} alt=""/>QR코드</button>
                                </div>
                                <div className="wd-btn">
                                    <button className="wd-btn-gray">워터마크 제거하기</button>
                                </div>  
                            </div>
                        </div> 
                    </div> */}


                </div> 
            </div>
        </div>
        </>
  ) }


export default ProductionList;
