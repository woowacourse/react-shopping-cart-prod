import styled, { css } from 'styled-components';

const textColor = {
  success: css`
    color: ${({ theme }) => theme.COLOR.PRIMARY_GREEN};
  `,
  error: css`
    color: ${({ theme }) => theme.COLOR.PRIMARY_RED};
  `,
};

export const Wrapper = styled.span`
  ${({ validType }) => textColor[validType]};
`;
