import styled from 'styled-components';
import { Header } from './header/Header';

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <Style.Container>
      <Header />
      {children}
    </Style.Container>
  );
};

const Style = {
  Container: styled.div`
    max-width: 1080px;
    padding: 140px 0 60px;
    margin: 0 auto;

    @media (max-width: 1080px) {
      padding: 120px 20px 60px;
    }
  `,
};
