import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';

import Logo from '../../../assets/png/logo.png';
import CartIcon from '../../../assets/svg/cart-icon.svg';
import { PATH } from '../../../constants/path';
import { cartListItemCountState } from '../../../store/cart';
import Button from '../Button/Button';
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
      <S.HeaderContent>
        <S.Logo src={Logo} alt="logo" onClick={() => navigate(PATH.ROOT)} />
        <S.RightContainer>
          <ServerSelect onChange={() => navigate(PATH.ROOT)} />
          <Button
            css={S.buttonStyle}
            type="button"
            aria-labelledby="cart-button"
            variant="textButton"
            onClick={() => navigate(PATH.CART)}
          >
            {cartListItemCount.contents > 0 && <S.Badge>{cartListItemCount.contents}</S.Badge>}
            <S.CartIcon src={CartIcon} alt="cart icon" />
            <S.ButtonLabel id="cart-button">장바구니</S.ButtonLabel>
          </Button>
        </S.RightContainer>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
};

export default Header;
