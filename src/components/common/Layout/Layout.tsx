import { PropsWithChildren } from 'react';
import * as styled from './Layout.styled';
import { ErrorBoundary } from 'react-error-boundary';

import { Header } from '@components/Header/Header';
import { PageTitle } from '@components/styled/PageTitle';
import { FallbackRender } from '@components/FallbackRender/FallbackRender';

interface LayoutProps extends PropsWithChildren {
  pageTitle?: string;
}

export const Layout = ({ children, pageTitle }: LayoutProps) => (
  <styled.Layout>
    <Header />
    <styled.Container>
      {pageTitle && <PageTitle>{pageTitle}</PageTitle>}
      <ErrorBoundary fallbackRender={FallbackRender}>{children}</ErrorBoundary>
    </styled.Container>
  </styled.Layout>
);
