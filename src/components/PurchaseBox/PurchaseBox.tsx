import {
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
import {useRecoilValue} from "recoil";
import Purchase from "../Purchase";
import {deliveryFeeState} from "../../app/recoil/order/orderAtom.ts";
import {totalPriceSelector} from "../../app/recoil/cart/cartSelectors.ts";
import {modalRepository} from "../../app/recoil/modal/modalRepository.tsx";

function PurchaseBox() {
  const totalPrice = useRecoilValue(totalPriceSelector);
  const DELIVERY_FEE = useRecoilValue(deliveryFeeState);
  const {openModal} = useRecoilValue(modalRepository);

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
            <PurchaseText>+{totalPrice > 0 ? DELIVERY_FEE.toLocaleString() : 0}원</PurchaseText>
          </PurchasePropertyWrapper>
          <Vacant/>
          <PurchasePropertyWrapper>
            <RealPriceText>총 주문 금액</RealPriceText>
            <RealPriceText>
              {totalPrice > 0 ? (totalPrice + DELIVERY_FEE).toLocaleString() : 0}원
            </RealPriceText>
          </PurchasePropertyWrapper>
          <PurchaseButtonWrapper>
            <PurchaseButton
              onClick={() => {
                if (confirm("결제 페이지로 이동하시겠습니까?")) {
                  openModal(<Purchase/>);
                }
              }}
              disabled={totalPrice === 0}
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
