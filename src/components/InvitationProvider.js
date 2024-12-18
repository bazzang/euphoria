import React, { createContext, useContext, useState } from 'react';

// 오늘로부터 한 달 뒤의 날짜를 계산하는 함수
const getDefaultWeddingDate = () => {
    const today = new Date();
    today.setMonth(today.getMonth() + 1); // 한 달 추가
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, '0'); // 날짜를 두 자리로
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}`; // datetime-local 형식
};

// Context 생성
const InvitationContext = createContext({
    invitationState: {}, // 초기 상태
    setInvitationState: () => {}, // 빈 함수
});

// Context Provider 컴포넌트
export const InvitationProvider = ({ children }) => {
  const [invitationState, setInvitationState] = useState({
    seq: 0, // 청첩장 seq

    ordererNm : "",
    ordererCall : "",

    // 메인정보
    mainType: "포스터(풀페이지)", // 메인화면 청첩장 타입
    mainPhotoUrl: "", // 메인사진저장경로
    mainPhotoNm: "", // 메인사진이름
    letteringMsg: 'our wedding day', // 레터링문구
    letteringClr: "#FFFFFF", // 레터링문구색상
    letteringHg : 0, // 레터링문구 위치 
    mainTxt: "", // 메인텍스트
    mainTxtClr: "#FFFFFF", // 메인텍스트색상
    mainWddInfoOnoff: "", // 메인 하단 예식 정보
    mainTxtHg : 0, // 메인문구 위치 

    // 신랑 정보
    groomFirstName: "",
    groomLastName: "",
    groomFatherFirstName: "",
    groomFatherLastName: "",
    groomFatherDeceased: false, // 고인여부
    groomMotherFirstName: "",
    groomMotherLastName: "",
    groomMotherDeceased: false,
    groomRelationship: "",

    // 신부 정보
    brideFirstName: "",
    brideLastName: "",
    brideFatherFirstName: "",
    brideFatherLastName: "",
    brideFatherDeceased: false,
    brideMotherFirstName: "",
    brideMotherLastName: "",
    brideMotherDeceased: false,
    brideRelationship: "",

    // 예식일자
    weddingDate: getDefaultWeddingDate(), // 오늘로부터 한 달 뒤의 날짜로 초기화

    // 예식장 관련 정보
    weddingHallName: "",
    weddingHallFloorAndRoom: "",
    weddingHallPhoneNumber: "",
    weddingHallAddress: "",

    // 달력 관련 정보
    
    calendarType: "",
    calendarTitle: "",
    calendarImage: "",
    useDday: false,

    // 신랑 관련 정보
    groomPhotoUrl : "", // 신랑 사진 URL
    groomPhotoName : "", // 신랑 사진 이름
    groomIntroduction : "", // 신랑 소개 텍스트
    // 신부 관련 정보
    bridePhotoUrl : "",// 신부 사진 URL
    bridePhotoName : "",// 신부 사진 이름
    brideIntroduction : "", // 신부 소개 텍스트

    // 연락처 정보
    groomPhoneNumber : "", // 신랑 전화번호
    bridePhoneNumber : "", // 신부 전화번호

    // 기타 설정
    enableProfileIntroduction : false, // 프로필형 소개 활성화 여부
    enableContactInfo:false, // 신랑신부 연락하기 활성화 여부

    // 갤러리
    
    galleryTitle: "", // 갤러리 제목
    galleryType: "grid", // 갤러리 타입 (grid, slider 등)
    galleryImages: [], // 갤러리 이미지 목록
    galleryProgressBarVisible: false, // 하단 진행바 표시 여부
    galleryThumbnailsVisible: false, // 썸네일 표시 여부

    // 지도 설정 변수
    useMap : false,
    mapMarker: "", // 지도 마커 위치 정보
    mapHeight: "300px", // 지도 높이 기본값
    mapZoomLevel: 1, // 지도 줌 레벨 기본값
    navigationRemove: false, // 네비게이션 삭제 여부
    mapFix: false, // 지도 이동 고정 여부
    
    // 교통수단
    
    transportation: [], // 교통수단 배열 method, details

    // 안내문
    noticeTitle: "", // 안내문 제목
    noticeContent: "", // 안내문 내용
    externalLinkUsage: false, // 외부 링크 버튼 사용 여부
    noticeExternalLink : "", // 외부 링크 url 
    externalLinkBtnTxt : "", // 외부 링크 버튼 txt 
    
    // 화환 보내기
    sendWreath: false, // 화환 보내기 섹션 활성화 여부
    sendWreathUrl : "https://www.99flower.co.kr/", // 화환 보내기에 연결 될 url 
    
    // 함께한 시간
    firstMeetTime: "", // 첫 만남 날짜 및 시간
    
    // 엔딩 섹션
    endingImage: "", // 엔딩 사진 URL
    endingContent: "", // 엔딩 글귀
    endingContentPosition: "상단", // 글귀 위치 (상단, 중간, 하단)

    // 사진
    mainPhotoFile : "",
    calendarFile : "",
    groomPhotoFile : "",
    bridePhotoFile : "",
    endingPhotoFile : "",

    // 사용섹션 
    useProfile : false, // 프로필형 소개 
    useCalendar: false, // 달력
    useGallery : false, // 갤러리 사용 여부 
    useNotice : false, // 안내문 사용 여부 
    useFlower : false, // 화환 사용 여부 
    useFirstMeetTime : false, // 함께한 사용 여부  our-time 함께한 시간
    useDirections : false, // 오시는길 
    useTransportation : false, // 교통수단 사용 여부
    useEnding : false,  // land 
    useContactBrideAndGroom : false, // 신랑신부 연락하기


  });

  return (
    <InvitationContext.Provider value={{ invitationState, setInvitationState }}>
      {children}
    </InvitationContext.Provider>
  );
};

// Hook
export const useInvitation = () => {
    const context = useContext(InvitationContext);
    if (!context) {
      throw new Error('useInvitation must be used within an InvitationProvider');
    }
    return context;
};