import {
  ChangeEventHandler,
  ForwardRefExoticComponent,
  LinkHTMLAttributes,
} from 'react';
import { useSetRecoilState } from 'recoil';

import styled from 'styled-components';
import { Link, LinkProps, useLocation } from 'react-router-dom';

import SelectBox from './SelectBox';

import CartIcon from '../../assets/CartIcon';
import useCartProductCount from '../../hooks/useCartProductCount';
import { serverNameState } from '../../states/serverName';
import { SERVER_KEYS, isServerKey } from '../../constants/server';
import { PAGE_URLS } from '../../constants/pageUrls';

interface StyledLinkProps extends LinkProps {
  cartProductCount?: number;
  pathname?: string;
}

const Header = () => {
  const cartProductCount = useCartProductCount();
  const setServerName = useSetRecoilState(serverNameState);
  const pathname = useLocation().pathname;

  const onChange: ChangeEventHandler<HTMLSelectElement> = event => {
    const serverKey = event.currentTarget.value;

    if (isServerKey(serverKey)) setServerName(serverKey);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <div>
          <LogoContainer to="/">
            <CartIcon width={51} height={44} color="white" />
            <Logo>SHOP</Logo>
          </LogoContainer>
          <SelectBox options={SERVER_KEYS} onChange={onChange} />
        </div>
        <div>
          <StyledLink
            to="/cart"
            cartProductCount={cartProductCount}
            pathname={pathname}
          >
            <DesktopText>장바구니</DesktopText>
            <ProductCountAlert>{cartProductCount}</ProductCountAlert>
            <MobileText>
              장바구니에 {cartProductCount}개의 상품이 있어요
            </MobileText>
          </StyledLink>
          <StyledLink to="/order">주문목록</StyledLink>
        </div>
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
  width: 100%;
  height: 100%;
  padding: 0 160px;

  & > div {
    display: flex;
    align-items: center;
    gap: 40px;

    & > select {
      width: 100px;
      height: 28px;

      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }

    @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
      gap: 8px;

      & > select {
        width: 50px;
        font-size: 12px;
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    padding: 0 40px;
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;

  & > svg {
    transform: scaleX(-1);

    @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
      width: 28px;
      height: 28px;
    }
  }
`;

const Logo = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-size: 34px;
  font-weight: 900;
  letter-spacing: 0.1em;

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    font-size: 28px;
  }
`;

const StyledLink = styled(
  ({ cartProductCount, pathname, ...restProps }: StyledLinkProps) => (
    <Link {...restProps} />
  )
)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
  font-weight: 500;

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    font-size: 24px;

    ${({ to, cartProductCount, pathname, theme }) => {
      if (to !== PAGE_URLS.cart) return;

      if (pathname === PAGE_URLS.cart) return `display: none`;

      return `
				display: ${cartProductCount ? 'block' : 'none'};
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				padding: 20px;
				z-index: 999;

				text-align: center;
				background-color: ${theme.colors.primary};
			`;
    }};
  }
`;

const DesktopText = styled.p`
  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    display: none;
  }
`;

const MobileText = styled.p`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    display: block;
  }
`;

const ProductCountAlert = styled.span`
  width: 28px;
  height: 28px;

  font-size: 20px;
  line-height: 28px;
  text-align: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    display: none;
  }
`;

export default Header;
