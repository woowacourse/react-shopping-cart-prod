import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { StoreState } from 'types';

type SelectedState = StoreState['userState'];

function AuthPage({ element }: { element: any }) {
  const { id: userId } = useSelector<StoreState, SelectedState>(
    ({ userState }) => userState
  );

  useEffect(() => {
    if (!userId) {
      alert('로그인이 필요합니다.');
    }
  }, [userId]);

  if (userId) {
    return element;
  }

  return <Navigate replace to="/signin" />;
}

export default AuthPage;
