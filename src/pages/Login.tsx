import AuthPage from 'components/common/AuthPage';
import LabeledInput from 'components/common/LabeledInput';
import Snackbar, { MESSAGE } from 'components/common/Snackbar';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import useInput from 'hooks/useInput';
import useSnackBar from 'hooks/useSnackBar';
import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from 'redux/user/thunk';
import { PATH } from 'Routers';
import styled from 'styled-components';

const Login = () => {
  const [email, onChangeEmail] = useInput();
  const [password, onChangePassword] = useInput();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const name = useAppSelector(state => state.user.data?.name);
  const error = useAppSelector(state => state.user.error);
  const isLogin = useAppSelector(state => !!state.user.data);
  const { isOpenSnackbar, openSnackbar } = useSnackBar();
  const isLoginAuth = useRef(false);

  const onSubmitAuthForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      login({
        loginId: email,
        password,
      })
    );

    isLoginAuth.current = true;
  };

  useEffect(() => {
    if (isLogin && !isLoginAuth.current) {
      navigate(PATH.home);
      alert('잘못된 접근입니다.');
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    if (error) {
      openSnackbar();
      // @TODO: 에러 없애기
    }
  }, [error, openSnackbar]);

  useEffect(() => {
    if (name && isLoginAuth.current) {
      alert(`${name}님 로그인 되었습니다.`);
      navigate(PATH.home);
    }
  }, [name, navigate]);

  return (
    <AuthPage
      title='로그인'
      onSubmitAuthForm={onSubmitAuthForm}
      bottom={
        <StyledBottom>
          아직 회원이 아니신가요? <StyledLink to='/signup'>회원가입</StyledLink>
        </StyledBottom>
      }
    >
      <LabeledInput
        label='이메일'
        id='email'
        type='email'
        placeholder='이메일 주소를 입력해주세요'
        value={email}
        onChange={onChangeEmail}
      />
      <LabeledInput
        label='비밀번호'
        id='password'
        type='password'
        placeholder='비밀번호를 입력해주세요'
        value={password}
        onChange={onChangePassword}
      />
      {isOpenSnackbar && <Snackbar message={MESSAGE.login} />}
    </AuthPage>
  );
};

export default Login;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.BLUE_38d};
  margin-left: 10px;
`;

const StyledBottom = styled.p`
  font-size: 15px;
  margin-top: 15px;
`;
