import styled from "styled-components";
import { CartIcon } from "../assets";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { localProductsSelector } from "../recoil/selector";
import { ROUTER_PATH } from "../router";
import { useRouter } from "../hooks/useRouter";
import {
  DEFAULT_VALUE_SERVER_OWNER,
  KEY_LOCALSTORAGE_SERVER_OWNER,
  SERVERS,
} from "../constants";
import React, { useState } from "react";
import { localProductsState } from "../recoil/atom";
import { makeLocalProducts } from "../utils/domain";
import { getLocalStorage, setLocalStorage } from "../utils";

export const Header = () => {
  const { goPage } = useRouter();
  const setLocalProducts = useSetRecoilState(localProductsState);
  const cartProducts = useRecoilValue(localProductsSelector);
  const [serverOwner, setServerOwner] = useState(
    getLocalStorage(KEY_LOCALSTORAGE_SERVER_OWNER, DEFAULT_VALUE_SERVER_OWNER)
  );

  const handleServerSelected = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLocalStorage(KEY_LOCALSTORAGE_SERVER_OWNER, e.target.value);
    setServerOwner(e.target.value);

    const newProducts = await makeLocalProducts();
    setLocalProducts(newProducts);
  };

  return (
    <Wrapper>
      <TitleContainer onClick={goPage(ROUTER_PATH.Main)}>
        <img src={CartIcon} alt="홈카트" />
        <p>SHOP</p>
      </TitleContainer>
      <InfoContainer>
        <ServerSelectBox value={serverOwner} onChange={handleServerSelected}>
          {Object.keys(SERVERS).map((server) => (
            <option key={crypto.randomUUID()}>{server}</option>
          ))}
        </ServerSelectBox>
        <CartContainer>
          <p onClick={goPage(ROUTER_PATH.Cart)}>장바구니</p>
          {cartProducts.length > 0 && (
            <ItemQuantityBox>{cartProducts.length}</ItemQuantityBox>
          )}
        </CartContainer>
        <p onClick={goPage(ROUTER_PATH.Order)}>주문 목록</p>
      </InfoContainer>
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
  gap: 20px;

  cursor: pointer;

  & > p {
    color: white;
    font-weight: 900;
    font-size: 2rem;
    @media screen and (max-width: 850px) {
      font-size: 1.5rem;
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

const InfoContainer = styled.section`
  display: flex;
  align-items: center;
  gap: 20px;

  font-size: 24px;
  font-weight: 500;
  color: white;

  cursor: pointer;

  @media screen and (max-width: 850px) {
    font-size: 20px;
  }
`;

const ItemQuantityBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;

  background: var(--mintish-green);
  border-radius: 50%;

  font-size: 16px;
  font-weight: 500;
  color: white;
`;

const ServerSelectBox = styled.select`
  width: 75px;
  height: 40px;

  font-size: 18px;
  font-weight: 600;
  padding: 0 5px;

  border-radius: 4px;
  background: var(--light-gray);
`;

const CartContainer = styled.section`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
