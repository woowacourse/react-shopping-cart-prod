import styled, { css } from 'styled-components';

const Button = styled.button`
  background: ${({ theme }) => theme.colors['MINT_001']};
  color: ${({ theme }) => theme.colors['WHITE_001']};
  font-size: 24px;
  text-align: center;
  cursor: pointer;

  ${({ width, height, borderRadius, mt, padding }) =>
    css`
      width: ${width};
      height: ${height};
      margin-top: ${mt};
      border-radius: ${borderRadius};
      padding: ${padding ?? '20px'};
    `}

  &:hover {
    filter: brightness(0.8);
  }

  &:disabled,
  &:disabled:hover {
    background: ${({ theme }) => theme.colors['GRAY_001']};
    cursor: unset;
  }
`;

export default Button;
