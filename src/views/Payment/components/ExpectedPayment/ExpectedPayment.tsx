import { useNavigate } from "react-router-dom";
import { useCheckCart } from "@views/Cart/hooks/useCart";
import { CouponModal } from "../CouponModal";
import { useCouponSelected } from "@views/Payment/recoil/couponListState";
import { Button } from "@common/Button";
import { CouponMessage } from "../CouponMessage";
import useExpectedPrice from "@views/Payment/hooks/useExpectedPrice";
import useFetchOrders from "@views/Payment/hooks/useFetchOrders";
import useModalExternal from "@common/hooks/useModalExternal";
import ROUTER_PATH from "@router/constants/routerPath";

import * as S from "./ExpectedPayment.style";
import { RiCoupon2Line } from "react-icons/ri";
import { FlexWrapper } from "@pages/CartPage/CartPage.style";

function ExpectedPayment() {
  const { isOpen, closeModal, openModal } = useModalExternal();

  const fetchOrders = useFetchOrders();
  const couponSelected = useCouponSelected();
  const { getCheckedItemIds } = useCheckCart();

  const { deliveryFee, discountPrice, expectedPrice, totalPrice } =
    useExpectedPrice(couponSelected);

  const navigate = useNavigate();

  const handlePay = async () => {
    const requestBody = {
      orderItemIds: getCheckedItemIds(),
    };

    if (couponSelected) requestBody.couponId = couponSelected;

    const response = await fetchOrders.postOrder(requestBody);
    const orderId = response.headers.get("Location")?.split("/").pop();

    if (!orderId) throw new Error("주문 후 orderId를 조회할 수 없습니다.");

    navigate(`${ROUTER_PATH.order}/${Number(orderId)}`);
  };

  return (
    <S.PayingContainer>
      <S.PayingBox>
        <S.CouponContainer>
          <S.CouponTitleWrapper>
            <RiCoupon2Line />
            <S.CouponTitle>쿠폰</S.CouponTitle>
          </S.CouponTitleWrapper>
          <CouponMessage />
          <S.CouponButton
            size="m"
            onClick={openModal}
            disabled={totalPrice === 0}
          >
            쿠폰선택
          </S.CouponButton>
        </S.CouponContainer>
        <S.PayingBackground>
          <FlexWrapper>
            <S.ContentText>총 상품 가격</S.ContentText>
            <S.ContentText>
              {totalPrice.toLocaleString("ko-KR")}원
            </S.ContentText>
          </FlexWrapper>
          <FlexWrapper>
            <S.ContentText>총 배송비</S.ContentText>
            <S.ContentText>
              {deliveryFee.toLocaleString("ko-KR")}원
            </S.ContentText>
          </FlexWrapper>
          <FlexWrapper>
            <S.CouponText info={discountPrice > 0}>쿠폰 할인</S.CouponText>
            <S.CouponText info={discountPrice > 0}>
              - {discountPrice.toLocaleString("ko-KR")}원
            </S.CouponText>
          </FlexWrapper>
          <S.TotalPriceContainer>
            <S.TotalText>총 주문금액</S.TotalText>
            <S.TotalText>{expectedPrice.toLocaleString("ko-KR")}원</S.TotalText>
          </S.TotalPriceContainer>
        </S.PayingBackground>
        <Button
          size="l"
          primary
          onClick={handlePay}
          disabled={totalPrice === 0}
        >
          결제하기
        </Button>
      </S.PayingBox>
      <CouponModal isOpen={isOpen} closeModal={closeModal} />
    </S.PayingContainer>
  );
}

export default ExpectedPayment;
