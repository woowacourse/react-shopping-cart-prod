import { styled } from "styled-components";
import { Button, Page } from "../components";
import { useLoginForm } from "../hooks/useLoginForm";
import { useRouter } from "../hooks/useRouter";
import { ROUTER_PATH } from "../router";

const Login = () => {
  const { goPage } = useRouter();
  const {
    username,
    password,
    usernameRef,
    handleUsernameChanged,
    handlePasswordChanged,
    handlePasswordKey,
    handleFormSubmitted,
  } = useLoginForm();

  return (
    <Page>
      <FormContainer onSubmit={handleFormSubmitted}>
        <p>LOGIN</p>
        <label>
          아이디<span>*</span>
        </label>
        <CustomInput
          id="username"
          ref={usernameRef}
          value={username}
          autoFocus
          required
          onChange={handleUsernameChanged}
          maxLength={20}
          placeholder="아이디 혹은 이메일을 입력해 주세요."
        />
        <label>
          비밀번호<span>*</span>
        </label>
        <CustomInput
          id="password"
          value={password}
          onChange={handlePasswordChanged}
          minLength={4}
          maxLength={20}
          type="password"
          required
          placeholder="비밀번호를 입력해 주세요."
          onKeyDown={handlePasswordKey}
        />
        <ButtonContainer>
          <Button type="submit">로그인 하기</Button>
          <Button type="button" onClick={goPage(ROUTER_PATH.Main)}>
            다시 상품 목록 보러가기
          </Button>
        </ButtonContainer>
      </FormContainer>
    </Page>
  );
};

const CustomInput = styled.input`
  width: 90%;
  height: 40px;

  padding: 0 10px;
  background: #ecebf1;
  border-radius: 7px;
  border: none;

  font-size: 15px;
  color: black;

  &:focus {
    outline-color: #525252;
  }

  &::placeholder {
    font-size: 13px;
    color: gray;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  margin-top: 40px;
  width: 300px;
  height: auto;

  & > label {
    align-self: flex-start;
    font-weight: 500;
    font-size: 12px;
    color: #525252;
    margin: 20px 0 5px 20px;

    & > span {
      color: red;
      margin-left: 3px;
    }
  }

  & > p {
    align-self: center;
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
  margin-top: 20px;
`;

export default Login;
