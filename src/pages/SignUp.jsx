import React from 'react';
import Layout from 'components/Layout';

import PageHeader from 'components/@common/PageHeader';
import Button from 'components/@common/Button/styles';
import Input from 'components/@common/Input/styles';
import ErrorMessage from 'components/@common/ErrorMessage';

import { COLORS } from 'styles/theme';

import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const SignUp = () => {
  console.log('is working?!');
  return (
    <Layout>
      <Styled.SignUpContainer>
        <CommonStyled.Container flexDirection="column" justifyContent="center">
          <PageHeader>회원가입</PageHeader>
          <form style={{ width: '100%' }}>
            <CommonStyled.FlexWrapper
              alignItems="flex-end"
              justifyContent="space-between"
              margin="0 0 1rem 0"
            >
              <label html-for="input-user-name">
                아이디
                <Input
                  id="input-user-name"
                  type="text"
                  width="120%"
                  placeholder="아이디를 입력해주세요"
                  minLength={4}
                  maxLength={20}
                  margin="1rem 0 0 0"
                  border={`1px solid ${COLORS.GRAY_400}`}
                  focusBorderColor={COLORS.MINT_200}
                />
              </label>
              <Button
                type="button"
                width="20%"
                height="60px"
                color={COLORS.MINT_200}
                backgroundColor={COLORS.WHITE}
                margin="0.5rem 0 0 0"
                border={`1px solid ${COLORS.MINT_200}`}
                hoverColor={COLORS.MINT_100}
              >
                중복확인
              </Button>
            </CommonStyled.FlexWrapper>

            <ErrorMessage>4~20 사이의 영문, 숫자로 입력해주세요</ErrorMessage>
            <label html-for="input-user-password">
              비밀번호
              <Input
                id="input-user-password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                minLength={4}
                maxLength={20}
                margin="1rem 0"
                border={`1px solid ${COLORS.GRAY_400}`}
              />
            </label>

            <ErrorMessage>8~20 사이의 영문자, 특수문자, 숫자로 입력해주세요</ErrorMessage>
            <label html-for="input-user-check-password">
              비밀번호 확인
              <Input
                id="input-user-check-password"
                placeholder="비밀번호를 똑같이 입력해주세요"
                type="password"
                minLength={4}
                maxLength={20}
                margin="1rem 0"
                border={`1px solid ${COLORS.GRAY_400}`}
              />
            </label>

            <ErrorMessage>위에 입력한 비밀번호와 동일하게 입력해주세요</ErrorMessage>
            <label html-for="input-user-nickname">
              이름
              <Input
                id="input-user-nickname"
                placeholder="이름을 입력해주세요"
                type="text"
                minLength={1}
                maxLegnth={10}
                margin="1rem 0"
                border={`1px solid ${COLORS.GRAY_400}`}
              />
            </label>

            <ErrorMessage>1~10글자 이내로 입력해주세요</ErrorMessage>
            <label html-for="input-user-age">
              나이
              <Input
                id="input-user-age"
                placeholder="나이를 입력해주세요"
                type="number"
                min={1}
                max={10}
                margin="1rem 0"
                border={`1px solid ${COLORS.GRAY_400}`}
              />
            </label>

            <ErrorMessage>0살 이상의 숫자를 입력해주세요</ErrorMessage>
            <Button
              margin="0.5rem 0"
              backgroundColor={COLORS.MINT_200}
              hoverColor={COLORS.MINT_100}
            >
              가입하기
            </Button>
          </form>
        </CommonStyled.Container>
      </Styled.SignUpContainer>
    </Layout>
  );
};

export default SignUp;
