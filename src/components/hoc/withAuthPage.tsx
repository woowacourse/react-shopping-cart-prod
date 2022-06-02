import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'Routers';

const withAuthPage = (Component, canAccessOnLogin) => {
  return function Wrapper({ ...props }) {
    const isLogin = useAppSelector(state => !!state.user.data);
    const navigate = useNavigate();
    const canAccess = canAccessOnLogin ? !isLogin : isLogin;

    useEffect(() => {
      if (canAccess) {
        navigate(PATH.home);
        alert('잘못된 접근입니다.');
      }
    }, [isLogin]);

    if (canAccess) return null;

    return <Component {...props} />;
  };
};

export default withAuthPage;
