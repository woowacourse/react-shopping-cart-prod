import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { StyledUserContainer, StyledUserForm } from '../components/common/Styled';

import { isValidPassword, isValidPasswordConfirm } from '../utils/validations';
import { MESSAGE, SERVER_PATH, USER, ROUTES_PATH } from '../constants';
import actionTypes from '../store/user/user.actions';

function ModifyPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    prevPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const { prevPassword, newPassword, newPasswordConfirm } = password;

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPassword(newPassword)) {
      alert(MESSAGE.ERROR_PASSWORD);
      return;
    }
    if (!isValidPasswordConfirm(newPassword, newPasswordConfirm)) {
      alert(MESSAGE.ERROR_PASSWORD_CONFIRM);
      return;
    }

    try {
      await axios.patch(SERVER_PATH.PASSWORD, { prevPassword, newPassword });
      dispatch({ type: actionTypes.DELETE_TOKEN });
      navigate(ROUTES_PATH.LOGIN);
    } catch (error) {
      alert(error.messages);
    }
  };

  const handlePasswordChange = (passwordKey) => (e) => {
    setPassword((prevState) => {
      return { ...prevState, [passwordKey]: e.target.value };
    });
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
          placeholder="비밀번호를 입력해주세요"
          onChange={handlePasswordChange('prevPassword')}
        />
        <Input
          labelText="새로운 비밀번호"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={newPassword}
          placeholder="새로운 비밀번호를 입력해주세요"
          onChange={handlePasswordChange('newPassword')}
        />
        <Input
          labelText="새로운 비밀번호 확인"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={newPasswordConfirm}
          placeholder="새로운 비밀번호를 입력해주세요"
          onChange={handlePasswordChange('newPasswordConfirm')}
        />
        <Button text="수정하기" />
      </StyledUserForm>
    </StyledUserContainer>
  );
}

export default ModifyPasswordPage;
