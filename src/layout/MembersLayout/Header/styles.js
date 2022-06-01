import styled from '@emotion/styled';

import logo from 'assets/image/logo.png';

const Logo = styled.div`
  width: 100%;
  height: 3rem;

  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Container = styled.header`
  display: block;
  padding: 0 3rem;
  margin-bottom: 2.5rem;
`;

export { Container, Logo };
