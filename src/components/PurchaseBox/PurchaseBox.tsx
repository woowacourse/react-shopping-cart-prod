import {
  DiscountText,
  PurchaseBoxWrapper,
  PurchaseButton,
  PurchaseButtonWrapper,
  PurchasePropertyWrapper,
  PurchaseText,
  PurchaseTitle,
  PurchaseWrapper,
  RealPriceText,
  Vacant,
} from "./PurchaseBox.style";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { totalPriceSelector } from "../../recoil/cartAtoms.ts";
import { modalContentState, modalOpenState } from "../../recoil/modalAtoms.tsx";
import Purchase from "../Purchase";

function PurchaseBox() {
  const totalPrice = useRecoilValue(totalPriceSelector);
  const DELIVERY_FEE = totalPrice > 0 ? 3000 : 0;
  const POINTS = 1000;

  const setModalOpen = useSetRecoilState(modalOpenState);
  const setModalContent = useSetRecoilState(modalContentState);

  const openModal = () => {
    setModalOpen(true);
    setModalContent(<Purchase />);
  };

  return (
    <>
      <PurchaseBoxWrapper>
        <PurchaseWrapper>
          <PurchaseTitle>결제예상금액</PurchaseTitle>
        </PurchaseWrapper>
        <PurchaseWrapper>
          <PurchasePropertyWrapper>
            <PurchaseText>총 상품가격</PurchaseText>
            <PurchaseText>{totalPrice.toLocaleString()}원</PurchaseText>
          </PurchasePropertyWrapper>
          <PurchasePropertyWrapper>
            <PurchaseText>총 배송비</PurchaseText>
            <PurchaseText>+{DELIVERY_FEE.toLocaleString()}원</PurchaseText>
          </PurchasePropertyWrapper>
          <Vacant />
          <PurchasePropertyWrapper>
            <PurchaseText>총 주문 금액</PurchaseText>
            <PurchaseText>
              {(totalPrice + DELIVERY_FEE).toLocaleString()}원
            </PurchaseText>
          </PurchasePropertyWrapper>
          <PurchasePropertyWrapper>
            <DiscountText>포인트</DiscountText>
            <DiscountText>-{POINTS.toLocaleString()}원</DiscountText>
          </PurchasePropertyWrapper>
          <PurchasePropertyWrapper>
            <DiscountText>%:쿠폰명:%</DiscountText>
            <DiscountText>-{0}원</DiscountText>
          </PurchasePropertyWrapper>
          <PurchasePropertyWrapper>
            <DiscountText>%:쿠폰명:%</DiscountText>
            <DiscountText>-{0}원</DiscountText>
          </PurchasePropertyWrapper>
          <Vacant />
          <PurchasePropertyWrapper>
            <RealPriceText>최종 결제 금액</RealPriceText>
            <RealPriceText>
              {(totalPrice + DELIVERY_FEE - POINTS).toLocaleString()}원
            </RealPriceText>
          </PurchasePropertyWrapper>
          <PurchaseButtonWrapper>
            <PurchaseButton
              onClick={() => {
                if (confirm("결제 페이지로 이동하시겠습니까?")) {
                  openModal();
                }
              }}
            >
              주문하기
            </PurchaseButton>
          </PurchaseButtonWrapper>
        </PurchaseWrapper>
      </PurchaseBoxWrapper>
    </>
  );
}

export default PurchaseBox;
