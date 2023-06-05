import styled, { keyframes } from 'styled-components';
import CORSImage from './assets/CORS.png';
import { SERVER_OWNER } from 'constants/storeKey';

const CorsErrorFallback = () => {
  const handleOnClick = () => {
    localStorage.setItem(SERVER_OWNER, '다즐');
    window.location.reload();
  };

  return (
    <CorsErrorContainer>
      <div>
        <CorsErrorTitle>오류 발생</CorsErrorTitle>
        <CorsErrorDescription>다른 서버로 전환해주세요.</CorsErrorDescription>
        <RetryButton onClick={handleOnClick}>다른 서버로 전환</RetryButton>
      </div>
    </CorsErrorContainer>
  );
};

export default CorsErrorFallback;

const CorsErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  text-align: center;
  /* background-image: url(${CORSImage}); */
  background-size: cover;
`;

const CorsErrorTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const CorsErrorDescription = styled.p`
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const RetryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border: none;
  border-radius: 50%;
  background-color: #ff3b3b;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  animation: ${pulseAnimation} 1.5s infinite;
`;
