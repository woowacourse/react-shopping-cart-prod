import { PropsWithChildren } from 'react';

import * as styled from './Layout.styled';

import { Header } from '../../Header/Header';
import { PageTitle } from '../../styled/PageTitle';

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
