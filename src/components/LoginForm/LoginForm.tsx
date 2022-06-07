import CheckBox from 'components/@shared/CheckBox';
import Link from 'components/@shared/Link';
import styled from 'styled-components';
<<<<<<< HEAD
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { userActions } from 'redux/actions';
=======
>>>>>>> 888b077 (refactor: LoginForm 비지니스로직 훅으로 이동)
import LabeledInput from 'components/@shared/LabeledInput';
import useLoginForm from './useLoginForm';

function LoginForm() {
<<<<<<< HEAD
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);

  const toggleChecked = (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>,
  ) => {
    e.preventDefault();

    setChecked(prevState => !prevState);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    const formElement = e.target.elements;
    const getInputValue = createInputValueGetter(formElement);
    const user = {
      username: getInputValue('id'),
      password: getInputValue('password'),
    };

    try {
      const userInfo = await authAPI.login(user, checked);

      dispatch(userActions.setUser(userInfo));
      navigate(PATH.BASE);
    } catch (error) {
      if (error instanceof Error) {
        alert(USER_MESSAGE.FAIL_LOGIN);
      }
    }
  };
=======
  const { handleSubmit } = useLoginForm();
>>>>>>> 888b077 (refactor: LoginForm 비지니스로직 훅으로 이동)

  return (
    <StyledForm onSubmit={handleSubmit}>
      <LabeledInput
        id="id"
        type="text"
        placeholder="아이디를 입력해주세요"
        required
      >
        아이디
      </LabeledInput>
      <LabeledInput
        id="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        required
      >
        비밀번호
      </LabeledInput>
      <StyledLoginHelper>
        <StyledKeepLogin>
          <CheckBox
            id="keep-login"
            checked={checked}
            onChange={toggleChecked}
            marginBottom="0px"
          />
          <label htmlFor="keep-login">로그인 상태 유지</label>
        </StyledKeepLogin>
        <StyledFindLoginInfo>
          <Link to="#">아이디 찾기</Link>
          <Link to="#">비밀번호 찾기</Link>
        </StyledFindLoginInfo>
      </StyledLoginHelper>
      <StyledLoginButton type="submit">로그인</StyledLoginButton>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  > label {
    margin-top: 10px;
    font-size: 14px;
  }

  > input {
    border: 1px solid ${({ theme: { colors } }) => colors.lightGray};
    border-radius: 2px;
    padding: 6px 8px;
  }
`;

const StyledLoginHelper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  width: 100%;
`;

const StyledKeepLogin = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  > label {
    font-size: 10px;
  }
`;

const StyledFindLoginInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  color: ${({ theme: { colors } }) => colors.gray};

  font-size: 10px;

  a:hover {
    font-weight: 900;
  }
`;

const StyledLoginButton = styled.button`
  background: ${({ theme: { colors } }) => colors.redPink};
  color: ${({ theme: { colors } }) => colors.white};
  border-radius: 5px;

  height: 40px;
  margin-top: 20px;

  font-size: 17px;
  font-weight: 900;
`;

export default LoginForm;
