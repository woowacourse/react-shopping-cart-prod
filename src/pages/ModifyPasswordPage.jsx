import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { StyledUserContainer, StyledUserForm } from '../components/common/Styled';

import useUserForm from '../hooks/useUserForm';
import { validPasswordInfo } from '../utils/validations';
import { MESSAGE, SERVER_PATH, USER, ROUTES_PATH, PASSWORD_INFO_KEY } from '../constants';
import actionTypes from '../store/user/user.actions';

function ModifyPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwords, setPasswords] = useState({
    prevPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const handleUserInfoChange = useUserForm(setPasswords);
  const { prevPassword, newPassword, newPasswordConfirm } = passwords;

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      validPasswordInfo(newPassword, newPasswordConfirm);
      await axios.patch(SERVER_PATH.PASSWORD, { prevPassword, newPassword });
      dispatch({ type: actionTypes.DELETE_TOKEN });
      alert(MESSAGE.MODIFY_PASSWORD_SUCCESS);
      navigate(ROUTES_PATH.LOGIN);
    } catch (error) {
      alert(error.response.data.message);
    }
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
          placeholder="영문자(대,소), 숫자, 특수기호 조합을 입력하세요"
          onChange={handleUserInfoChange(PASSWORD_INFO_KEY.PREV_PASSWORD)}
        />
        <Input
          labelText="새로운 비밀번호"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={newPassword}
          placeholder="영문자(대,소), 숫자, 특수기호 조합을 입력하세요"
          onChange={handleUserInfoChange(PASSWORD_INFO_KEY.NEW_PASSWORD)}
        />
        <Input
          labelText="새로운 비밀번호 확인"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={newPasswordConfirm}
          placeholder="영문자(대,소), 숫자, 특수기호 조합을 입력하세요"
          onChange={handleUserInfoChange(PASSWORD_INFO_KEY.NEW_PASSWORD_CONFIRM)}
        />
        <Button text="수정하기" />
      </StyledUserForm>
    </StyledUserContainer>
  );
}

export default ModifyPasswordPage;
