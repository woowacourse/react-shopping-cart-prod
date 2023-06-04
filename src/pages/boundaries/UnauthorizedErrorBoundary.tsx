import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ResponseErrorBoundary from '../../components/utils/ResponseErrorBoundary';
import LoginPage from '../LoginPage';

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

export default UnauthorizedErrorBoundary;
