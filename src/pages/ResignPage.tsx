import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import usePasswordInput from 'hooks/usePasswordInput';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { FormEvent, useRef, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { resign } from 'redux/action-creators/userThunk';
import { UserAction } from 'redux/actions/user';
import SignInput from 'components/common/SignInput';
import { PATH } from 'Router';

const ResignPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch<UserAction>();
  const { loading, error, data } = useAppSelector(state => state.userReducer);
  const confirmMessageRef = useRef<HTMLInputElement | null>(null);
  const { currentPasswordRef, passwordValid, handleCurrentPasswordInput } = usePasswordInput();
  const [confirmMessageValid, setConfirmMessageValid] = useState(false);

  useUpdateEffect(() => {
    if (!error) {
      navigate(PATH.default);
    }
  }, [loading, error]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputInfo = currentPasswordRef.current.value;

    if (passwordValid.current && confirmMessageValid) {
      dispatch(resign(inputInfo));

      localStorage.removeItem('token');
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

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(121, 121, 121, 0.568) 5px 5px 5px 0.5px;

  display: flex;
  flex-direction: column;
  width: 60rem;
  gap: 5rem;
  height: 90rem;
  border: 1px solid ${theme.colors.black};
  border-radius: 8px;
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
  background-color: ${theme.colors.primary};
  font-size: 2.3rem;
  font-weight: bold;
  color: ${theme.colors.white};
  border-radius: 6px;
`;

export default ResignPage;
