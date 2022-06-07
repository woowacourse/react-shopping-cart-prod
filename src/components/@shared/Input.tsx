import styled from 'styled-components';

function Input({
  children,
  id,
  type,
  placeholder,
  pattern,
  maxLength,
  value,
  onChange,
  required,
  disabled,
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      {children && <StyledLabel htmlFor={id}>{children}</StyledLabel>}
      <StyledInput
        id={id}
        type={type}
        placeholder={placeholder}
        pattern={pattern}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </>
  );
}

const StyledLabel = styled.label`
  margin-top: 4px;
  font-size: 14px;
`;

const StyledInput = styled.input`
  border: 1px solid ${({ theme: { colors } }) => colors.lightGray};
  border-radius: 2px;
  padding: 6px 8px;

  &[type='number'] {
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export default Input;
