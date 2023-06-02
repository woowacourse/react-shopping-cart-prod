import type { PropsWithChildren } from 'react';

import styled from 'styled-components';

interface Props {
  title?: string;
}

export default function SubPageTemplate({ children, title }: PropsWithChildren<Props>) {
  return (
    <Wrapper>
      {title && (
        <Header>
          <h2>{title}</h2>
        </Header>
      )}
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  padding-bottom: 16px;
`;

const Header = styled.div`
  width: 100%;
  border-bottom: 4px solid #333333;
  padding-bottom: 28px;

  line-height: 37px;
  letter-spacing: 0.5px;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #333333;
`;
