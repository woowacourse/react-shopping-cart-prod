import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import usePasswordInput from 'hooks/usePasswordInput';
import { FormEvent, useRef, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { resign } from 'redux/action-creators/userThunk';
import { UserAction } from 'redux/actions/user';
import SignInput from 'components/@common/SignInput';
import { PATH } from 'Router';
import { useDispatch } from 'react-redux';
import { updateSnackBar } from 'redux/actions/snackBar';

const ResignPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const thunkDispatch = useAppDispatch<UserAction>();
  const { data: userData } = useAppSelector(state => state.userReducer);
  const [confirmMessageValid, setConfirmMessageValid] = useState(false);
  const confirmMessageRef = useRef<HTMLInputElement | null>(null);
  const { currentPasswordRef, passwordValid, handleCurrentPasswordInput } = usePasswordInput();

  const handleMessageInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setConfirmMessageValid(value === '응');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputInfo = currentPasswordRef.current.value;

    if (passwordValid.current && confirmMessageValid) {
      try {
        await thunkDispatch(resign(inputInfo));
        navigate(PATH.default);
      } catch (error) {
        dispatch(updateSnackBar('회원 탈퇴에 실패했습니다.'));
      }
    }
  };

  return (
    <StyledRoot>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTitle>회원 탈퇴</StyledTitle>

        <SignInput placeholder={userData.email} type={'email'} disable={true}>
          이메일
        </SignInput>
        <SignInput type={'password'} onChange={handleCurrentPasswordInput} ref={currentPasswordRef}>
          비밀번호 확인
        </SignInput>
        <SignInput
          type={'text'}
          placeholder='응'
          onChange={handleMessageInput}
          ref={confirmMessageRef}
          isValid={confirmMessageValid}
        >
          {'탈퇴하시려면 "응"을 입력해 주세요'}
        </SignInput>

        <StyledSignUpButton>확인</StyledSignUpButton>
      </StyledForm>
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  ${flexCenter}
  height: 90rem;
`;

const StyledForm = styled.form`
  ${flexCenter}
  display: flex;
  flex-direction: column;
  width: 60rem;
  gap: 5rem;
  height: 90rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 5px;
`;

const StyledTitle = styled.h1`
  font-weight: 600;
  font-size: 3.4rem;
  line-height: 3.6rem;

  text-align: center;
`;

const StyledSignUpButton = styled.button`
  width: 80%;
  height: 6.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 2.3rem;
  font-weight: bold;
  color: ${theme.colors.white};
  border-radius: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightMint};
  }
`;

export default ResignPage;
