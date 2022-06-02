import SignInput from 'components/common/SignInput';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import usePasswordInput from 'hooks/usePasswordInput';
import { FormEvent, useRef, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { resign } from 'redux/action-creators/userThunk';
import { UserAction } from 'redux/actions/user';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';

const ResignPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch<UserAction>();
  const { loading, error, data } = useAppSelector(state => state.userReducer);
  const confirmMessageRef = useRef<HTMLInputElement | null>(null);
  const { currentPasswordRef, passwordValid, handleCurrentPasswordInput } = usePasswordInput();
  const [confirmMessageValid, setConfirmMessageValid] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputInfo = currentPasswordRef.current.value;

    if (passwordValid.current && confirmMessageValid) {
      dispatch(resign(inputInfo));

      localStorage.clear();
      navigate('/main/1');
    }
  };

  const handleMessageInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (value === '응') {
      setConfirmMessageValid(true);

      return;
    }

    setConfirmMessageValid(false);
  };

  return (
    <StyledRoot onSubmit={handleSubmit}>
      <StyledTitle>회원 탈퇴</StyledTitle>

      <SignInput placeholder={data.email} type={'email'} disable={true}>
        이메일
      </SignInput>
      <SignInput type={'password'} onChange={handleCurrentPasswordInput} ref={currentPasswordRef}>
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
