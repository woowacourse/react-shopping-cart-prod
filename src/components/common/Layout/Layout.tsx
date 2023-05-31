import { PropsWithChildren } from 'react';
import * as styled from './Layout.styled';

import { Header } from '@components/Header/Header';
import { PageTitle } from '@components/styled/PageTitle';

interface LayoutProps extends PropsWithChildren {
  pageTitle?: string;
}

export const Layout = ({ children, pageTitle }: LayoutProps) => (
  <styled.Layout>
    <Header />
    <styled.Container>
      {pageTitle && <PageTitle>{pageTitle}</PageTitle>}
      {children}
    </styled.Container>
  </styled.Layout>
);
