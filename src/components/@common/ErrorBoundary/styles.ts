import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';

export const Styled = {
  Message: styled.div`
    ${flexCenter}
    font-size: 5rem;
    color: ${theme.colors.grey};
  `,
};
