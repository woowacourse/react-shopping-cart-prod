import Logo from '../../assets/Logo.png';
import * as Styled from './Header.styles';
import ShoppingCartStatus from './ShoppingCartStatus/ShoppingCartStatus.tsx';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import ROUTES from '../../constants/ROUTES.ts';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { serverAtom } from '../../stores/serverStore.ts';
import { ServerNames } from '../../types/request.ts';
import { cartListAtom } from '../../stores/cartListStore.ts';
import TOAST_MESSAGES from '../../constants/TOAST_MESSAGES.ts';
import { useToast } from '../../hooks/useToast.ts';

const Header = () => {
  const setServerName = useSetRecoilState(serverAtom);
  const resetCartList = useResetRecoilState(cartListAtom);
  const showToast = useToast();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(ROUTES.LIST);
  };

  const handleShoppingCartButtonClick = () => {
    navigate(ROUTES.CART);
  };

  const onChangeServerNameHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value as ServerNames;

    resetCartList();

    setServerName(name);
    showToast(TOAST_MESSAGES.SERVER_CHANGED);
    navigate(ROUTES.LIST);
  };

  const orderListButtonHandler = () => {
    navigate(ROUTES.ORDER);
  };

  return (
    <Styled.HeaderContainer>
      <Styled.HeaderWrapper>
        <Styled.LogoButton data-cy='headerlogo' onClick={handleLogoClick}>
          <Styled.LogoImage src={Logo} alt='SHOP' />
        </Styled.LogoButton>
        <Styled.ServerSelectBox onChange={onChangeServerNameHandler}>
          <option value='IRAE'>이레 👧🏻</option>
          <option value='SPLIT'>스플릿 👨🏻‍🦱</option>
          <option value='ROY'>로이 👨🏻‍🦰</option>
        </Styled.ServerSelectBox>
        <Styled.OrderListButton onClick={orderListButtonHandler}>주문 목록 🛒</Styled.OrderListButton>
        <Styled.ShoppingCartButton onClick={handleShoppingCartButtonClick}>
          <Styled.ShoppingCartButtonText>장바구니</Styled.ShoppingCartButtonText>
          <ShoppingCartStatus />
        </Styled.ShoppingCartButton>
      </Styled.HeaderWrapper>
    </Styled.HeaderContainer>
  );
};

export default memo(Header);
