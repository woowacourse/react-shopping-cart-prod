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
`;

export default Button;
