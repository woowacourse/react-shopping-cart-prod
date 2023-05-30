import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import Header from '../Header';

interface ContentLayoutProps {
  title?: string;
}

const ContentLayout = ({
  children,
  title = '',
}: PropsWithChildren<ContentLayoutProps>) => {
  return (
    <>
      <Header />
      <ContentSection>
        <Title>{title}</Title>
        <Container>{children}</Container>
      </ContentSection>
    </>
  );
};

const ContentSection = styled.section`
  width: 80%;
  margin: 140px auto 0 auto;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  @media (min-width: 320px) and (max-width: 1100px) {
    flex-direction: column;
    margin: 0 20px;
  }
`;

const Title = styled.h1`
  height: 60px;
  margin-bottom: 32px;
  text-align: center;
  font: ${(props) => props.theme.font.large};
  border-bottom: 4px solid ${(props) => props.theme.color.primary};
`;

export default ContentLayout;
