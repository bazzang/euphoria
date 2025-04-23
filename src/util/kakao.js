// utils/kakao.js
export const initKakao = () => {
    if (!window.Kakao) return;
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("5e85b98fd4f0ad015d88a1aaee9ef20d");
    }
  };