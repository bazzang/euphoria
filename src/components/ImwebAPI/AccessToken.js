// import axios from "axios";
// import { axiosPost, axiosGet } from '../common/common.js';

// // 백엔드 API 호출 함수 (토큰 요청)
// // export const getAccessToken = async () => {
// //     const storedToken = sessionStorage.getItem("access_token"); // 세션 스토리지에서 토큰 읽기

// //     // 이미 세션 스토리지에 저장된 토큰이 있으면 재사용
// //     if (storedToken) {
// //         console.log("Reusing stored token:", storedToken);
// //         return storedToken;
// //     }

// //     // 세션 스토리지에 토큰이 없으면 새로 요청
// //     const url = "/api/token";
// //     try {
// //         const response = await axiosGet(url);
// //         if (response && response.data.access_token) {
// //             console.log("New token received:", response.data.access_token);
// //             sessionStorage.setItem("access_token", response.data.access_token); // 세션 스토리지에 토큰 저장
// //             return response.data.access_token;
// //         } else {
// //             console.error("Failed to retrieve access token:", response);
// //             return null;
// //         }
// //     } catch (error) {
// //         console.error("Error while requesting access token:", error);
// //         return null;
// //     }
// // };


// // 백엔드 API 호출 함수 (회원 조회)
// // export const fetchMembers = async (accessToken) => {
// //   try {
// //     const response = await axios.get("http://ec2-43-203-229-179.ap-northeast-2.compute.amazonaws.com:8080/api/members", {
// //       params: {
// //         accessToken: accessToken,
// //       },
// //     });

// //     if (response.data) {
// //       console.log("Members Data:", response.data);
// //       return response.data;
// //     } else {
// //       console.error("Failed to fetch members:", response.data);
// //       return null;
// //     }
// //   } catch (error) {
// //     console.error("Error while fetching members:", error);
// //     return null;
// //   }
// // };

// export const fetchProducts = async () => {
//     try {
//       // 백엔드 API 호출
//       const response = await axiosGet('/api/products');
//       if (response.status === 200) {
//         console.log('Products Data:', response.data);
//         return response.data; // 성공 시 데이터 반환
//       } else {
//         console.error('Failed to fetch products:', response);
//         return null;
//       }
//     } catch (error) {
//       console.error('Error while fetching products:', error);
//       return null;
//     }
// };


// // 실행 로직
// const runApiExample = async () => {
//   const token = await getAccessToken();
//   if (token) {
//     await fetchProducts(token);
//   }
// };

// // 실행
// runApiExample();
