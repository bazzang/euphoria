import axios from 'axios'; // Axios impor

/**
 * 함수명 : axiosPost
 * 설명 : 트랜잭션
*/
async function axiosPost(url, dataRow) {
  var defaultUrl = 'https://api.euphoriacard.co.kr';
    try {
      if (dataRow) {
        const response = await axios.post(defaultUrl+url, dataRow);
        return response;
      } else {
        const response = await axios.post(url);
        return response;
      }
    } catch (error) {
      console.error('Error fetching : ', error);
      return [];
    }
}


/**
 * 함수명 : axiosGet
 * 설명 : GET 요청 트랜잭션
 */
async function axiosGet(url, params = null) {
  const defaultUrl = 'https://api.euphoriacard.co.kr'; // 기본 URL 설정
  try {
    const fullUrl = `${defaultUrl}${url}`;
    const response = await axios.get(fullUrl, {
      params, // GET 요청 파라미터
      headers: {
        'Content-Type': 'application/json',
        ...(params && params['access-token'] ? { 'access-token': params['access-token'] } : {}),
      },
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error('Error during GET request: ', error);
    return null; // 에러 발생 시 null 반환
  }
}


export {axiosPost, axiosGet};