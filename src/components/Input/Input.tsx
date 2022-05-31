import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  box-sizing: border-box;
  color: ${({ theme: { colors } }) => colors.black};
  outline: 1px solid ${({ theme: { colors } }) => colors.gray};
  border: none;
  border-radius: 4px;

  ::placeholder {
    color: ${({ theme: { colors } }) => colors.gray};
  }

  :focus {
    outline: 2px solid ${({ theme: { colors } }) => colors.blue};
  }

  :disabled {
    background-color: ${({ theme: { colors } }) => colors.lightGray};
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export default Input;
