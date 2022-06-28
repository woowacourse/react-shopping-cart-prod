import { useState } from 'react';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { StyledUserContainer, StyledUserForm } from '../components/common/Styled';

import useUser from '../hooks/useUser';
import useUserForm from '../hooks/useUserForm';

import { USER, PASSWORD_INFO_KEY, MESSAGE } from '../constants';

const initialState = {
  prevPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
};

function ModifyPasswordPage() {
  const [password, setPassword] = useState(initialState);
  const handleUserInfoChange = useUserForm(setPassword);
  const { userModifyPassword } = useUser();
  const { prevPassword, newPassword, newPasswordConfirm } = password;

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    userModifyPassword(password);
  };

  return (
    <StyledUserContainer>
      <h1>비밀번호 수정</h1>
      <StyledUserForm onSubmit={handlePasswordSubmit}>
        <Input
          labelText="현재 비밀번호"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={prevPassword}
          placeholder={MESSAGE.PASSWORD_PLACEHOLDER}
          onChange={handleUserInfoChange(PASSWORD_INFO_KEY.PREV_PASSWORD)}
        />
        <Input
          labelText="새로운 비밀번호"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={newPassword}
          placeholder={MESSAGE.PASSWORD_PLACEHOLDER}
          onChange={handleUserInfoChange(PASSWORD_INFO_KEY.NEW_PASSWORD)}
        />
        <Input
          labelText="새로운 비밀번호 확인"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={newPasswordConfirm}
          placeholder={MESSAGE.PASSWORD_PLACEHOLDER}
          onChange={handleUserInfoChange(PASSWORD_INFO_KEY.NEW_PASSWORD_CONFIRM)}
        />
        <Button text="수정하기" />
      </StyledUserForm>
    </StyledUserContainer>
  );
}

export default ModifyPasswordPage;
