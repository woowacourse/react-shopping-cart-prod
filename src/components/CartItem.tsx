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
      <input
        type="checkbox"
        value={item.id}
        checked={item.isChecked}
        onChange={handleCheckbox}
      />
      <FirstPart>
        <ImageBox>
          <img
            src={item.product.imageUrl}
            alt={`${item.product.name} 상품 이미지`}
          />
        </ImageBox>
      </FirstPart>
      <MiddlePart>
        <NameBox>
          {item.product.name}{" "}
          <PriceBox>{item.product.price.toLocaleString()}원</PriceBox>
        </NameBox>
        <CouponSelector changeCartItemCoupon={changeCartItemCoupon} />
      </MiddlePart>
      <LastPart>
        <ButtonBox onClick={removeItem}>🗑️</ButtonBox>
        <QuantityCounter itemId={item.product.id} lowerBound={1} />
      </LastPart>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;

  margin: 15px 10px 10px 10px;

  padding-bottom: 12px;

  & > input[type="checkbox"] {
    position: relative;
    top: 5px;
    width: 30px;
    height: fit-content;

    transform: scale(1.6);
  }

  @media (max-width: 767px) {
    padding-left: 0;
  }
`;

const FirstPart = styled.div`
  width: 15%;

  display: flex;
  flex-direction: row;

  @media (max-width: 575px) {
    width: 0;
  }

  @media (max-width: 575px) {
    display: none;
  }
`;

const ImageBox = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;

  & > img {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const MiddlePart = styled.div`
  width: 65%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  & > :last-child {
    margin-top: 20px;
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
  font-size: 20px;
  font-weight: 500;

  margin: 5px 3% 0 3%;
  height: 50px;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media (max-width: 767px) {
    font-size: 19px;
  }
`;

const ButtonBox = styled.button`
  cursor: pointer;

  background-color: rgba(0, 0, 0, 0);
`;

const PriceBox = styled.p`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 400;
`;

export default React.memo(CartItem);
