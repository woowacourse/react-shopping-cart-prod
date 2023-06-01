import { ChangeEventHandler } from 'react';
import { useSetRecoilState } from 'recoil';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import SelectBox from './SelectBox';

import CartIcon from '../../assets/CartIcon';
import useCartProductCount from '../../hooks/useCartProductCount';
import { serverNameState } from '../../states/serverName';
import { SERVER_KEYS, isServerKey } from '../../constants/server';

const Header = () => {
  const cartProductCount = useCartProductCount();
  const setServerName = useSetRecoilState(serverNameState);

  const onChange: ChangeEventHandler<HTMLSelectElement> = event => {
    const serverKey = event.currentTarget.value;

    if (isServerKey(serverKey)) setServerName(serverKey);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer to="/">
          <CartIcon width={51} height={44} color="white" />
          <Logo>SHOP</Logo>
        </LogoContainer>
        <HeaderFlexBox>
          <SelectBox options={SERVER_KEYS} onChange={onChange} />
          <StyledLink to="/cart">
            장바구니
            <ProductCountAlert>{cartProductCount}</ProductCountAlert>
          </StyledLink>
          <StyledLink to="/order">주문목록</StyledLink>
        </HeaderFlexBox>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.black};
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1250px;
  height: 100%;
  margin: 0 auto;
  padding: 0 30px;

  @media (max-width: ${({ theme }) => theme.breakPoints.small}) {
    justify-content: center;
  }
`;

const HeaderFlexBox = styled.div`
  display: flex;
  gap: 20px;

  & > select {
    width: 100px;
    height: 28px;

    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }

  @media (max-width: ${({ theme }) => theme.breakPoints.small}) {
    & > Link > svg {
      margin-right: 18px;
      transform: scaleX(-1);
    }
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;

  & > svg {
    margin-right: 12px;
    transform: scaleX(-1);
  }

  @media (max-width: ${({ theme }) => theme.breakPoints.small}) {
    display: none;
  }
`;

const Logo = styled.h1`
  padding: 8px 0 0;
  color: ${({ theme }) => theme.colors.white};
  font-size: 34px;
  font-weight: 900;
  letter-spacing: 0.1em;
`;

const StyledLink = styled(Link)`
  display: flex;
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-weight: 500;

  @media (max-width: ${({ theme }) => theme.breakPoints.small}) {
    font-size: 24px;
  }
`;

const ProductCountAlert = styled.span`
  width: 28px;
  height: 28px;
  margin-left: 6px;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 16px;
  line-height: 28px;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakPoints.small}) {
    width: 28px;
    height: 28px;

    line-height: 28px;
  }
`;

export default Header;
