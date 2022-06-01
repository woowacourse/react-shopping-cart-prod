import { Body, Title } from './styles';

interface PageLayoutProps {
  title?: string;
  children: JSX.Element | JSX.Element[];
}

function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <Body>
      {title && <Title>{title}</Title>}
      {children}
    </Body>
  );
}

export default PageLayout;
