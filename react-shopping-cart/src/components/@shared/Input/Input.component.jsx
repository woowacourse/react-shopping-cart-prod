import styled, { css } from 'styled-components';

const Input = styled.input`
  ${({ error, theme }) =>
    error
      ? css`
          border: 2px solid ${theme.colors['RED_002']};
        `
      : css`
          border: 1px solid ${theme.colors['GRAY_001']};
        `}
  width: ${({ width }) => width ?? '100%'};
  font-size: 15px;
  border-radius: 10px;
  height: 50px;
  padding: 0 18px;
  &:focus {
    outline-color: ${({ theme, error }) =>
      error ? theme.colors['RED_001'] : theme.colors['MINT_001']};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors['GRAY_001']};
  }
`;

export default Input;
