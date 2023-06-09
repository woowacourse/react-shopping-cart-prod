import styled, { css } from 'styled-components';
import type { CSSProp } from 'styled-components';

export interface TextProps {
  size?: 'xSmall' | 'small' | 'medium' | 'large';
  css?: CSSProp;
}

const getSizeStyling = (size: Required<TextProps>['size']) => {
  const style = {
    large: css`
      font-size: 18px;
      line-height: 28px;
    `,
    medium: css`
      font-size: 16px;
      line-height: 24px;
    `,
    small: css`
      font-size: 14px;
      line-height: 20px;
    `,
    xSmall: css`
      font-size: 12px;
      line-height: 20px;
    `,
  };

  return style[size];
};

const Text = styled.p<TextProps>`
  ${({ size = 'medium' }) => getSizeStyling(size)}
  ${(props) => props.css}
`;

export { Text };
