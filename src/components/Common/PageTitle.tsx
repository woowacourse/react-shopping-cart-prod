import type { PropsWithChildren } from 'react';
import styled from 'styled-components';

const PageTitle = ({ children }: PropsWithChildren) => {
  return <Title>{children}</Title>;
};

const Title = styled.h2`
  height: 45px;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  border-bottom: 4px solid ${({ theme }) => theme.colors.black};

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    height: 60px;
    text-align: center;
    font-size: 32px;
    font-weight: 600;
  }
`;

export default PageTitle;
