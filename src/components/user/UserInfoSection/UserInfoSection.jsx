import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { sendGetUserRequest } from 'api/user.api';

import { Button } from 'components/common';

import * as S from 'components/user/UserInfoSection/UserInfoSection.style';

import { ROUTE } from 'constants/route';

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
      <S.Section>
        <S.List>
          <S.ListItem>
            <S.ListItemTitle>이메일 주소</S.ListItemTitle>
            <S.ListItemContent>{userData.email}</S.ListItemContent>
          </S.ListItem>
          <S.ListItem>
            <S.ListItemTitle>닉네임</S.ListItemTitle>
            <S.ListItemContent>{userData.nickname}</S.ListItemContent>
          </S.ListItem>
        </S.List>
        <S.ButtonContainer>
          <S.ButtonWrapper>
            <Button onClick={() => navigate(ROUTE.USER_INFO_UPDATE)}>
              회원정보 수정
            </Button>
            <Button onClick={() => navigate(ROUTE.USER_PASSWORD_UPDATE)}>
              비밀번호 수정
            </Button>
          </S.ButtonWrapper>
          <Button variant="warning" onClick={() => openModal()}>
            회원 탈퇴
          </Button>
        </S.ButtonContainer>
      </S.Section>
    )
  );
}

export default UserInfoSection;
