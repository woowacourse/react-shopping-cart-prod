import styled from 'styled-components';
import CORSImage from './assets/CORS.png';

const CorsErrorFallback = () => {
  return (
    <CorsErrorContainer>
      <CorsErrorTitle>CORS Error</CorsErrorTitle>
      <CorsErrorDescription>서버 개발자와 CORS 에러를 논의해보세요</CorsErrorDescription>
    </CorsErrorContainer>
  );
};

export default CorsErrorFallback;

const CorsErrorContainer = styled.div`
  width: 100%;
  height: 100vh;
  text-align: center;
  //margin-top: 50px;
  background-image: url(${CORSImage});
  background-size: cover;
`;

const CorsErrorTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const CorsErrorDescription = styled.p`
  font-size: 16px;
  margin-top: 10px;
`;
