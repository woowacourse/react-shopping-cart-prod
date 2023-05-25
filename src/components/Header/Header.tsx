import Logo from '../../assets/Logo.png';
import * as Styled from './Header.styles';
import ShoppingCartStatus from './ShoppingCartStatus/ShoppingCartStatus.tsx';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import routes from '../../constants/routes.ts';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { serverAtom } from '../../stores/serverStore.ts';
import { ServerNames } from '../../types/request.ts';
import { cartListAtom } from '../../stores/cartListStore.ts';

const Header = () => {
  const setServerName = useSetRecoilState(serverAtom);
  const resetCartList = useResetRecoilState(cartListAtom);

  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate(routes.list);
  };

  const handleShoppingCartButtonClick = () => {
    navigate(routes.cart);
  };

  const onChangeServerNameHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value as ServerNames;

    resetCartList();

    setServerName(name);
  };

  return (
    <Styled.HeaderContainer>
      <Styled.HeaderWrapper>
        <Styled.LogoButton data-cy='headerlogo' onClick={handleLogoClick}>
          <Styled.LogoImage src={Logo} alt='SHOP' />
        </Styled.LogoButton>
        <Styled.ServerSelectBox onChange={onChangeServerNameHandler}>
          <option value='ROY'>로이</option>
          <option value='SPLIT'>스플릿</option>
          <option value='IRAE'>이레</option>
        </Styled.ServerSelectBox>
        <Styled.ShoppingCartButton onClick={handleShoppingCartButtonClick}>
          <Styled.ShoppingCartButtonText>장바구니</Styled.ShoppingCartButtonText>
          <ShoppingCartStatus />
        </Styled.ShoppingCartButton>
      </Styled.HeaderWrapper>
    </Styled.HeaderContainer>
  );
};

export default memo(Header);
