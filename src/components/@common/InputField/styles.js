import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { COLORS, BRAND_COLORS } from 'styles/theme';

const Container = styled.div``;

const Input = styled.input`
  border: 1px solid ${COLORS.GRAY_150};
  padding: 1rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;

  width: ${({ width }) => width};
  ${({ status }) =>
    ({
      default: css`
        border-color: ${COLORS.GRAY_150};
      `,
      danger: css`
        border-color: ${BRAND_COLORS.DANGER};
      `,
    }[status])}

  &:focus {
    border-color: ${COLORS.GRAY_50};
  }
`;

const Message = styled.p`
  font-size: 0.75rem;
  padding: 0.5rem 0 0;

  &:empty {
    display: none;
  }

  ${({ status }) =>
    ({
      success: css`
        color: ${BRAND_COLORS.SUCCESS};
      `,
      danger: css`
        color: ${BRAND_COLORS.DANGER};
      `,
    }[status])}
`;

export { Container, Input, Message };
