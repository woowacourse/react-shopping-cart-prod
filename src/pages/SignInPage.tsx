import { styled } from 'styled-components';
import useSignIn from '../hooks/useSignIn';

const SignInPage = () => {
  const { onChageId, onChangePassword, onClickSubmit } = useSignIn();

  return (
    <Wrapper>
      <h1>Sign In</h1>
      <Form>
        <InputContainer>
          ID :
          <Input
            type='email'
            autoComplete='email'
            onChange={onChageId}
            required
          />
        </InputContainer>
        <InputContainer>
          Password :
          <Input
            type='password'
            autoComplete='current-password'
            onChange={onChangePassword}
            required
          />
        </InputContainer>
        <SubmitButtonContainer>
          <SubmitButton onClick={onClickSubmit}>submit</SubmitButton>
        </SubmitButtonContainer>
      </Form>
    </Wrapper>
  );
};

export default SignInPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 48px;

  width: 500px;
  height: 250px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 400px;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  padding: 0px 8px;

  font-size: 16px;
  font-family: sans-serif;
  letter-spacing: 1px;

  border: 1px solid black;
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: end;

  width: 100%;
`;

const SubmitButton = styled.button`
  border: 1px solid black;
  padding: 8px;

  transition: background-color 0.5s ease;

  &:hover {
    color: #fff;
    background-color: var(--main-bg-color);
  }
`;
