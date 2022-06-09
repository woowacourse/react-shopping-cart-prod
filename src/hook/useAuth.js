import {useNavigate} from 'react-router-dom';

import {CONFIRM_MESSAGE, PATH} from 'constant';
import {useSelector} from 'react-redux';

function useAuth() {
  const navigation = useNavigate();

  const isLogin = useSelector((state) => state.authReducer.isLogin);

  const navigateLoginPage = () => {
    if (isLogin === false) {
      alert(CONFIRM_MESSAGE.PLEASE_LOGIN);
      navigation(PATH.LOGIN);
    }
  };

  return {navigateLoginPage};
}

export default useAuth;
