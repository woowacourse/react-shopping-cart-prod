import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { PAGE_LIST } from 'constants/';

import * as S from './styles';

function Header() {
<<<<<<< HEAD
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLogin = useSelector(({ user }) => user.isLogin);
=======
  const cartItems = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector((state) => state.members.isLoggedIn);
>>>>>>> 68aa226472f257aae4442d058ba944e087c68854

  return (
    <S.Container>
      <S.LeftMenu>
        <S.MenuButton type="button">전체 카테고리</S.MenuButton>
      </S.LeftMenu>

      <Link to={PAGE_LIST.HOME}>
        <S.Logo />
      </Link>

      <S.RightMenu>
        <Link to={PAGE_LIST.CART_LIST}>
          <S.RightMenuList className="cart" count={cartItems.length}>
            장바구니
          </S.RightMenuList>
        </Link>

<<<<<<< HEAD
        <Link to={!isLogin ? PAGE_LIST.LOGIN : PAGE_LIST.LOGOUT}>
          <S.RightMenuList className="order-list">
            {!isLogin ? '로그인' : '로그아웃'}
=======
        <Link to={!isLoggedIn ? PAGE_LIST.LOGIN : PAGE_LIST.LOGOUT}>
          <S.RightMenuList className="order-list">
            {!isLoggedIn ? '로그인' : '로그아웃'}
>>>>>>> 68aa226472f257aae4442d058ba944e087c68854
          </S.RightMenuList>
        </Link>
      </S.RightMenu>
    </S.Container>
  );
}

export default Header;
