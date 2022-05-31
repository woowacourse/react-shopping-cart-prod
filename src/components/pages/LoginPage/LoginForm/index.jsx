import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 48px 16px;
`;

function LoginForm({ children }) {
  return <Form>{children}</Form>;
}

export default LoginForm;
