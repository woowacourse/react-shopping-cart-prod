import styled from "styled-components";

function RegisterForm({ children }) {
  return <Form>{children}</Form>;
}

export default RegisterForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 48px 16px;
`;
