import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  const accessToken = useSelector(({ user }) => user.accessToken);
  const [password, setPassword] = useState({
    prevPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const handleUserInfoChange = useUserForm(setPassword);
  const { prevPassword, newPassword, newPasswordConfirm } = password;

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      validPasswordInfo(password);
      await axios.patch(
        SERVER_PATH.PASSWORD,
        { prevPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      dispatch({ type: actionTypes.DELETE_TOKEN });
      alert(MESSAGE.MODIFY_PASSWORD_SUCCESS);
      navigate(ROUTES_PATH.LOGIN);
    } catch (error) {
      console.log(error);
      alert(error.messages);
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
          placeholder="비밀번호를 입력해주세요"
          onChange={handleUserInfoChange(PASSWORD_INFO_KEY.PREV_PASSWORD)}
        />
        <Input
          labelText="새로운 비밀번호"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={newPassword}
          placeholder="새로운 비밀번호를 입력해주세요"
          onChange={handleUserInfoChange(PASSWORD_INFO_KEY.NEW_PASSWORD)}
        />
        <Input
          labelText="새로운 비밀번호 확인"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={newPasswordConfirm}
          placeholder="새로운 비밀번호를 입력해주세요"
          onChange={handleUserInfoChange(PASSWORD_INFO_KEY.NEW_PASSWORD_CONFIRM)}
        />
        <Button text="수정하기" />
      </StyledUserForm>
    </StyledUserContainer>
  );
}

export default ModifyPasswordPage;
