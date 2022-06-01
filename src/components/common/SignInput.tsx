import styled from 'styled-components';

const SignInput = ({ children, type, onChange }) => {
  return (
    <StyledLabel>
      {children}
      <StyledInput type={type} onChange={onChange} required />
    </StyledLabel>
  );
};

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

const StyledInput = styled.input`
  width: 100%;
  height: 65px;
  font-size: 20px;
  padding-left: 10px;
`;

export default SignInput;
