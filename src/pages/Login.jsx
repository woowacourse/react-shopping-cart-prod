import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from 'actions/user';
import { snackbar } from 'actions/snackbar';

import Layout from 'components/Layout';
import Button from 'components/@common/Button/styles';
import Input from 'components/@common/Input/styles';

import { hideSpinner, showSpinner } from 'actions/spinner';
import { 비동기_요청 } from 'constants';
import { requestLogin, requestUserInfo } from 'api';
import { COLORS } from 'styles/theme';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = e.target;
    const userId = formData.elements['input-id'].value;
    const userPassword = formData.elements['input-password'].value;

    if (userId.length === 0 || userPassword.length === 0) {
      dispatch(snackbar.pushMessageSnackbar('아이디와 비밀번호를 모두 입력해주세요'));
      return;
    }

    dispatch(showSpinner());

    const response = await requestLogin(userId, userPassword);

    dispatch(hideSpinner());

    if (response.status === 비동기_요청.SUCCESS) {
      const { accessToken } = response.content;
      sessionStorage.setItem('accessToken', accessToken);
      const userResponse = await requestUserInfo();
      if (userResponse.status === 비동기_요청.SUCCESS) {
        dispatch(setUserData(userResponse));
      }
    }

    const message =
      response.status === 비동기_요청.SUCCESS
        ? '로그인에 성공하였습니다'
        : '로그인에 실패하였습니다';

    dispatch(snackbar.pushMessageSnackbar(message));
    navigate('/');
  };

  return (
    <Layout>
      <Styled.LoginContainer>
        <CommonStyled.Container
          flexDirection="column"
          margin="2rem 0"
          padding="2rem"
          border={`1px solid ${COLORS.GRAY_300}`}
          alignItems="center"
        >
          <CommonStyled.Text size="1.6rem" weight="bold" margin="0 0 2rem 0">
            로그인
          </CommonStyled.Text>
          <form onSubmit={(e) => handleLogin(e)}>
            <label hidden html-for="input-id">
              로그인 입력창
            </label>
            <Input
              id="input-id"
              type="text"
              placeholder="아이디를 입력해주세요"
              minLength={4}
              maxLength={20}
              margin="0.5rem 0"
              border={`1px solid ${COLORS.GRAY_400}`}
              focusBorderColor={COLORS.MINT_200}
            />
            <label hidden html-for="input-password">
              비밀번호 입력창
            </label>
            <Input
              id="input-password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              minLength={8}
              maxLength={20}
              margin="0.5rem 0"
              border={`1px solid ${COLORS.GRAY_400}`}
            />

            <CommonStyled.HR size="1px" />

            <Button
              margin="0.5rem 0"
              backgroundColor={COLORS.MINT_200}
              hoverColor={COLORS.MINT_100}
            >
              로그인
            </Button>
            <Link to="/signUp">
              <Button
                type="button"
                color={COLORS.MINT_200}
                backgroundColor={COLORS.WHITE}
                margin="0.5rem 0"
                border={`1px solid ${COLORS.MINT_200}`}
                hoverColor={COLORS.MINT_100}
              >
                회원 가입
              </Button>
            </Link>
          </form>
        </CommonStyled.Container>
      </Styled.LoginContainer>
    </Layout>
  );
};

export default Login;
