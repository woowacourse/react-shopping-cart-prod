import React from "react";
import styled from "styled-components";
import QuantityCounter from "components/QuantityCounter";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartCouponSelector, cartSelector } from "recoil/cart";
import { CartProduct } from "types/domain";
import { removeCartItem } from "api/cartItems";
import { serverSelectState } from "recoil/server";
import CouponSelector from "./CouponSelector";

const CartItem = (item: CartProduct) => {
  const setProduct = useSetRecoilState(cartSelector(item.product.id));
  const setSelectedCoupon = useSetRecoilState(
    cartCouponSelector(item.product.id)
  );
  const selectedServer = useRecoilValue(serverSelectState);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...item,
      isChecked: e.currentTarget.checked,
    });
  };

  const removeItem = async () => {
    const result = await removeCartItem(selectedServer, item.id);

    if (!result) {
      alert("장바구니 상품 제거 실패!");
      return;
    }

    setProduct(null);
  };

  const changeCartItemCoupon = (couponId: number | undefined) => {
    setSelectedCoupon(couponId);
  };

  return (
    <Wrapper>
      <FirstPart>
        <input
          type="checkbox"
          value={item.id}
          checked={item.isChecked}
          onChange={handleCheckbox}
        />
        <img
          src={item.product.imageUrl}
          alt={`${item.product.name} 상품 이미지`}
        />
      </FirstPart>
      <MiddlePart>
        <NameBox>{item.product.name}</NameBox>
        <CouponSelector changeCartItemCoupon={changeCartItemCoupon} />
      </MiddlePart>
      <LastPart>
        <ButtonBox onClick={removeItem}>🗑️</ButtonBox>
        <QuantityCounter itemId={item.product.id} lowerBound={1} />
        <PriceBox>
          {(item.product.price * item.quantity).toLocaleString()}원
        </PriceBox>
      </LastPart>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;

  margin-bottom: 10px;

  border-top: 1.5px solid rgba(204, 204, 204, 1);
  padding: 15px 10px 10px 10px;

  @media screen and (max-width: 800px) {
    padding-left: 0;
  }
`;

const FirstPart = styled.div`
  width: 20%;

  & > input[type="checkbox"] {
    position: relative;
    top: 15px;
    right: 20px;
    width: 40px;
    height: fit-content;

    transform: scale(1.6);
  }

  & > img {
    width: 100%;
    height: 80%;
    border-radius: 5px;
  }
`;

const MiddlePart = styled.div`
  width: 65%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  & > :last-child {
    width: 95%;
    align-self: center;
  }
`;

const LastPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
`;

const NameBox = styled.div`
  margin: 15px 0 10px 10px;

  font-size: 17px;
  font-weight: 500;

  white-space: nowrap;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;

  @media screen and (max-width: 800px) {
    font-size: 17px;
  }
`;

const ButtonBox = styled.button`
  cursor: pointer;

  background-color: rgba(0, 0, 0, 0);
`;

const PriceBox = styled.p`
  font-size: 16px;
`;

export default React.memo(CartItem);
