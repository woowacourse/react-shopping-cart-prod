import styled, { css } from 'styled-components';
import { Theme } from '../../types';

type Props = {
  color?: keyof Theme['colors'];
  theme: Theme;
};

const Button = styled.button<Props>`
  font-size: 1rem;
  width: 100%;
  height: 100%;
  padding: 16px;
  background: ${({ color, theme: { colors } }) =>
    color ? colors[color] : colors.emerald};
  color: ${({ theme: { colors } }) => colors.white};

  ${({ color, theme: { colors } }) =>
    color === 'white' &&
    css`
      background: ${colors[color]};
      color: ${colors.black};
      border: 1px solid ${colors.gray};
    `}

  :disabled {
    pointer-events: none;
    background: ${({ theme: { colors } }) => colors.gray};
  }
`;

export default Button;
