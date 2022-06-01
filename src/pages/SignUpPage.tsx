import SignInput from 'components/common/SignInput';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useState, ChangeEvent } from 'react';
import { signUp } from 'redux/action-creators/userThunk';
import { UserAction } from 'redux/actions/user';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';

interface InputState {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const initialInputState: InputState = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const SignUpPage = () => {
  const { loading, error, data } = useAppSelector(state => state.userReducer);
  const [inputState, setInputState] = useState<InputState>(initialInputState);

  const dispatch = useAppDispatch<UserAction>();

  const onClick = () => {
    const tempInfo = {
      email: 'ansghkdbsgh',
      name: 'yunho',
      password: '1234',
    };

    dispatch(signUp(tempInfo));
  };

  const handleEmailInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputState(prev => ({ ...prev, email: value }));
  };

  const handleNameInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputState(prev => ({ ...prev, name: value }));
  };

  const handlePasswordInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputState(prev => ({ ...prev, password: value }));
  };

  const handlePasswordConfirmInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputState(prev => ({ ...prev, passwordConfirm: value }));
  };

  return (
    <StyledRoot>
      <StyledTitle>회원가입</StyledTitle>

      <SignInput value={inputState.email} onChange={handleEmailInput}>
        이메일
      </SignInput>
      <SignInput value={inputState.name} onChange={handleNameInput}>
        이름
      </SignInput>
      <SignInput value={inputState.password} onChange={handlePasswordInput}>
        비밀번호
      </SignInput>
      <SignInput value={inputState.passwordConfirm} onChange={handlePasswordConfirmInput}>
        비밀번호 확인
      </SignInput>

      <StyledLoginButton onClick={onClick}>확인</StyledLoginButton>
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  ${flexCenter}
  display: flex;
  flex-direction: column;
  width: 600px;
  gap: 50px;
  height: 900px;
  border: 1px solid black;
`;

const StyledTitle = styled.h1`
  font-weight: 600;
  font-size: 34px;
  line-height: 36px;

  text-align: center;
`;

const StyledLoginButton = styled.button`
  width: 80%;
  height: 65px;
  background-color: ${theme.colors.primary};
  font-size: 23px;
  font-weight: bold;
  color: white;
  border-radius: 6px;
`;

const StyledFooter = styled.div`
  display: flex;
  width: 80%;
  justify-content: flex-end;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
`;

export default SignUpPage;
