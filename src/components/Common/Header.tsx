import { ChangeEventHandler, Suspense } from 'react';
import { useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SelectBox from './SelectBox';
import CartCountBox from '../Cart/CartCountBox';

import CartIcon from '../../assets/CartIcon';
import OrderIcon from '../../assets/OrderIcon';
import { serverNameState } from '../../states/serverName';
import { SERVER_OPTIONS, isServerKey } from '../../constants/server';

const Header = () => {
  const setServerName = useSetRecoilState(serverNameState);

  const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const serverKey = event.currentTarget.value;

    if (isServerKey(serverKey)) setServerName(serverKey);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer to='/'>
          <Logo>SHOP</Logo>
        </LogoContainer>
        <LinkWrapper>
          <SelectBox options={SERVER_OPTIONS} onChange={onChange} />
          <CartPageLink to='/cart'>
            <CartIcon width={32} height={24} color='white' />
            <span>장바구니</span>
            <Suspense fallback={<ProductCountAlert />}>
              <CartCountBox />
            </Suspense>
          </CartPageLink>
          <OrderPageLink to='/orders'>
            <OrderIcon width={40} height={24} color='white' />
            <span>주문목록</span>
          </OrderPageLink>
        </LinkWrapper>
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
  max-width: 1300px;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 0.1em;
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const PageLink = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: 10px;
  line-height: 12px;
`;

const ProductCountAlert = styled.span`
  position: absolute;
  top: -4px;
  right: -2px;
  width: 16px;
  height: 16px;
  padding: 0 0 0 0.3px;
  font-size: 10px;
  text-align: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  line-height: 16px;
`;

const CartPageLink = styled(PageLink)`
  & > svg {
    margin: 0 4px 4px 0;
    transform: scaleX(-1);
  }
`;

const OrderPageLink = styled(PageLink)`
  & > svg {
    margin: 0 0 4px;
  }
`;

export default Header;
