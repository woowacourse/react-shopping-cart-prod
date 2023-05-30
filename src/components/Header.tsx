import styled from "styled-components";
import { CartIcon } from "../assets";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { localProductsSelector } from "../recoil/selector";
import { ROUTER_PATH } from "../router";
import { useRouter } from "../hooks/useRouter";
import React, { useState } from "react";
import { localProductsState, loginState } from "../recoil/atom";
import { makeLocalProducts, makeProducts } from "../utils/domain";
import { getLocalStorage, setLocalStorage } from "../utils";
import { useToast } from "../hooks/useToast";
import {
  DEFAULT_VALUE_SERVER_OWNER,
  KEY_LOCALSTORAGE_SERVER_OWNER,
  SERVERS,
} from "../constants";

export const Header = () => {
  const { goPage } = useRouter();
  const { showToast } = useToast();

  const isLogined = useRecoilValue(loginState);
  const cartProducts = useRecoilValue(localProductsSelector);
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
            <p onClick={goPage(ROUTER_PATH.Cart)}>장바구니</p>
            {cartProducts.length > 0 && (
              <ItemQuantityBox>{cartProducts.length}</ItemQuantityBox>
            )}
            <p onClick={goPage(ROUTER_PATH.Order)}>주문목록</p>
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

  font-size: 24px;
  font-weight: 500;
  color: white;

  cursor: pointer;

  @media screen and (max-width: 850px) {
    font-size: 18px;
  }
`;

const CartContainer = styled.section`
  display: flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;
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

const SelectBox = styled.select`
  width: 75px;
  height: 40px;

  font-size: 18px;
  font-weight: 600;
  padding: 0 5px;

  border-radius: 4px;
  background: var(--light-gray);

  margin-right: 10px;

  @media screen and (max-width: 850px) {
    width: 70px;
    height: 37px;
  }
`;
