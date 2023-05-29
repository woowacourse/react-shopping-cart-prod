import {
  PurchaseBoxWrapper,
  PurchaseButton,
  PurchaseButtonWrapper,
  PurchasePropertyWrapper,
  PurchaseText,
  PurchaseTitle,
  PurchaseWrapper,
  Vacant,
} from "./PurchaseBox.style";
import { useRecoilValue } from "recoil";
import {
  checkedCartSelector,
  totalPriceSelector,
} from "../../recoil/cartAtoms.ts";
import { Order, OrderItem } from "../../types/types.ts";

function PurchaseBox() {
  const totalPrice = useRecoilValue(totalPriceSelector);
  const DELIVERY_FEE = totalPrice > 0 ? 3000 : 0;
  const checkedCartList = useRecoilValue(checkedCartSelector);

  const purchase = () => {
    const order: Order = {
      orders: checkedCartList.map(
        (cart): OrderItem => ({
          cartItemId: cart.id,
          quantity: cart.quantity,
          productId: cart.product.id,
        })
      ),
      couponId: null,
      point: 1000,
    };
    alert(`서버로 보낼 데이터 (아직 안보내용): ${JSON.stringify(order)}`);
  };

  return (
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
          <PurchaseText>{DELIVERY_FEE.toLocaleString()}원</PurchaseText>
        </PurchasePropertyWrapper>
        <Vacant />
        <PurchasePropertyWrapper>
          <PurchaseText>총 주문 금액</PurchaseText>
          <PurchaseText>
            {(totalPrice + DELIVERY_FEE).toLocaleString()}원
          </PurchaseText>
        </PurchasePropertyWrapper>
        <PurchaseButtonWrapper>
          <PurchaseButton onClick={() => purchase()}>주문하기</PurchaseButton>
        </PurchaseButtonWrapper>
      </PurchaseWrapper>
    </PurchaseBoxWrapper>
  );
}

export default PurchaseBox;
