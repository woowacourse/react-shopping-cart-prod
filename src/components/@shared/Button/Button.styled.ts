import styled, { css } from 'styled-components';

import { Props } from './Button.type';

const Button = styled.button`
  border-radius: 5px;

  font-size: 17px;
  font-weight: 900;

  ${({
    width,
    height,
    marginTop,
    reverse,
  }: {
    width: string;
    height: string;
    marginTop: Props['marginTop'];
    reverse: Props['reverse'];
  }) => css`
    width: ${width};
    height: ${height};

    margin-top: ${marginTop};
    ${reverse
      ? css`
          border: 1px solid ${({ theme: { colors } }) => colors.redPink};

          background: ${({ theme: { colors } }) => colors.white};
          color: ${({ theme: { colors } }) => colors.redPink};
        `
      : css`
          background: ${({ theme: { colors } }) => colors.redPink};
          color: ${({ theme: { colors } }) => colors.white};
        `}
  `}
`;

export { Button };
