import { useNavigate, useRouteError } from 'react-router-dom';
import { styled } from 'styled-components';
import Icon from '../assets/images/icon.png';

const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  margin: 60px auto auto 0;

  max-width: 600px;
`;

const Cart = styled.img`
  width: 200px;
`;

const Title = styled.h1`
  font-size: 32px;
`;

const Button = styled.button`
  padding: 24px 48px;
  background: #333333;
  font-size: 24px;
  color: white;
`;

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <Content>
      <Cart src={Icon} alt="아이콘" />

      <Title>페이지를 표시하는 중 오류가 발생했거나, 찾으시는 페이지가 없는 것 같아요! 🥲</Title>

      <pre>{String(error)}</pre>

      <Button onClick={() => navigate('/')}>홈으로 가기</Button>
    </Content>
  );
};

export default ErrorPage;
