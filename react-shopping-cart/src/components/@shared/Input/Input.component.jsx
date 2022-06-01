import styled, { css } from 'styled-components';

const Input = styled.input`
  ${({ error, width }) => `
    ${
      error
        ? css`
            border: 2px solid #c5032b;
          `
        : css`
            border: 1px solid #d7dbe6;
          `
    } 
    width: ${width ?? '100%'};
  `}
  font-size: 15px;
  border-radius: 10px;
  height: 50px;
  padding: 0 18px;
  &:focus {
    outline-color: ${({ theme }) => theme.colors['MINT_001']};
  }
  &::placeholder {
    color: #d7dbe6;
  }
`;

export default Input;
