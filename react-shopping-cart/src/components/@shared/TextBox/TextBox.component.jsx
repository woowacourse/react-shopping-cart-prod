import styled, { css } from 'styled-components';

const TextBox = styled.div`
  font-style: normal;
  letter-spacing: 0.5px;
  color: ${({ color, theme }) => theme.colors[color] ?? theme.colors['BLACK_001']};
  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `}
  ${({ fontSize }) => {
    switch (fontSize) {
      case 'extraSmall':
        return css`
          font-size: 13px;
        `;
      case 'small':
        return css`
          font-size: 16px;
        `;
      case 'medium':
        return css`
          font-size: 20px;
        `;
      case 'large':
        return css`
          font-size: 24px;
        `;
      case 'extraLarge':
        return css`
          font-size: 32px;
        `;
      default:
        return css`
          font-size: 20px;
        `;
    }
  }}
`;

export default TextBox;
