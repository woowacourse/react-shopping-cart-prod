import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function AuthPage({ element }: { element: any }) {
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!accessToken) {
      alert('로그인이 필요합니다.');
    }
  }, [accessToken]);

  if (accessToken) {
    return element;
  }

  return <Navigate replace to="/signin" />;
}

export default AuthPage;
