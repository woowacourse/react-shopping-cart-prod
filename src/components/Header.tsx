import styled from 'styled-components';
import { ReactComponent as DesktopLogo } from '../assets/logo.svg';
import { ReactComponent as MobileLogo } from '../assets/onlyImageIcon.svg';
import CartRouteButton from './main/CartRouteButton';
import ServerDropdown from './ServerDropdown';
import useNavigatePage from '../hooks/useNavigatePage';
import { useFetchData } from '../hooks/useFetchData';
import { CartItem } from '../types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartState } from '../store/CartState';
import { serverState } from '../store/ServerState';
import { useEffect } from 'react';
import { CART_BASE_URL } from '../constants/url';
import useIsMobile from '../hooks/useIsMobile';

const Header = () => {
  const { goHome, goCart } = useNavigatePage();
  const serverUrl = useRecoilValue(serverState);
  const setCart = useSetRecoilState(cartState);
  const { api } = useFetchData<CartItem[]>(setCart);
  const isMobile = useIsMobile();

  useEffect(() => {
    api.get(`${serverUrl}${CART_BASE_URL}`);
  }, [api, serverUrl]);

  return (
    <S.Header>
      <S.Wrapper>
        <S.TitleButton onClick={goHome}>
          {isMobile ? <MobileLogo /> : <DesktopLogo />}
        </S.TitleButton>
        <ServerDropdown />
        <CartRouteButton onClick={goCart} />
        <S.OrderButton>주문 목록</S.OrderButton>
      </S.Wrapper>
    </S.Header>
  );
};

const S = {
  Header: styled.header`
    width: 100%;
    height: 80px;
    position: fixed;
    z-index: 1;
    background: #f2f2f2;
    font-size: 36px;
    font-weight: 900;
    line-height: 80px;
    letter-spacing: 0.1px;
  `,

  Wrapper: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    max-width: 1270px;
    margin: 0 auto;
    padding: 0 20px;

    & > :first-child {
      margin-right: 10px;
    }

    @media (min-width: 480px) and (max-width: 767px) {
      & > :first-child {
        width: 40%;
      }

      & > :first-child svg {
        width: 100%;
        height: auto;
      }
    }
  `,

  TitleButton: styled.button`
    display: flex;
    justify-content: center;
    background-color: transparent;
    cursor: pointer;
    color: var(--text-color);
    @media all and (max-width: 479px) {
      width: 60px;
      height: 60px;

      & > svg {
        width: 60px;
        height: 60px;
      }
    }
  `,

  Title: styled.span``,

  OrderButton: styled.button`
    width: 100px;
    color: var(--text-color);
    font-size: 20px;
    font-weight: 700;
    background-color: transparent;
  `,
};

export default Header;
