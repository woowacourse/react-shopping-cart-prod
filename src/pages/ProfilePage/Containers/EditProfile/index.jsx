import { FlexContainer, Title, Icon, FieldSet, InputField, Button } from 'components/@common';

import { ICON_CODE } from 'constants/';

import * as S from './styles';

function EditProfile() {
  return (
    <>
      <Title description="회원 정보 또는 비밀번호를 변경할 수 있습니다.">
        <Icon icon={ICON_CODE.USER} />
        회원 정보 관리
      </Title>

      <FlexContainer align="center">
        <S.Container>
          <FieldSet labelText="비밀번호">
            <InputField name="password" placeholder="비밀번호 확인" width="100%" />
          </FieldSet>

          <Button status="primary">회원정보 편집</Button>
        </S.Container>
      </FlexContainer>
    </>
  );
}

export default EditProfile;
