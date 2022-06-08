import styled from '@emotion/styled';

import { FlexContainer } from 'components/@common';

import { COLORS } from 'styles/theme';

const Container = styled.section`
  margin-bottom: 1.8rem;

  ${FlexContainer} {
    margin-bottom: 0.6rem;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
`;

const Description = styled.p`
  font-size: 0.75rem;
  color: ${COLORS.GRAY_70};
`;

export { Container, Label, Description };
