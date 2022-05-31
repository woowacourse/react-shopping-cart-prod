import React from 'react';
import Layout from 'components/Layout';

import PageHeader from 'components/@common/PageHeader';
import Button from 'components/@common/Button/styles';
import Input from 'components/@common/Input/styles';
import ErrorMessage from 'components/@common/ErrorMessage';

import { COLORS } from 'styles/theme';

import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const EditUserPassword = () => (
  <Layout>
    <Styled.SignUpContainer>
      <CommonStyled.Container flexDirection="column" justifyContent="center">
        <PageHeader color={COLORS.GRAY_300}>비밀번호 변경</PageHeader>
        <form style={{ width: '100%' }}>
          <label html-for="input-user-oldpassword">
            현재 비밀번호
            <Input
              id="input-user-oldpassword"
              type="password"
              placeholder="현재 비밀번호를 입력해주세요"
              minLength={4}
              maxLength={20}
              margin="1rem 0"
              border={`1px solid ${COLORS.GRAY_400}`}
            />
          </label>

          <label html-for="input-user-newpassword">
            새 비밀번호
            <Input
              id="input-user-newpassword"
              placeholder="새로운 비밀번호를 입력해주세요"
              type="password"
              minLength={4}
              maxLength={20}
              margin="1rem 0"
              border={`1px solid ${COLORS.GRAY_400}`}
            />
          </label>
          <ErrorMessage>8~20 사이의 영문자, 특수문자, 숫자로 입력해주세요</ErrorMessage>

          <label html-for="input-user-check-newpassword">
            새 비밀번호 확인
            <Input
              id="input-user-check-newpassword"
              placeholder="새로운 비밀번호를 입력해주세요"
              type="password"
              minLength={4}
              maxLength={20}
              margin="1rem 0"
              border={`1px solid ${COLORS.GRAY_400}`}
            />
          </label>
          <ErrorMessage>위에 입력한 비밀번호와 동일하게 입력해주세요</ErrorMessage>
          <Button margin="0.5rem 0" backgroundColor={COLORS.MINT_200} hoverColor={COLORS.MINT_100}>
            수정하기
          </Button>
        </form>
      </CommonStyled.Container>
    </Styled.SignUpContainer>
  </Layout>
);

export default EditUserPassword;
