import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

import CartIcon from '../../../assets/cart-icon.svg';
import Logo from '../../../assets/logo.png';
import OrderIcon from '../../../assets/order-icon.svg';
import { PATH } from '../../../constants/path';
import { cartListItemCountState } from '../../../store/cart';
import { memberInformationState } from '../../../store/member';
import ServerSelect from '../ServerSelect/ServerSelect';
import * as S from './Header.styles';

const Header = () => {
  const cartListItemCount = useRecoilValueLoadable(cartListItemCountState);
  const memberInformation = useRecoilValue(memberInformationState);
  const navigate = useNavigate();

  return (
    <S.HeaderContainer>
      <S.HeaderContentContainer>
        <S.Logo src={Logo} alt="logo" onClick={() => navigate(PATH.ROOT)} />
        <S.HeaderRightContainer>
          <ServerSelect />
          <S.RankAndIdContainer>
            <S.MemberId size="xSmall">{memberInformation.id} 님</S.MemberId>
            <S.MemberRank rank={memberInformation.rank}>{memberInformation.rank}</S.MemberRank>
          </S.RankAndIdContainer>
          <S.OrderPageButton
            type="button"
            aria-labelledby="order-button"
            variant="textButton"
            onClick={() => navigate(PATH.ORDERS)}
          >
            <S.Icon src={OrderIcon} alt="order icon" />
            <S.HeaderButtonLabel id="cart-button">주문내역</S.HeaderButtonLabel>
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
