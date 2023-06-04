import { styled } from 'styled-components';
import useSignIn from '../hooks/useSignIn';

const SignInPage = () => {
  const { onChageId, onChagePassword, onClickSubmit } = useSignIn();

  return (
    <Wrapper>
      <h1>Sign In</h1>
      <Form>
        <InputContainer>
          ID : <Input onChange={onChageId} />
        </InputContainer>
        <InputContainer>
          Password : <Input onChange={onChagePassword} />
        </InputContainer>
        <SubmitButton onClick={onClickSubmit}>submit</SubmitButton>
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
  background-color: #ddd;

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

  border: 1px solid black;
`;

const SubmitButton = styled.button`
  border: 1px solid black;
  padding: 8px;
`;
