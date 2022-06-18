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
import { MESSAGE } from 'constant/message';
import { Styled } from './styles';

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
        dispatch(updateSnackBar(MESSAGE.FAILED_RESIGN));
      }
    }
  };

  return (
    <Styled.ResignPage>
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.Title>회원 탈퇴</Styled.Title>

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

        <Styled.SignUpButton>확인</Styled.SignUpButton>
      </Styled.Form>
    </Styled.ResignPage>
  );
};

export default ResignPage;
