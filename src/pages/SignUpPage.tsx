import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { signUp } from 'redux/action-creators/userThunk';
import { UserAction } from 'redux/actions/user';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';

const SignUpPage = () => {
  const { loading, error, data } = useAppSelector(state => state.userReducer);

  const dispatch = useAppDispatch<UserAction>();

  const onClick = () => {
    const tempInfo = {
      email: 'ansghkdbsgh',
      name: 'yunho',
      password: '1234',
    };

    dispatch(signUp(tempInfo));
  };

  return (
    <StyledRoot>
      <StyledTitle>회원가입</StyledTitle>
      <StyledLabel>
        이메일
        <StyledInput />
      </StyledLabel>

      <StyledLabel>
        이름
        <StyledInput />
      </StyledLabel>

      <StyledLabel>
        비밀번호
        <StyledInput />
      </StyledLabel>

      <StyledLabel>
        비밀번호 확인
        <StyledInput />
      </StyledLabel>

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

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 80%;

  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  letter-spacing: 0.5px;

  gap: 10px;
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

const StyledInput = styled.input`
  width: 100%;
  height: 65px;
  font-size: 20px;
  padding-left: 10px;
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
