import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Invitations = () => {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.euphoriacard.co.kr/api/invitations') // proxy 설정이 있다면 이렇게 작성
      .then((response) => {
        console.log('API 응답:', response.data);
        setInvitations(response.data); // 상태 업데이트
      })
      .catch((error) => {
        console.error('데이터 가져오기 실패:', error);
      });
  }, []); // 빈 배열: 최초 렌더링 시 한 번만 실행
  

  

  return (
    <div>
      <br/>
      <br/>
      <br/>
  D   <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <h1>Invitations</h1>
      {invitations.length === 0 ? (
        <p>No invitations found.</p>
      ) : (
        <ul>
          {invitations.map((invite) => (
            <li key={invite.id}>
              <strong>Name:</strong> {invite.name} <br />
              <strong>Date:</strong> {invite.date} <br />
              <strong>Location:</strong> {invite.location} <br />
            </li>
          ))}
        </ul>
      )}
      
    </div>
  );
};

export default Invitations;
