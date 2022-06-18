import {useNavigate} from 'react-router-dom';

import {CONFIRM_MESSAGE, PATH} from 'constant';

function useAuth() {
  const navigation = useNavigate();

  const navigateLoginPage = () => {
    alert(CONFIRM_MESSAGE.PLEASE_LOGIN);
    navigation(PATH.LOGIN);
  };

  return {navigateLoginPage};
}

export default useAuth;
