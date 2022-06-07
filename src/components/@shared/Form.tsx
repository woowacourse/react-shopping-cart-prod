import styled from 'styled-components';

function Form({
  onSubmit,
  children,
}: React.FormHTMLAttributes<HTMLFormElement>) {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;
`;

export default Form;
