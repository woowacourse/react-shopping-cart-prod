import { styled } from 'styled-components';

interface PageTitleProps {
  children: string;
}

const PageTitle = ({ children }: PageTitleProps) => {
  return <Title>{children}</Title>;
};

const Title = styled.h2`
  width: 100%;
  text-align: center;
  padding-bottom: 20px;

  border-bottom: 4px solid ${({ theme }) => theme.colors.black};
  font-size: 32px;
  font-weight: 600;

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    border-bottom: none;
  }
`;

export default PageTitle;
