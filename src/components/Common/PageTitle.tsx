import { ReactElement } from 'react';
import { styled } from 'styled-components';

interface PageTitleProps {
  children: string;
}

const PageTitle = ({ children }: PageTitleProps) => {
  return <Title>{children}</Title>;
};

const Title = styled.h2`
  width: 100%;
  padding-top: 48px;
  text-align: center;

  border-bottom: 4px solid ${({ theme }) => theme.colors.black};
  font-size: 32px;
  font-weight: 600;

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    padding-top: 32px;

    border-bottom: none;
  }
`;

export default PageTitle;
