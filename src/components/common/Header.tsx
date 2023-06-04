import type { ServerNameType } from '../../types';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import PortalDrawer from 'react-portal-drawer';

import CouponList from '../coupon/CouponList';

import { tokenState, cartCountState, serverNameState, couponsState } from '../../recoil/state';
import useToast from '../../hooks/useToast';
import { SERVER_NAMES } from '../../constants';
import useBoolean from '../../hooks/useBoolean';

export default function Header() {
  const navigate = useNavigate();
  const coupons = useRecoilValue(couponsState);
  const cartCount = useRecoilValue(cartCountState);
  const [token, setToken] = useRecoilState(tokenState);
  const [serverName, setServerName] = useRecoilState(serverNameState);

  const [couponModalOpened, openCouponModal, closeCouponModal] = useBoolean(false);
  const { showToast } = useToast();

  const onChangeSelect = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
    setServerName(value as ServerNameType);
    showToast('info', `[${value}] 서버로 변경되었습니다.`);
  };

  const goLogin = () => {
    navigate('/auth/login');
  };

  const goJoin = () => {
    navigate('/auth/join');
  };

  const logout = () => {
    setToken(null);
    navigate('/');
  };

  return (
    <>
      <Wrapper>
        <ContentBox>
          <HomeLink to="/">
            <img src="/logoWhite.svg" />
            <LogoTitle>SHOP</LogoTitle>
            <ServerName> : {serverName}</ServerName>
          </HomeLink>
          <MenuBox>
            {token === null ? (
              <>
                <Select value={serverName} onChange={onChangeSelect}>
                  {SERVER_NAMES.map((serverName) => (
                    <option key={serverName}>{serverName}</option>
                  ))}
                </Select>
                <MenuButton onClick={goLogin}>로그인</MenuButton>
                <MenuButton onClick={goJoin}>회원가입</MenuButton>
              </>
            ) : (
              <>
                <MenuLink to="/cart">
                  장바구니
                  <CountBox>{cartCount}</CountBox>
                </MenuLink>
                <MenuButton onClick={openCouponModal}>
                  쿠폰함
                  <CountBox>{coupons.length}</CountBox>
                </MenuButton>
                <MenuLink to="/orders">주문 목록</MenuLink>
                <MenuButton onClick={logout}>로그아웃</MenuButton>
              </>
            )}
          </MenuBox>
        </ContentBox>
      </Wrapper>
      {couponModalOpened && (
        <PortalDrawer selectors="#root" requestClose={closeCouponModal}>
          <CouponList coupons={coupons} />
        </PortalDrawer>
      )}
    </>
  );
}

const Wrapper = styled.header`
  position: fixed;
  top: 0;

  display: flex;
  justify-content: center;

  width: 100%;
  height: 80px;
  background: #333333;

  color: white;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 80%;
  height: 100%;
  padding: 0 16px;

  @media (max-width: 612px) {
    width: 100%;
  }
`;

const HomeLink = styled(Link)`
  display: flex;
  align-items: center;

  font-size: 40px;
  font-weight: 900;
`;

const LogoTitle = styled.h1`
  margin-left: 24px;
  padding-bottom: 4px;

  @media (max-width: 612px) {
    display: none;
  }
`;

const ServerName = styled.p`
  margin-left: 16px;

  text-align: center;
  font-size: 28px;
`;

const MenuBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  height: 100%;

  & > * {
    margin-left: 40px;
  }

  @media (max-width: 612px) {
    & > * {
      margin-left: 40px;
    }
  }
`;

const Select = styled.select`
  width: 80px;
  height: 32px;
  border: none;
  border-radius: 4px;

  text-align: center;
  font-size: 16px;
`;

const MenuLink = styled(Link)`
  display: flex;
  align-items: center;

  height: 100%;

  font-size: 24px;
  font-weight: 500;

  @media (max-width: 942px) {
    font-size: 18px;
  }

  @media (max-width: 612px) {
    font-size: 14px;
  }
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;

  height: 100%;
  background: transparent;

  vertical-align: baseline;
  font-size: 24px;
  font-weight: 500;
  color: white;

  @media (max-width: 942px) {
    font-size: 18px;
  }

  @media (max-width: 612px) {
    font-size: 14px;
  }
`;

const CountBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28px;
  height: 28px;
  margin-left: 8px;
  border-radius: 50%;
  background: #04c09e;

  font-size: 14px;
  font-weight: 700;
`;
