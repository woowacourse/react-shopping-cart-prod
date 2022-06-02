import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { COLORS, BRAND_COLORS } from 'styles/theme';

const Container = styled.div``;

const Input = styled.input`
  border: 1px solid ${COLORS.GRAY_150};
  padding: 0.75rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${COLORS.GRAY_50};
  }

  width: ${({ width }) => width};
  ${({ status }) =>
    ({
      default: css`
        &,
        &:focus {
          border-color: ${COLORS.GRAY_150};
        }
      `,
      danger: css`
        &,
        &:focus {
          border-color: ${BRAND_COLORS.DANGER};
        }
      `,
    }[status])}
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
