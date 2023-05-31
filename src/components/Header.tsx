import styled from "styled-components";
import { CartIcon } from "../assets";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { localProductsSelector } from "../recoil/selector";
import { ROUTER_PATH } from "../router";
import { useRouter } from "../hooks/useRouter";
import React, { useState } from "react";
import { localProductsState, loginState, userState } from "../recoil/atom";
import { makeLocalProducts, makeProducts } from "../utils/domain";
import { getLocalStorage, setLocalStorage } from "../utils";
import { useToast } from "../hooks/useToast";
import {
  DEFAULT_VALUE_SERVER_OWNER,
  KEY_LOCALSTORAGE_SERVER_OWNER,
  SERVERS,
} from "../constants";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const { goPage } = useRouter();
  const { showToast } = useToast();
  const user = useRecoilValue(userState);
  const cartProducts = useRecoilValue(localProductsSelector);
  const [isLogined, setIsLogined] = useRecoilState(loginState);
  const setLocalProducts = useSetRecoilState(localProductsState);
  const [serverOwner, setServerOwner] = useState(
    getLocalStorage(KEY_LOCALSTORAGE_SERVER_OWNER, DEFAULT_VALUE_SERVER_OWNER)
  );

  const handleServerSelected = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLocalStorage(KEY_LOCALSTORAGE_SERVER_OWNER, e.target.value);
    setServerOwner(e.target.value);

    const newProducts = isLogined
      ? await makeLocalProducts()
      : await makeProducts();
    setLocalProducts(newProducts);

    showToast("success", `${e.target.value}의 서버로 변경되었습니다. ✅`);
  };

  const logout = () => {
    localStorage.clear();
    setIsLogined(false);
    showToast("success", `로그아웃 되었습니다. ✅`);
  };

  return (
    <Wrapper>
      <TitleContainer onClick={goPage(ROUTER_PATH.Main)}>
        <img src={CartIcon} alt="홈카트" />
        <p>SHOP</p>
      </TitleContainer>
      <NavContainer>
        <SelectBox value={serverOwner} onChange={handleServerSelected}>
          {Object.keys(SERVERS).map((server) => (
            <option key={crypto.randomUUID()}>{server}</option>
          ))}
        </SelectBox>
        {!isLogined ? (
          <p onClick={goPage(ROUTER_PATH.Login)}>로그인</p>
        ) : (
          <CartContainer>
            <CartBox
              pathname={location.pathname}
              onClick={goPage(ROUTER_PATH.Cart)}
            >
              {user.nickname}의 장바구니
              {cartProducts.length > 0 && (
                <ItemQuantityBox>{cartProducts.length}</ItemQuantityBox>
              )}
            </CartBox>
            <OrderBox
              pathname={location.pathname}
              onClick={goPage(ROUTER_PATH.OrderHistory)}
            >
              주문목록
            </OrderBox>
            <span onClick={logout}>로그아웃</span>
          </CartContainer>
        )}
      </NavContainer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  z-index: 1;
  top: 0;

  width: 100%;
  min-height: 70px;
  padding: 0 10%;

  background: var(--dark-gray);
`;

const TitleContainer = styled.section`
  display: flex;
  align-items: end;
  gap: 5%;

  cursor: pointer;

  & > p {
    color: white;
    font-weight: 900;
    font-size: 2rem;

    @media screen and (max-width: 850px) {
      font-size: 1.3rem;
    }
  }

  & > img {
    width: 46px;
    height: 46px;

    @media screen and (max-width: 850px) {
      width: 35px;
      height: 35px;
    }
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;

  font-size: 21px;
  font-weight: 500;
  cursor: pointer;

  @media screen and (max-width: 850px) {
    font-size: 18px;
  }
`;

const CartContainer = styled.section`
  display: flex;
  align-items: center;
  gap: 10px;

  & > span {
    font-size: 14px;
    color: gray;
    align-self: flex-end;
  }
`;

const CartBox = styled.p<{ pathname: string }>`
  position: relative;
  z-index: 10;
  color: ${(props) =>
    props.pathname === ROUTER_PATH.Cart || props.pathname === ROUTER_PATH.Order
      ? "white"
      : "gray"};
`;

const OrderBox = styled.p<{ pathname: string }>`
  color: ${(props) =>
    props.pathname === ROUTER_PATH.OrderHistory ||
    props.pathname === ROUTER_PATH.OrderDetail
      ? "white"
      : "gray"};
`;

const ItemQuantityBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;

  position: absolute;
  top: -11px;
  right: -11px;

  padding-top: 3px;
  background: var(--mintish-green);
  border-radius: 50%;

  font-size: 13px;
  font-weight: 600;
  color: white;
`;

const SelectBox = styled.select`
  width: 65px;
  height: 40px;

  padding: 0 5px;
  margin-right: 10px;
  border-radius: 4px;
  background: var(--light-gray);

  font-size: 18px;
  font-weight: 600;

  @media screen and (max-width: 850px) {
    width: 70px;
    height: 37px;
  }
`;
