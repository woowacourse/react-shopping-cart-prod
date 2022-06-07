import { FlexContainer, FieldSet, InputField, Button } from 'components/@common';

import * as S from './styles';

function EditProfile({ newNicknameErrorMessage, handleEditUsername, handleEditPassword }) {
  return (
    <FlexContainer align="center">
      <S.NicknameContainer onSubmit={handleEditUsername}>
        <FieldSet labelText="닉네임">
          <InputField
            name="newNickname"
            type="text"
            placeholder="변경하고 싶은 닉네임을 입력해주세요"
            width="100%"
          />
          <InputField
            name="password"
            type="password"
            placeholder="현재 비밀번호를 입력하세요"
            message={newNicknameErrorMessage}
            width="100%"
          />
        </FieldSet>

        <Button type="submit" status="primary">
          닉네임 변경
        </Button>
      </S.NicknameContainer>

      <S.PasswordContainer onSubmit={handleEditPassword}>
        <FieldSet labelText="비밀번호">
          <InputField
            name="oldPassword"
            type="password"
            placeholder="현재 비밀번호를 입력하세요"
            width="100%"
          />
          <InputField
            name="newPassword"
            type="password"
            placeholder="새 비밀번호를 입력하세요"
            width="100%"
          />
          <InputField
            name="newPasswordConfirm"
            type="password"
            placeholder="새 비밀번호를 한 번 더 확인하세요"
            width="100%"
          />
        </FieldSet>

        <Button type="submit" status="primary">
          비밀번호 변경
        </Button>
      </S.PasswordContainer>
    </FlexContainer>
  );
}

export default EditProfile;
