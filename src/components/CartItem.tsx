import { memo } from "react";
import styled from "styled-components";
import QuantityCounter from "components/QuantityCounter";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartSelector } from "recoil/cart";
import { CartProduct } from "types/domain";
import { removeCartItem } from "api/cartItems";
import { serverSelectState } from "recoil/server";
import CouponSelector from "./CouponSelector";
import { useCart } from "hooks/useCart";
import { getCouponInfo } from "recoil/coupon";
import { calculateDiscountPrice } from "utile/calculateDiscountPrice";

const CartItem = (item: CartProduct) => {
  const setProduct = useSetRecoilState(cartSelector(item.product.id));
  const selectedServer = useRecoilValue(serverSelectState);
  const { updateCouponIdOfCartItem } = useCart();

  const coupon = useRecoilValue(getCouponInfo(item.couponId));
  const totalPrice =
    coupon && calculateDiscountPrice(item.product.price, item.quantity, coupon);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...item,
      isChecked: e.currentTarget.checked,
    });
  };

  const removeItem = async () => {
    const result = await removeCartItem(selectedServer, item.id);

    if (result) {
      setProduct(null);
    }
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
          {item.product.name}
          <PriceBox>
            <span>{item.product.price.toLocaleString()}원</span>
          </PriceBox>
        </NameBox>
        <CouponSelector
          changeCartItemCoupon={updateCouponIdOfCartItem(item.product.id)}
        />
      </MiddlePart>
      <LastPart>
        <ButtonBox onClick={removeItem}>🗑️</ButtonBox>
        <QuantityCounter itemId={item.product.id} lowerBound={1} />
        <TotalPriceBox className="total" $sale={!!item.couponId}>
          <span>{(item.product.price * item.quantity).toLocaleString()}원</span>
          {totalPrice && <span> {totalPrice.toLocaleString()}원</span>}
        </TotalPriceBox>
      </LastPart>
    </Wrapper>
  );
};

const Wrapper = styled.li`
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

  background-color: var(--transparency-color);
`;

const PriceBox = styled.p`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 400;
`;

interface TotalPriceBoxProps {
  $sale: boolean;
}

const TotalPriceBox = styled.p<TotalPriceBoxProps>`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 400;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;

  & :first-child {
    text-decoration: ${(props) => (props.$sale ? "line-through" : "")};
    color: ${(props) => (props.$sale ? "var(--gray-color)" : "")};
    font-style: ${(props) => (props.$sale ? "italic" : "")};
    font-size: ${(props) => (props.$sale ? "14px" : "")};
  }

  & :last-child {
    font-weight: ${(props) => (props.$sale ? "600" : "")};
  }
`;

export default memo(CartItem);
