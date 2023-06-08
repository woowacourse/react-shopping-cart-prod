import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import CartBadge from '@Components/CartBadge';

import useCartItems from '@Hooks/useCartItems';

import serverState from '@Atoms/serverState';

import ROUTES from '@Constants/routes';

import Logo from '@Asset/Logo.png';

import * as S from './style';

function Header() {
  const navigate = useNavigate();

  const { cartItemsAmount } = useCartItems();

  const server = useRecoilValue(serverState);

  const moveMain = () => navigate('/');

  const moveOrderList = () => navigate(ROUTES.orderList);

  return (
    <S.Container aria-label="페이지 헤더">
      <S.Layout>
        <S.LogoWrapper onClick={moveMain}>
          <S.LogoImg src={Logo} alt="장바구니 로고" />
          <S.LogoText>SHOP</S.LogoText>
        </S.LogoWrapper>
        <CartBadge cartItemsAmount={cartItemsAmount} username={server} />
        <S.OrderList onClick={moveOrderList}>주문 목록</S.OrderList>
      </S.Layout>
    </S.Container>
  );
}

export default Header;
