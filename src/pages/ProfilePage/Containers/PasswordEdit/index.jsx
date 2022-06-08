import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as membersThunk from 'actions/members/thunk';

import useFormValidation from 'hooks/useFormValidation';

import { FieldSet, InputField, Button } from 'components/@common';

import { REQUEST_STATUS } from 'constants/';
import { getFormData } from 'lib/formUtils';
import { userValidator } from 'lib/validateUtils';

import * as S from './styles';

const passwordValidation = {
  password: ({ password }) => userValidator.password(password),
  passwordConfirm: ({ password, passwordConfirm }) =>
    userValidator.passwordConfirm(password, passwordConfirm),
};

function PasswordEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    errorList: passwordErrorList,
    isAllPassed: isPasswordAllPassed,
    validationForm: passwordValidationForm,
  } = useFormValidation(passwordValidation);

  const { userInfoAsyncState } = useSelector((state) => state.members);
  const { error: errorMessage } = userInfoAsyncState;

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
    <S.PasswordContainer onBlur={handlePasswordValidate} onSubmit={handleEditPassword}>
      <FieldSet labelText="비밀번호">
        <InputField
          name="oldPassword"
          type="password"
          message={passwordErrorList.password === '' && errorMessage}
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
  );
}

export default PasswordEdit;
