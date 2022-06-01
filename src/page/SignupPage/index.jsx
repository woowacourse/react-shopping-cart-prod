import React from 'react';

import * as S from './style';
import Input from 'component/common/Input';
import theme from 'theme/theme';

function SignupPage() {
  return (
    <S.Layout>
      <S.SignupContainer>
        <S.Header>회원가입</S.Header>
        <S.InputCol>
          <Input label="아이디" size="medium" id="id" placeHolder="아이디를 입력해주세요" />
          <Input label="닉네임" size="medium" id="nickname" placeHolder="닉네임을 입력해주세요" />
          <S.PasswordContainer>
            <Input
              label="비밀번호"
              size="medium"
              id="password"
              placeHolder="비밀번호 (영문+숫자+특수문자 8자 이상)"
            />
            <Input size="medium" id="password-confirm" placeHolder="비밀번호 확인" />
          </S.PasswordContainer>
          <Input label="주소" size="medium" id="address" placeHolder="주소를 입력해주세요" />
          <S.PhoneNumberContainer>
            <Input label="휴대폰" size="small" id="start-number" />
            <S.Hyphen>-</S.Hyphen>
            <Input size="small" id="middle-number" />
            <S.Hyphen>-</S.Hyphen>
            <Input size="small" id="last-number" />
          </S.PhoneNumberContainer>
          <S.ConfirmButton
            fontSize="14px"
            backgroundColor={theme.MINT_500}
            width="300px"
            height="36px"
          >
            확인
          </S.ConfirmButton>
        </S.InputCol>
      </S.SignupContainer>
    </S.Layout>
  );
}

export default SignupPage;
