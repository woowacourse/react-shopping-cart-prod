import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ResetButton } from '../../common/ErrorFallback/ErrorFallback';
import blobsad from '../../../assets/image/blobsad.png';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container role="alert">
      <Image src={blobsad} alt="에러 페이지 이모티콘" />
      <h1>알 수 없는 오류가 발생했어요.</h1>
      <DetailContainer>
        <span>페이지를 새로고침 해 보시겠어요?</span>
        <span>또는 메인 페이지로 이동하실 수 있어요.</span>
      </DetailContainer>
      <ReturnButton onClick={() => navigate('/')}>
        메인 페이지로 이동
      </ReturnButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  row-gap: 20px;
`;

const Image = styled.img`
  width: 140px;
  height: 140px;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
  font-size: 18px;
`;

const ReturnButton = styled(ResetButton)`
  font-size: 16px;
`;

export default ErrorPage;
