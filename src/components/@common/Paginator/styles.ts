import styled, { css } from 'styled-components';

export const Styled = {
  Paginator: styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 5rem;
  `,

  PageIndicator: styled.button<{ active?: boolean }>`
    ${({ active, theme }) =>
      active &&
      css`
        color: ${theme.colors.primary};
        font-weight: 700;
      `}

    font-size: 3rem
  `,
};
