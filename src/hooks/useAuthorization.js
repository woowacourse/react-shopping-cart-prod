import { useNavigate } from 'react-router-dom';
import { AUTHORIZATION_TYPE, PATH_NAME } from 'constants';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useAuthorization = (type) => {
  const { authenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (type === AUTHORIZATION_TYPE.PRIVATE_ONLY && !authenticated) {
      navigate(PATH_NAME.LOGIN);
      return;
    }
    if (type === AUTHORIZATION_TYPE.PUBLIC_ONLY && authenticated) {
      navigate(PATH_NAME.HOME);
      return;
    }
  }, [type, authenticated]);
};

export default useAuthorization;
