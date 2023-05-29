import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';

import Logo from '../../../assets/logo.png';
import CartIcon from '../../../assets/svg/cart-icon.svg';
import { PATH } from '../../../constants/path';
import { cartListItemCountState } from '../../../store/cart';
import ServerSelect from '../ServerSelect/ServerSelect';
import * as S from './Header.styles';
import UserInformation from './UserInformation/UserInformation';
import UserInformationSkeleton from './UserInformation/UserInformationSkeleton';

const Header = () => {
  const cartListItemCount = useRecoilValueLoadable(cartListItemCountState);
  const navigate = useNavigate();

  return (
    <S.HeaderContainer>
      <Suspense fallback={<UserInformationSkeleton />}>
        <UserInformation />
      </Suspense>
      <S.HeaderMainContentContainer>
        <S.Logo src={Logo} alt="logo" onClick={() => navigate(PATH.ROOT)} />
        <S.HeaderRightContainer>
          <ServerSelect />
          <S.CartButton
            type="button"
            aria-labelledby="cart-button"
            variant="textButton"
            onClick={() => navigate(PATH.CART)}
          >
            {cartListItemCount.contents > 0 && (
              <S.CartItemCount>{cartListItemCount.contents}</S.CartItemCount>
            )}
            <S.CartIcon src={CartIcon} alt="cart icon" />
            <S.HeaderButtonLabel id="cart-button">장바구니</S.HeaderButtonLabel>
          </S.CartButton>
        </S.HeaderRightContainer>
      </S.HeaderMainContentContainer>
    </S.HeaderContainer>
  );
};

export default Header;
