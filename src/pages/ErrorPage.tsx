import { useNavigate, useRouteError } from 'react-router-dom';
import { styled } from 'styled-components';
import Icon from '../assets/images/icon.png';
import Button from '../components/common/Button';

const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  margin: 60px auto 0 auto;

  max-width: 600px;
`;

const Cart = styled.img`
  width: 200px;
`;

const Title = styled.h1`
  font-size: 32px;

  word-break: keep-all;
`;

const ErrorDetails = styled.details`
  width: 100%;
`;

const ErrorDetailsContent = styled.pre`
  width: 100%;
  min-height: 100px;

  padding: 16px;

  background: #eeeeee;

  overflow-x: auto;
`;

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <Content>
      <Cart src={Icon} alt="아이콘" />

      <Title>페이지를 표시하는 중 오류가 발생했거나, 찾으시는 페이지가 없는 것 같아요! 🥲</Title>

      <Button onClick={() => navigate('/')}>홈으로 가기</Button>

      <ErrorDetails>
        <summary>에러 자세히 보기</summary>

        <ErrorDetailsContent>{JSON.stringify(error, null, 2)}</ErrorDetailsContent>
      </ErrorDetails>
    </Content>
  );
};

export default ErrorPage;
