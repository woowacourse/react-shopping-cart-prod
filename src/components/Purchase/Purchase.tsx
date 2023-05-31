import { NewOrder, NewOrderItem } from "../../types/types.ts";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { checkedCartSelector } from "../../recoil/cartAtoms.ts";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { modalContentState, modalOpenState } from "../../recoil/modalAtoms.tsx";
import { useModal } from "../Modal/useModal.tsx";
import {
  Button,
  ButtonGroup,
  CouponBox,
  CouponBoxContainer,
  CouponSelectTitle,
  FatBorder,
  ProductItemImage,
  ProductItemInfo,
  ProductItemLayout,
  ProductItemList,
  ProductItemName,
  ProductItemSubTotalPrice,
  PurchaseTitle,
  TempText,
} from "./Purchase.style.ts";

function Purchase() {
  const navigate = useNavigate();
  const checkedCartList = useRecoilValue(checkedCartSelector);
  const POINTS = 1000;

  const [isCouponSelectorOpen, setCouponSelectorOpen] = useState(false);

  const { closeModal } = useModal();

  const purchase = () => {
    const order: NewOrder = {
      orders: checkedCartList.map(
        (cart): NewOrderItem => ({
          cartItemId: cart.id,
          quantity: cart.quantity,
          productId: cart.product.id,
        })
      ),
      couponId: null,
      point: POINTS,
    };
    alert(`서버로 보낼 데이터 (아직 안보내용): ${JSON.stringify(order)}`);
    alert("결제가 완료됐습니다.");
    closeModal();
    navigate("/order");
  };

  return (
    <div>
      <div>
        <PurchaseTitle>결제 페이지</PurchaseTitle>
        <FatBorder />
        <ProductItemList>
          {checkedCartList.map((cartItem, i) => (
            <ProductItemLayout key={i}>
              <ProductItemImage src={cartItem.product.imageUrl} />
              <ProductItemInfo>
                <ProductItemName>{cartItem.product.name}</ProductItemName>
                <ProductItemSubTotalPrice>
                  {cartItem.product.price}원 x {cartItem.quantity}개 ={" "}
                  {cartItem.product.price * cartItem.quantity}원
                </ProductItemSubTotalPrice>
              </ProductItemInfo>
            </ProductItemLayout>
          ))}
        </ProductItemList>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CouponSelectTitle>쿠폰 선택하기</CouponSelectTitle>
        <button onClick={() => setCouponSelectorOpen(!isCouponSelectorOpen)}>
          열기
        </button>
      </div>
      {isCouponSelectorOpen && (
        <CouponBoxContainer>
          <CouponBox>쿠폰1</CouponBox>
          <CouponBox>쿠폰1</CouponBox>
          <CouponBox>쿠폰1</CouponBox>
          <CouponBox>쿠폰1</CouponBox>
        </CouponBoxContainer>
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TempText>포인트 사용하기</TempText>
        <TempText>
          <input value={0} />점
        </TempText>
      </div>

      <div>
        <TempText>합계 0원</TempText>
        <TempText>- 쿠폰 0원</TempText>
        <TempText>- 포인트 0원</TempText>
        <TempText>최종 결제 금액 0원</TempText>
      </div>

      <div>
        <TempText>배송지 선택하기</TempText>
        <TempText>
          <input type="radio" checked /> 집
        </TempText>
      </div>
      <div>
        <TempText>결제수단 선택하기</TempText>
        <TempText>
          <input type="radio" checked /> 카드
        </TempText>
      </div>
      <ButtonGroup>
        <Button color="red" onClick={() => closeModal()}>
          뒤로가기
        </Button>
        <Button color="green" onClick={() => purchase()}>
          결제하기
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default Purchase;
