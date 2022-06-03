import { FlexContainer, Title, TextUnderline, Icon } from 'components/@common';

import { ICON_CODE } from 'constants/';

import PasswordConfirm from './Containers/PasswordConfirm';

export function ProfilePage() {
  return (
    <>
      <Title description="현재 로그인한 계정의 회원 정보를 수정하실 수 있습니다.">
        <Icon icon={ICON_CODE.USER} />
        회원정보 관리
      </Title>

      <PasswordConfirm />
    </>
  );
}

export default ProfilePage;
