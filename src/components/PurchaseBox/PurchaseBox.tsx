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
import {
  checkedCartSelector,
  totalPriceSelector,
} from "../../recoil/cartAtoms.ts";
import { NewOrder, NewOrderItem } from "../../types/types.ts";
import { useNavigate } from "react-router-dom";

function PurchaseBox() {
  const navigate = useNavigate();

  const totalPrice = useRecoilValue(totalPriceSelector);
  const DELIVERY_FEE = totalPrice > 0 ? 3000 : 0;
  const checkedCartList = useRecoilValue(checkedCartSelector);
  const POINTS = 1000;

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
    navigate("/order");
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
            <PurchaseButton onClick={() => purchase()}>주문하기</PurchaseButton>
          </PurchaseButtonWrapper>
        </PurchaseWrapper>
      </PurchaseBoxWrapper>
    </>
  );
}

export default PurchaseBox;
