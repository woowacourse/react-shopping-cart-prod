import React from 'react';
import Layout from 'components/Layout';

import PageHeader from 'components/@common/PageHeader';
import Button from 'components/@common/Button/styles';
import Input from 'components/@common/Input/styles';
import ErrorMessage from 'components/@common/ErrorMessage';

import { COLORS } from 'styles/theme';

import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const EditUserInfo = () => (
  <Layout>
    <Styled.SignUpContainer>
      <CommonStyled.Container flexDirection="column" justifyContent="center">
        <PageHeader color={COLORS.GRAY_300}>회원 정보 수정</PageHeader>
        <form style={{ width: '100%' }}>
          <label html-for="input-user-name">
            아이디
            <Input
              id="input-user-name"
              type="text"
              width="100%"
              value="유저아이디(이부분은변경해주셔야합니다)"
              margin="1rem 0"
              border={`1px solid ${COLORS.GRAY_400}`}
              focusBorderColor={COLORS.MINT_200}
              disabled
            />
          </label>

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
              min={0}
              max={200}
              margin="1rem 0"
              border={`1px solid ${COLORS.GRAY_400}`}
            />
          </label>

          <ErrorMessage>0살 이상의 숫자를 입력해주세요</ErrorMessage>
          <Button margin="0.5rem 0" backgroundColor={COLORS.MINT_200} hoverColor={COLORS.MINT_100}>
            수정하기
          </Button>
          <Button
            type="button"
            margin="0.5rem 0"
            backgroundColor={COLORS.MINT_200}
            hoverColor={COLORS.MINT_100}
          >
            비밀번호 변경하기
          </Button>
          <Button
            type="button"
            margin="0.5rem 0"
            color={COLORS.RED_100}
            border={`1px solid ${COLORS.RED_100}`}
            backgroundColor={COLORS.WHITE}
            hoverColor={COLORS.RED_100}
          >
            회원탈퇴
          </Button>
        </form>
      </CommonStyled.Container>
    </Styled.SignUpContainer>
  </Layout>
);

export default EditUserInfo;
