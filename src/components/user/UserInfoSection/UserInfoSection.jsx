import { sendGetUserRequest } from 'api/user.api';
import { Button } from 'components/common';
import { ROUTE } from 'constants/route';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from 'components/user/UserInfoSection/UserInfoSection.style';

function UserInfoSection({ openModal }) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const responseData = await sendGetUserRequest();

      setUserData(responseData);
    }

    fetchUser();
  }, []);

  return (
    userData && (
      <Styled.Section>
        <Styled.List>
          <Styled.ListItem>
            <Styled.ListItemTitle>이메일 주소</Styled.ListItemTitle>
            <Styled.ListItemContent>{userData.email}</Styled.ListItemContent>
          </Styled.ListItem>
          <Styled.ListItem>
            <Styled.ListItemTitle>닉네임</Styled.ListItemTitle>
            <Styled.ListItemContent>{userData.nickname}</Styled.ListItemContent>
          </Styled.ListItem>
        </Styled.List>
        <Styled.ButtonContainer>
          <Styled.ButtonWrapper>
            <Button onClick={() => navigate(ROUTE.USER_INFO_UPDATE)}>
              회원정보 수정
            </Button>
            <Button onClick={() => navigate(ROUTE.USER_PASSWORD_UPDATE)}>
              비밀번호 수정
            </Button>
          </Styled.ButtonWrapper>
          <Button variant="warning" onClick={() => openModal()}>
            회원 탈퇴
          </Button>
        </Styled.ButtonContainer>
      </Styled.Section>
    )
  );
}

export default UserInfoSection;
