import React from "react";
import styled from "styled-components";
import QuantityCounter from "components/QuantityCounter";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartSelector } from "recoil/cart";
import { CartProduct } from "types/domain";
import { removeCartItem } from "api/cartItems";
import { serverSelectState } from "recoil/server";
import { useCoupon } from "hooks/useCoupon";
import { getDisconutedPriceByProductId } from "recoil/coupon";

const CartItem = (item: CartProduct) => {
  const setProduct = useSetRecoilState(cartSelector(item.product.id));
  const selectedServer = useRecoilValue(serverSelectState);
  const { couponList, changeCoupon } = useCoupon(item.product.id);
  const discountedPrice = useRecoilValue(getDisconutedPriceByProductId(item.product.id));

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...item,
      isChecked: e.currentTarget.checked,
    });
  };

  const removeItem = async () => {
    const result = await removeCartItem(selectedServer, item.id);

    if (!result) {
      alert("서버와의 통신이 원활하지 않습니다. 잠시후 다시 시도해주세요.");
      return;
    }

    setProduct(null);
  };

  return (
    <Wrapper>
      <input type="checkbox" value={item.id} checked={item.isChecked} onChange={handleCheckbox} />
      <img src={item.product.imageUrl} alt={`${item.product.name} 상품 이미지`} />
      <NameBox>{item.product.name}</NameBox>
      <ButtonBox onClick={removeItem}>🗑️</ButtonBox>
      <PriceContainer>
        <p>{(item.product.price * item.quantity).toLocaleString()}원</p>
        {discountedPrice !== null && <p>{discountedPrice.toLocaleString()}원</p>}
      </PriceContainer>
      <SelectBox onChange={changeCoupon}>
        <option>{couponList.length ? "쿠폰을 선택해주세요" : "사용 가능한 쿠폰이 없습니다"}</option>
        {couponList.map((coupon) => (
          <option
            key={coupon.couponId}
            value={coupon.couponId}
            disabled={coupon.productId !== null}
          >
            {coupon.discount.type === "rate"
              ? `${coupon.name} (-${coupon.discount.amount.toLocaleString()}%)`
              : `${coupon.name} (-${coupon.discount.amount.toLocaleString()}원)`}
          </option>
        ))}
      </SelectBox>
      <QuantityCounter itemId={item.product.id} lowerBound={1} />
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  display: flex;
  position: relative;

  margin-bottom: 10px;

  border-top: 1.5px solid rgba(204, 204, 204, 1);
  padding: 15px 10px 10px 10px;

  & > img {
    width: 180px;
    height: 160px;
    border-radius: 5px;
  }

  & > input[type="checkbox"] {
    top: 15px;
    width: 40px;
    height: fit-content;

    transform: scale(1.6);
  }

  :last-child {
    align-self: center;

    height: 50%;

    margin-left: auto;
  }

  @media screen and (max-width: 800px) {
    padding-left: 0;

    & > img {
      width: 130px;
      height: 130px;
      border-radius: 5px;
    }
  }
`;

const NameBox = styled.div`
  width: 60%;
  height: 50%;
  margin: 15px 0 10px 20px;

  font-size: 18px;
  white-space: nowrap;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;

  @media screen and (max-width: 800px) {
    margin: 5px 0 0 10px;
    font-size: 16px;
  }
`;

const ButtonBox = styled.button`
  position: absolute;
  top: 6%;
  right: 1%;

  cursor: pointer;
`;

const PriceContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;

  height: fit-content;
  font-size: 18px;

  & > p:not(:last-child) {
    text-decoration: line-through;
    font-size: 16px;
    color: gray;
  }
`;

const SelectBox = styled.select`
  position: absolute;
  right: 20%;
  bottom: 12%;

  width: 30%;
  height: fit-content;

  font-size: 18px;

  @media screen and (max-width: 800px) {
    font-size: 17px;
    right: 23%;
  }
`;

export default React.memo(CartItem);
