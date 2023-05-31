import styled, { css } from 'styled-components';

export interface TextProps {
  size?: 'xSmall' | 'small' | 'medium' | 'large';
}

const getSizeStyling = (size: Required<TextProps>['size']) => {
  const style = {
    xLarge: css`
      font-size: 20px;
      line-height: 30px;
    `,
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
`;

export { Text };
