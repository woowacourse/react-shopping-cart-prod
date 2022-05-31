import React from 'react';
import Layout from 'components/Layout';

import Button from 'components/@common/Button/styles';
import Input from 'components/@common/Input/styles';
import { COLORS } from 'styles/theme';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const Login = () => {
  console.log('is working!');
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
          <form>
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
          </form>
        </CommonStyled.Container>
      </Styled.LoginContainer>
    </Layout>
  );
};

export default Login;
