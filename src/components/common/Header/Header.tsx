import { useNavigate } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';

import CartIcon from '../../../assets/cart-icon.svg';
import Logo from '../../../assets/logo.png';
import OrderIcon from '../../../assets/order-icon.svg';
import { PATH } from '../../../constants/path';
import { cartListItemCountState } from '../../../store/cart';
import ServerSelect from '../ServerSelect/ServerSelect';
import * as S from './Header.styles';

const Header = () => {
  const cartListItemCount = useRecoilValueLoadable(cartListItemCountState);
  const navigate = useNavigate();

  return (
    <S.HeaderContainer>
      <S.HeaderContentContainer>
        <S.Logo src={Logo} alt="logo" onClick={() => navigate(PATH.ROOT)} />
        <S.HeaderRightContainer>
          <ServerSelect />
          <S.OrderPageButton
            type="button"
            aria-labelledby="order-button"
            variant="textButton"
            onClick={() => navigate(PATH.ORDERS)}
          >
            <S.Icon src={OrderIcon} alt="order icon" />
            <S.HeaderButtonLabel id="cart-button">주문목록</S.HeaderButtonLabel>
          </S.OrderPageButton>
          <S.DividerLine />
          <S.CartButton
            type="button"
            aria-labelledby="cart-button"
            variant="textButton"
            onClick={() => navigate(PATH.CARTS)}
          >
            {cartListItemCount.contents > 0 && (
              <S.CartItemCount>{cartListItemCount.contents}</S.CartItemCount>
            )}
            <S.Icon src={CartIcon} alt="cart icon" />
            <S.HeaderButtonLabel id="cart-button">장바구니</S.HeaderButtonLabel>
          </S.CartButton>
        </S.HeaderRightContainer>
      </S.HeaderContentContainer>
    </S.HeaderContainer>
  );
};

export default Header;
