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
import { useRecoilValue } from "recoil";
import { totalPriceSelector } from "../../app/recoil/cartAtoms.ts";
import { modalRepository } from "../../app/recoil/modalAtoms.tsx";
import Purchase from "../Purchase";

function PurchaseBox() {
  const totalPrice = useRecoilValue(totalPriceSelector);
  const DELIVERY_FEE = totalPrice > 0 ? 3000 : 0;
  const POINTS = 1000;
  const { openModal } = useRecoilValue(modalRepository);
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
            <RealPriceText>총 주문 금액</RealPriceText>
            <RealPriceText>
              {(totalPrice + DELIVERY_FEE).toLocaleString()}원
            </RealPriceText>
          </PurchasePropertyWrapper>
          <PurchaseButtonWrapper>
            <PurchaseButton
              onClick={() => {
                if (confirm("결제 페이지로 이동하시겠습니까?")) {
                  openModal(<Purchase />);
                }
              }}
            >
              할인받고 결제하기
            </PurchaseButton>
          </PurchaseButtonWrapper>
        </PurchaseWrapper>
      </PurchaseBoxWrapper>
    </>
  );
}

export default PurchaseBox;
