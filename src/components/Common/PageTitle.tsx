import { ReactElement } from 'react';
import { styled } from 'styled-components';

interface PageTitleProps {
  children: string;
}

const PageTitle = ({ children }: PageTitleProps) => {
  return <Title>{children}</Title>;
};

const Title = styled.h2`
  position: absolute;
  top: 0;
  left: 50%;
  width: calc(100% - 60px);
  height: 120px;
  padding: 48px 0 0 0;
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  border-bottom: 4px solid ${({ theme }) => theme.colors.black};
  transform: translate(-50%, 0);
`;

export default PageTitle;
