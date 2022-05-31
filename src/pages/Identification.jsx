import React from 'react';
import Layout from 'components/Layout';

import Button from 'components/@common/Button/styles';
import Input from 'components/@common/Input/styles';
import PageHeader from 'components/@common/PageHeader';
import { COLORS } from 'styles/theme';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const Identification = () => (
  <Layout>
    <Styled.LoginContainer>
      <CommonStyled.Container flexDirection="column" justifyContent="center" margin="3rem 0">
        <PageHeader color={COLORS.GRAY_300}>회원 정보 수정</PageHeader>
        <form style={{ width: '100%' }}>
          <CommonStyled.FlexWrapper
            alignItems="center"
            justifyContent="space-between"
            margin="2rem 0"
          >
            <label html-for="input-password">비밀번호</label>
            <Input
              id="input-password"
              type="password"
              width="80%"
              placeholder="비밀번호를 입력해주세요"
              minLength={8}
              maxLength={20}
              margin="0.5rem 0"
              border={`1px solid ${COLORS.GRAY_400}`}
            />
          </CommonStyled.FlexWrapper>

          <Button margin="0.5rem 0" backgroundColor={COLORS.MINT_200} hoverColor={COLORS.MINT_100}>
            확인
          </Button>
        </form>
      </CommonStyled.Container>
    </Styled.LoginContainer>
  </Layout>
);

export default Identification;
