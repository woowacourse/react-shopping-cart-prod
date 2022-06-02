import { FlexContainer, Title, Icon, Button, FieldSet, InputField } from 'components/@common';

import { ICON_CODE } from 'constants/';

import * as S from './styles';

function PasswordConfirm() {
  return (
    <FlexContainer align="center">
      <S.Container>
        <FieldSet labelText="비밀번호 확인">
          <InputField name="password" placeholder="비밀번호 확인" width="100%" />
        </FieldSet>

        <Button status="primary">회원정보 편집</Button>
      </S.Container>
    </FlexContainer>
  );
}

export default PasswordConfirm;
