import styled from '@emotion/styled';

import { COLORS } from 'styles/theme';

const Container = styled.div`
  position: relative;
  height: 100vh;
  margin: 0 auto;
  padding: 3rem 3rem;
  max-width: 454px;
  background-color: ${COLORS.WHITE};
`;

const Content = styled.main`
  padding: 0;
`;

export { Container, Content };
