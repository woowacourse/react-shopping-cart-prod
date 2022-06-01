import React from 'react';

import { Button, PageTitle } from 'components/common';

import * as Styled from 'pages/UserInfo/UserInfo.style';

function UserInfo() {
  return (
    <>
      <PageTitle>내 정보</PageTitle>
      <Styled.Section>
        <Styled.List>
          <Styled.ListItem>
            <Styled.ListItemTitle>이메일 주소</Styled.ListItemTitle>
            <Styled.ListItemContent>example@woowacourse.com</Styled.ListItemContent>
          </Styled.ListItem>
          <Styled.ListItem>
            <Styled.ListItemTitle>닉네임</Styled.ListItemTitle>
            <Styled.ListItemContent>블링</Styled.ListItemContent>
          </Styled.ListItem>
        </Styled.List>
        <Styled.ButtonContainer>
          <Styled.ButtonWrapper>
            <Button>회원정보 수정</Button>
            <Button>비밀번호 수정</Button>
          </Styled.ButtonWrapper>
          <Button variant="warning">회원 탈퇴</Button>
        </Styled.ButtonContainer>
      </Styled.Section>
    </>
  );
}

export default UserInfo;
