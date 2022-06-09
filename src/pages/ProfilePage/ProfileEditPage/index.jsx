import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Title, Icon, FlexContainer } from 'components/@common';

import { ICON_CODE } from 'constants/';

import DropOutUser from '../Containers/DropOutUser';
import NicknameEdit from '../Containers/NicknameEdit';
import PasswordEdit from '../Containers/PasswordEdit';

function ProfileEditPage() {
  const { isLoggedIn } = useSelector((state) => state.members);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [isLoggedIn]);

  return (
    <>
      <Title description="회원님의 비밀번호를 변경을 위해 이전 비밀번호와 새로운 비밀번호를 입력해주세요.">
        <Icon icon={ICON_CODE.USER} />
        회원정보 관리
      </Title>

      <FlexContainer align="center">
        <NicknameEdit />
        <PasswordEdit />
        <DropOutUser />
      </FlexContainer>
    </>
  );
}

export default ProfileEditPage;
