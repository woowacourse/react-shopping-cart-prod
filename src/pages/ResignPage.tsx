import SignInput from 'components/common/SignInput';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resign, signUp } from 'redux/action-creators/userThunk';
import { UserAction, UserActionType } from 'redux/actions/user';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';

const ResignPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch<UserAction>();

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmMessageRef = useRef<HTMLInputElement | null>(null);

  const [inputValid, setInputValid] = useState({
    password: false,
    confirmMessage: false,
  });

  const { loading, error, data } = useAppSelector(state => state.userReducer);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputInfo = passwordRef.current.value;

    if (Object.values(inputValid).every(valid => valid)) {
      dispatch(resign(inputInfo));

      localStorage.clear();
      navigate('/main/1');
    }
  };

  const handlePasswordInput = ({ target: { value } }) => {
    if (value) {
      setInputValid(prevState => ({ ...prevState, password: true }));

      return;
    }

    setInputValid(prevState => ({ ...prevState, password: false }));
  };

  const handleMessageInput = ({ target: { value } }) => {
    if (value === '응') {
      setInputValid(prevState => ({ ...prevState, confirmMessage: true }));

      return;
    }

    setInputValid(prevState => ({ ...prevState, confirmMessage: false }));
  };

  return (
    <StyledRoot onSubmit={handleSubmit}>
      <StyledTitle>회원 탈퇴</StyledTitle>

      <SignInput placeholder={data.email} type={'email'} disable={true}>
        이메일
      </SignInput>
      <SignInput type={'password'} onChange={handlePasswordInput} ref={passwordRef}>
        비밀번호 확인
      </SignInput>
      <SignInput type={'text'} onChange={handleMessageInput} ref={confirmMessageRef}>
        {'탈퇴하시려면 "응"을 입력해 주세요'}
      </SignInput>

      <StyledSignUpButton>확인</StyledSignUpButton>
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

const StyledSignUpButton = styled.button`
  width: 80%;
  height: 65px;
  background-color: ${theme.colors.primary};
  font-size: 23px;
  font-weight: bold;
  color: white;
  border-radius: 6px;
`;

export default ResignPage;
