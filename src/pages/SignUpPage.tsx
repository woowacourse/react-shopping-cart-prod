import SignInput from 'components/common/SignInput';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
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

const initialValidState: ValidState = {
  name: false,
  email: false,
  password: false,
  passwordConfirm: false,
};

type ValidState = {
  [key in keyof InputState]: boolean;
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useAppSelector(state => state.userReducer);
  const [inputState, setInputState] = useState<InputState>(initialInputState);
  const [validState, setValidState] = useState<ValidState>(initialValidState);

  const dispatch = useAppDispatch<UserAction>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputInfo = {
      email: inputState.email,
      name: inputState.name,
      password: inputState.password,
    };

    if (Object.values(validState).every(valid => valid)) {
      dispatch(signUp(inputInfo));
      navigate('/signIn');
    }
  };

  const handleEmailInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputState(prev => ({ ...prev, email: value }));

    if (value) {
      setValidState(prev => ({ ...prev, email: true }));
    }
  };

  const handleNameInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputState(prev => ({ ...prev, name: value }));
    if (value) {
      setValidState(prev => ({ ...prev, name: true }));
    }
  };

  const handlePasswordInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputState(prev => ({ ...prev, password: value }));

    if (/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/.test(value)) {
      setValidState(prev => ({ ...prev, password: true }));
    }
  };

  const handlePasswordConfirmInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputState(prev => ({ ...prev, passwordConfirm: value }));

    if (inputState.password === value) {
      setValidState(prev => ({ ...prev, passwordConfirm: true }));
    }
  };

  return (
    <StyledRoot onSubmit={handleSubmit}>
      <StyledTitle>회원가입</StyledTitle>

      <SignInput type={'email'} onChange={handleEmailInput}>
        이메일
      </SignInput>
      <SignInput type={'text'} onChange={handleNameInput}>
        이름
      </SignInput>
      <SignInput type={'password'} onChange={handlePasswordInput}>
        비밀번호
      </SignInput>
      <SignInput type={'password'} onChange={handlePasswordConfirmInput}>
        비밀번호 확인
      </SignInput>

      <StyledLoginButton>확인</StyledLoginButton>
    </StyledRoot>
  );
};

const StyledRoot = styled.form`
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
