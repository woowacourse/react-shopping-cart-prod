import Input from 'component/common/Input';
import React from 'react';
import * as S from './style';
import theme from 'theme/theme';
import {Link, useNavigate} from 'react-router-dom';
import {PATH} from 'constant';
import useFetch from 'hook/useFetch';
import {useDispatch} from 'react-redux';
import {AUTH} from 'store/modules/auth';
import useControlledInput from 'hook/useControlledInput';

function LoginPage() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const {fetch: userInfo} = useFetch('get');

  const [onChangeId, restId] = useControlledInput({});
  const [onChangePassword, restPassword] = useControlledInput({});

  const login = useFetch('post');

  const setUserInfo = () => {
    const response = JSON.parse(localStorage.getItem('accessToken'));

    if (!response) {
      dispatch({type: AUTH.LOGOUT});
      return;
    }

    userInfo({
      API_URL: `${process.env.REACT_APP_BASE_SERVER_URL}${process.env.REACT_APP_CUSTOMERS}`,
      auth: false,
      onSuccess: (res) => {
        dispatch({type: AUTH.SET_USER_INFO, payload: res});
      },
      onFail: (error) => {
        alert(error);
        dispatch({type: AUTH.LOGOUT});
      },
    });
  };

  const onSubmit = (inputs) => {
    login.fetch({
      API_URL: `${process.env.REACT_APP_BASE_SERVER_URL}${process.env.REACT_APP_SIGNIN}`,
      body: {
        account: inputs[0].value,
        password: inputs[1].value,
      },
      onSuccess: (data) => {
        localStorage.setItem('accessToken', JSON.stringify(data));
        setUserInfo();
        dispatch({type: AUTH.LOGIN});
        navigation(PATH.HOME);
      },
    });
  };

  return (
    <S.Layout>
      <S.LoginContainer>
        <S.Header>로그인</S.Header>
        <S.InputForm
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e.target);
          }}
        >
          <Input
            label="아이디"
            size="medium"
            id="id"
            placeHolder="아이디를 입력해주세요"
            onChange={(e) => onChangeId(e.target.value)}
            {...restId}
          />
          <Input
            label="비밀번호"
            size="medium"
            id="password"
            type="password"
            placeHolder="비밀번호를 입력해주세요"
            onChange={(e) => onChangePassword(e.target.value)}
            {...restPassword}
          />
          <S.ConfirmButton
            fontSize="14px"
            backgroundColor={theme.MINT_500}
            width="300px"
            height="36px"
            type="submit"
          >
            확인
          </S.ConfirmButton>
          <S.SignupText>
            <span>아직 회원이 아니신가요?</span>
            <S.LinkText>
              <Link to={PATH.SIGNUP}>회원가입</Link>
            </S.LinkText>
          </S.SignupText>
        </S.InputForm>
      </S.LoginContainer>
    </S.Layout>
  );
}

export default LoginPage;
