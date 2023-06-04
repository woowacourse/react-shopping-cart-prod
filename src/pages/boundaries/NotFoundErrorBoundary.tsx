import type { PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Button from '../../components/common/Button';
import ResponseErrorBoundary from '../../components/utils/ResponseErrorBoundary';

const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Content>
      <Title>찾으시는 항목이 없습니다! 🫥</Title>

      <Button onClick={() => navigate('/')}>홈으로 가기</Button>
    </Content>
  );
};

type NotFoundErrorBoundaryProps = PropsWithChildren;

const NotFoundErrorBoundary = (props: NotFoundErrorBoundaryProps) => {
  const { children } = props;
  const location = useLocation();

  return (
    <ResponseErrorBoundary
      key={location.pathname}
      catches={(response) => response.accept(404)}
      fallback={<NotFoundPage />}
    >
      {children}
    </ResponseErrorBoundary>
  );
};

export default NotFoundErrorBoundary;
