import { PropsWithChildren } from 'react';
import * as styled from './Layout.styled';
import { ErrorBoundary } from 'react-error-boundary';

import { Header } from '@components/Header/Header';
import { PageTitle } from '@components/styled/PageTitle';
import { FallbackRender } from '@components/FallbackRender/FallbackRender';

interface LayoutProps extends PropsWithChildren {
  pageTitleValue?: string;
}

export const Layout = ({ children, pageTitleValue }: LayoutProps) => (
  <styled.Layout>
    <Header />
    <styled.Container>
      {pageTitleValue && <PageTitle>{pageTitleValue}</PageTitle>}
      <ErrorBoundary fallbackRender={FallbackRender}>{children}</ErrorBoundary>
    </styled.Container>
  </styled.Layout>
);
