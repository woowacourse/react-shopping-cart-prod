import { FlexContainer, Title, TextUnderline, Icon } from 'components/@common';

import { ICON_CODE } from 'constants/';

import PasswordConfirm from '../Containers/PasswordConfirm';

export function ProfileConfirmPage() {
  return (
    <>
      <Title description="회원님의 소중한 정보보호를 위해 비밀번호를 재확인하고 있습니다.">
        <Icon icon={ICON_CODE.USER} />
        회원정보 관리
      </Title>

      <PasswordConfirm />
    </>
  );
}

export default ProfileConfirmPage;
