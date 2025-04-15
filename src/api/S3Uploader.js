// src/api/s3Uploader.js
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

/**
 * S3에 Presigned URL을 통해 이미지를 업로드하고 URL을 반환함
 * @param {File} file - 업로드할 이미지 파일
 * @param {string} folder - S3 내 저장 폴더명 (예: "gallery", "main")
 * @returns {Promise<string>} 업로드된 S3 URL
 */
export const uploadImageToS3 = async (file, folder = 'gallery') => {
  const todayPrefix = getTodayPrefix(); // 예: 20250415
  const extension = file.name.split('.').pop(); // 확장자 추출
  const fileName = `${todayPrefix}_${uuidv4()}.${extension}`;
  const s3Key = `${folder}/${fileName}`;

//   const { data } = await axios.get(`https://api.euphoriacard.co.kr/api/s3/presigned-put-url?key=${s3Key}`);
const { data } = await axios.get(`https://api.euphoriacard.co.kr/api/s3/presigned-put-url`, {
  params: {
    key: s3Key,
    contentType: file.type
  }
});

  const response = await fetch(data.uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error('S3 업로드 실패');
  }

  return data.fileUrl;
};

const getTodayPrefix = () => {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const d = String(today.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
};