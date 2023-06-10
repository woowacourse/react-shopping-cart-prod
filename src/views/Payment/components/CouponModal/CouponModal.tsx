import { useState } from "react";
import useCouponList from "@views/Payment/hooks/useCouponList";
import { Modal } from "@common/Modal";
import { useTotalPrice } from "@views/Cart/recoil/cartState";
import { Button } from "@common/Button";
import { CouponItem } from "../CouponItem";

import * as S from "./CouponModal.style";
import useModalExternal from "@common/hooks/useModalExternal";

interface CouponModalProps {
  isOpen: boolean;
  closeModal: () => void;
}
// TODO: utils 분리
const couponCondition = (minimumPrice: number) => {
  if (!minimumPrice) {
    return "금액 상관없이 적용";
  }

  return `${minimumPrice.toLocaleString("ko-KR")}원 이상 구매시 적용`;
};

const couponBenefitText = (type: string, value: number) => {
  switch (type) {
    case "percent": {
      return `${value}% 할인`;
    }

    case "price": {
      return `${value}원 할인`;
    }

    case "delivery": {
      return `배달비 무료`;
    }

    default: {
      throw new Error("coupon benefit text를 만들 수 없는 coupon 타입입니다.");
    }
  }
};

function CouponModal({ isOpen, closeModal }: CouponModalProps) {
  const { couponList, checkCoupon, resetCouponCheck } = useCouponList();
  const [checkedCouponId, setCheckedCouponId] = useState<number | null>(null);

  const totalPrice = useTotalPrice();
  const selectCouponTempt = (couponId: number) => () => {
    setCheckedCouponId(couponId);
  };

  const unSelectCoupon = () => {
    setCheckedCouponId(null);
    resetCouponCheck();
    closeModal();
  };

  const selectCoupon = () => {
    if (!checkedCouponId) return;
    checkCoupon(checkedCouponId);
    closeModal();
  };

  // TODO: handler 분리
  return isOpen ? (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <S.CouponContainerTitle>쿠폰함</S.CouponContainerTitle>
      <S.ModalContentWrapper>
        {
          <S.CouponListWrapper>
            {couponList.map((coupon) => {
              return (
                <CouponItem
                  key={coupon.id}
                  onClick={selectCouponTempt(coupon.id)}
                  disabled={totalPrice < coupon.minimumPrice}
                  benefit={couponBenefitText(coupon.type, coupon.value)}
                  condition={couponCondition(coupon.minimumPrice)}
                  name={coupon.name}
                  selected={coupon.id === checkedCouponId}
                />
              );
            })}
          </S.CouponListWrapper>
        }
      </S.ModalContentWrapper>
      <S.ButtonWrapper>
        <Button size="l" onClick={unSelectCoupon}>
          해제하기
        </Button>
        <Button size="l" primary onClick={selectCoupon}>
          선택완료
        </Button>
      </S.ButtonWrapper>
    </Modal>
  ) : null;
}

export default CouponModal;
