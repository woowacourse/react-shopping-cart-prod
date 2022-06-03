import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import * as S from './styles';

function ShoppingLayout() {
  return (
    <S.Container>
      <Header />
      <S.Content>
        <Outlet />
      </S.Content>
      <Footer />
    </S.Container>
  );
}

export default ShoppingLayout;
