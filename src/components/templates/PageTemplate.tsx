import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet';

type PagePropsType = PropsWithChildren<{ title: string; description: string }>;

const PageTemplate = ({ children, title, description }: PagePropsType) => {
  return (
    <>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: description },
          { property: 'og:type', content: 'website' },
          { property: 'og:title', content: title },
          { property: 'og:description', content: description },
        ]}
      />
      <PageWrapper>{children}</PageWrapper>
    </>
  );
};

export default PageTemplate;

const PageWrapper = styled.div`
  width: 100%;
  padding: 142px 0 62px 0;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 660px) {
    padding: 142px 0 0 0;
  }
`;
