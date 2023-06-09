import { PropsWithChildren } from 'react';
import Header from '@components/layout/Header';
import { Container } from '@styles/style';

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
}

export default Layout;
