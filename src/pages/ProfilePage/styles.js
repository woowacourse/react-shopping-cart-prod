import styled from '@emotion/styled/macro';

import { COLORS } from 'styles/theme';

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  margin: 5rem auto;
`;

const Container = styled.form`
  width: 100%;
`;

const InlineField = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 75% 22%;
  gap: 3%;
`;

const Link = styled.div`
  padding: 2rem 0;
  text-align: right;

  a {
    color: ${COLORS.GRAY_100};
    font-size: 0.8rem;
  }
`;

export { PageContent, Container, InlineField, Link };
