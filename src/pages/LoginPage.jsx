import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { StyledUserContainer, StyledUserForm } from '../components/common/Styled';

import useUserForm from '../hooks/useUserForm';
import { validLoginInfo } from '../utils/validations';

import { MESSAGE, SERVER_PATH, ROUTES_PATH, USER_INFO_KEY } from '../constants';
import actionTypes from '../store/user/user.actions';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginInfo, setLoginInfo, handleUserInfoChange } = useUserForm();
  const { email, password } = loginInfo;

  const handleLoginInfoSubmit = async (e) => {
    e.preventDefault();

    try {
      validLoginInfo(email);
      const { data } = await axios.post(SERVER_PATH.LOGIN, { email, password });
      console.log(data);
      dispatch({ type: actionTypes.ADD_TOKEN, data });
      alert(MESSAGE.LOGIN_SUCCESS);
      navigate(ROUTES_PATH.HOME);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <StyledUserContainer>
      <h1>로그인</h1>
      <StyledUserForm onSubmit={handleLoginInfoSubmit}>
        <Input
          labelText="이메일"
          type="email"
          placeholder="이메일 주소를 입력해주세요"
          value={email}
          onChange={handleUserInfoChange(setLoginInfo, USER_INFO_KEY.EMAIL)}
        />
        <Input
          labelText="비밀번호"
          type="password"
          value={password}
          placeholder="영문자(대,소), 숫자, 특수기호 조합을 입력하세요"
          onChange={handleUserInfoChange(setLoginInfo, USER_INFO_KEY.PASSWORD)}
        />
        <Button text="로그인" />
      </StyledUserForm>
    </StyledUserContainer>
  );
}

export default LoginPage;
