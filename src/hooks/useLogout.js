import useSnackbar from 'hooks/useSnackbar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doLogout } from 'reducers/auth.reducer';
import { deleteCookie } from 'utils/cookie';

const useLogout = () => {
  const [renderSnackbar] = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutByError = customError => {
    const { code, message } = customError;

    // 토큰 유효기간 만료, 유효하지 않은 토큰, 인증이 필요한 접근
    if ([1002, 1003, 1004].includes(code)) {
      deleteCookie('accessToken');
      dispatch(doLogout());
      navigate('/login');
      renderSnackbar(message || customError.message, 'FAILED');
    }
  };

  return { logoutByError };
};

export default useLogout;
