import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import AppBar from '../components/page/AppBar';
import ResponseErrorBoundary from '../components/utils/ResponseErrorBoundary';
import LoginPage from './LoginPage';

const Content = styled.main`
  margin: 0 auto;
  margin-top: 60px;
  padding: 0 24px;

  max-width: 1300px;
`;

type UnauthorizedErrorBoundaryProps = PropsWithChildren;

const UnauthorizedErrorBoundary = (props: UnauthorizedErrorBoundaryProps) => {
  const { children } = props;
  const location = useLocation();
  const [key, setKey] = useState<number>(0);
  const rerender = () => setKey(Date.now());

  return (
    <ResponseErrorBoundary
      key={location.pathname + key}
      catches={(response) => response.accept(401)}
      fallback={<LoginPage onLoginSuccess={rerender} />}
    >
      {children}
    </ResponseErrorBoundary>
  );
};

const RootPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar onNavigate={navigate} />

      <Content>
        <UnauthorizedErrorBoundary>
          <Outlet />
        </UnauthorizedErrorBoundary>
      </Content>
    </>
  );
};

export default RootPage;
