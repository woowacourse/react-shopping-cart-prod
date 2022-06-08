import Snackbar from 'components/common/Snackbar';
import { useCallback, useRef, useState } from 'react';

export const MESSAGE = {
  cart: '장바구니에 담았습니다.',
  passwordConfirm: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
  password: '비밀번호가 일치하지 않습니다.',
  login: '이메일 또는 비밀번호가 일치하지 않습니다.',
  editUser: '수정된 사항이 없습니다.',
} as const;

type Message = typeof MESSAGE[keyof typeof MESSAGE];

const useSnackBar = () => {
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const timerRef = useRef(null);
  const openSnackbar = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsOpenSnackbar(true);
    timerRef.current = setTimeout(() => {
      setIsOpenSnackbar(false);
    }, 3000);
  }, []);

  const SnackbarComponent = isOpenSnackbar && <Snackbar message={message} />;

  return { isOpenSnackbar, openSnackbar, setMessage, SnackbarComponent };
};

export default useSnackBar;
