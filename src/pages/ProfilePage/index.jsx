import { useState } from 'react';

import { Title, Icon } from 'components/@common';

import { ICON_CODE } from 'constants/';

import ConfirmPassword from './Containers/ConfirmPassword';
import ProfileEdit from './Containers/ProfileEdit';
import * as S from './styles';

export function ProfilePage() {
  const [pageStep, setPageStep] = useState(1);
  const [password, setPassword] = useState();

  const setAuthPassed = (confirmPassword) => {
    setPassword(confirmPassword);
    setPageStep(2);
  };

  return (
    <>
      <Title description="현재 로그인한 계정의 회원 정보를 수정하실 수 있습니다.">
        <Icon icon={ICON_CODE.USER} />
        회원정보 관리
      </Title>

      <S.PageContent>
        {pageStep === 1 && <ConfirmPassword setAuthPassed={setAuthPassed} />}
        {pageStep === 2 && <ProfileEdit confirmPassword={password} />}
      </S.PageContent>
    </>
  );
}

export default ProfilePage;
