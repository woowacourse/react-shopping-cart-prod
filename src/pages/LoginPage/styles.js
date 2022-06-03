import styled from '@emotion/styled';

import { FlexContainer } from 'components/@common';

import { COLORS, BRAND_COLORS } from 'styles/theme';

const Container = styled.form`
  ${FlexContainer}:last-child {
    padding: 1.5rem 0;
  }
`;

const NonMemberText = styled.p`
  font-size: 0.875rem;
  text-align: center;
  color: ${COLORS.GRAY_100};

  a {
    color: ${BRAND_COLORS.PRIMARY};
    text-decoration: none;
  }
`;

export { Container, NonMemberText };
