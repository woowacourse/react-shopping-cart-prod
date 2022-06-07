import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as membersThunk from 'actions/members/thunk';

import useFormValidation from 'hooks/useFormValidation';

import { Title, Icon, FlexContainer, FieldSet, InputField, Button } from 'components/@common';

import { ICON_CODE, REQUEST_STATUS } from 'constants/';
import { getFormData } from 'lib/formUtils';
import { userValidator } from 'lib/validateUtils';

import * as S from './styles';

const nicknameValidation = {
  nickname: ({ nickname }) => userValidator.nickname(nickname),
};

const passwordValidation = {
  password: ({ password }) => userValidator.password(password),
  passwordConfirm: ({ password, passwordConfirm }) =>
    userValidator.passwordConfirm(password, passwordConfirm),
};

function ProfileEditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    errorList: nicknameErrorList,
    isAllPassed: isNicknameAllPassed,
    validationForm: nicknameValidationForm,
  } = useFormValidation(nicknameValidation);
  const {
    errorList: passwordErrorList,
    isAllPassed: isPasswordAllPassed,
    validationForm: passwordValidationForm,
  } = useFormValidation(passwordValidation);

  const { userInfoAsyncState } = useSelector((state) => state.members);
  const { error: nicknameEditPasswordErrorMessage } = userInfoAsyncState;

  const handleNicknameValidate = ({ target }) => {
    if (target.tagName !== 'INPUT') return;

    const formData = getFormData(target.form);

    nicknameValidationForm({ name: target.name, formData });
  };

  const handleEditNickname = async (event) => {
    event.preventDefault();

    const { newNickname, password } = getFormData(event.target);
    const response = await dispatch(membersThunk.userNicknameEdit({ newNickname, password }));

    if (response.status === REQUEST_STATUS.FAIL) return;

    alert('닉네임이 변경되었습니다');

    navigate('/');
  };

  const handlePasswordValidate = ({ target }) => {
    if (target.tagName !== 'INPUT') return;

    const formData = getFormData(target.form);

    passwordValidationForm({ name: target.name, formData });
  };

  const handleEditPassword = async (event) => {
    event.preventDefault();

    const { oldPassword, newPassword } = getFormData(event.target);

    const response = await dispatch(membersThunk.userPasswordEdit({ oldPassword, newPassword }));

    if (response.status === REQUEST_STATUS.FAIL) return;

    alert('비밀번호가 변경되었습니다');

    navigate('/');
  };

  return (
    <>
      <Title description="회원님의 비밀번호를 변경을 위해 이전 비밀번호와 새로운 비밀번호를 입력해주세요.">
        <Icon icon={ICON_CODE.USER} />
        회원정보 관리
      </Title>

      <FlexContainer align="center">
        <S.NicknameContainer onBlur={handleNicknameValidate} onSubmit={handleEditNickname}>
          <FieldSet labelText="닉네임">
            <InputField
              name="nickname"
              type="text"
              status={nicknameErrorList.userId ? 'danger' : 'default'}
              message={nicknameErrorList.userId}
              placeholder="변경하고 싶은 닉네임을 입력해주세요"
              width="100%"
            />
            <InputField
              name="password"
              type="password"
              placeholder="현재 비밀번호를 입력하세요"
              message={nicknameEditPasswordErrorMessage}
              width="100%"
            />
          </FieldSet>

          <Button type="submit" status="primary" isDisabled={!isNicknameAllPassed}>
            닉네임 변경
          </Button>
        </S.NicknameContainer>

        <S.PasswordContainer onBlur={handlePasswordValidate} onSubmit={handleEditPassword}>
          <FieldSet labelText="비밀번호">
            <InputField
              name="oldPassword"
              type="password"
              placeholder="현재 비밀번호를 입력하세요"
              width="100%"
            />
            <InputField
              name="password"
              type="password"
              status={passwordErrorList.password ? 'danger' : 'default'}
              message={passwordErrorList.password}
              placeholder="새 비밀번호를 입력하세요"
              width="100%"
            />
            <InputField
              name="passwordConfirm"
              type="password"
              status={passwordErrorList.passwordConfirm ? 'danger' : 'default'}
              message={passwordErrorList.passwordConfirm}
              placeholder="새 비밀번호를 한 번 더 확인하세요"
              width="100%"
            />
          </FieldSet>

          <Button type="submit" status="primary" isDisabled={!isPasswordAllPassed}>
            비밀번호 변경
          </Button>
        </S.PasswordContainer>
      </FlexContainer>
    </>
  );
}

export default ProfileEditPage;
