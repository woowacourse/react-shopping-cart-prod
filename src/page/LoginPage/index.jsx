import Input from 'component/common/Input';
import React from 'react';
import * as S from './style';
import theme from 'theme/theme';
import {Link} from 'react-router-dom';
import {PATH} from 'constant';

function LoginPage() {
  return (
    <S.Layout>
      <S.LoginContainer>
        <S.Header>로그인</S.Header>
        <S.InputCol>
          <Input label="아이디" size="medium" id="id" placeHolder="아이디를 입력해주세요" />
          <Input
            label="비밀번호"
            size="medium"
            id="password"
            placeHolder="비밀번호를 입력해주세요"
          />
          <S.ConfirmButton fontSize="14px" backgroundColor={theme.MINT} width="300px" height="36px">
            확인
          </S.ConfirmButton>
          <S.SignupText>
            <span>아직 회원이 아니신가요?</span>
            <S.LinkText>
              <Link to={PATH.SIGNUP}>회원가입</Link>
            </S.LinkText>
          </S.SignupText>
        </S.InputCol>
      </S.LoginContainer>
    </S.Layout>
  );
}

export default LoginPage;
