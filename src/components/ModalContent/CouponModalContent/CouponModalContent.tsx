import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalOpenState } from '../../../recoil/modalAtoms';
import { ModalHeader } from '../ProductModalContent/ProductModalContent.style';
import { ModalTitle } from '../ProductModalContent/ProductModalContent.style';
import { ModalCloseButton } from '../ProductModalContent/ProductModalContent.style';
import type { Coupon } from '../../../types/types';
import couponIcon from '../../../assets/coupon.svg';
import unavailableCouponIcon from '../../../assets/unavailable-coupon.svg';
import * as S from './CouponModalContent.style';
import { sortCoupons } from '../../../utils/sort';
import { useState } from 'react';
import { couponState, pointState, totalPaymentPriceSelector } from '../../../recoil/orderAtom';

type CouponModalContentProps = {
  coupons: Coupon[];
};

function CouponModalContent({ coupons }: CouponModalContentProps) {
  const totalPrice = useRecoilValue(totalPaymentPriceSelector);
  const setModalOpen = useSetRecoilState(modalOpenState);
  const setCouponState = useSetRecoilState(couponState);
  const setPoint = useSetRecoilState(pointState);
  const [currentCoupon, setCurrentCoupon] = useState<{ id: number; discountPrice: number; couponName: string } | null>(
    null
  );

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCouponChange =
    ({ id, discountPrice, couponName }: { id: number; discountPrice: number; couponName: string }) =>
    () => {
      setCurrentCoupon({ id, discountPrice, couponName });
    };

  const applyCoupon = () => {
    setCouponState(currentCoupon);
    setPoint('');
    closeModal();
  };

  return (
    <>
      <ModalHeader>
        <ModalTitle>COUPON</ModalTitle>
        <ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
      </ModalHeader>
      <S.ContentWrapper>
        <S.CouponWrapper>
          {sortCoupons(coupons, totalPrice).map(
            ({ available, discountAmount, discountPercent, couponName, minAmount, id }) => {
              const discountPrice = discountAmount === 0 ? (totalPrice / 100) * discountPercent : discountAmount;

              return (
                <S.Label key={id}>
                  <S.Input
                    name='coupon'
                    type='radio'
                    disabled={!available}
                    onChange={handleCouponChange({ id, discountPrice, couponName })}
                  />
                  <S.Coupon unavailable={!available}>
                    <S.CouponImage src={available ? couponIcon : unavailableCouponIcon} />
                    <div>
                      <S.DiscountPercentage>
                        {discountAmount === 0 ? `${discountPercent}%` : `${discountAmount.toLocaleString()}원`}
                      </S.DiscountPercentage>
                      <S.Name>{couponName}</S.Name>
                      <div>
                        {minAmount === 0 ? '전체 적용 가능' : `${minAmount.toLocaleString()}이상 구매 시 사용 가능`}
                      </div>
                      {available ? (
                        <S.DiscountAmount>{discountPrice.toLocaleString()}원 할인</S.DiscountAmount>
                      ) : (
                        <S.Unavailable>사용 불가</S.Unavailable>
                      )}
                    </div>
                  </S.Coupon>
                </S.Label>
              );
            }
          )}
        </S.CouponWrapper>
        <S.ApplyButton onClick={applyCoupon}>적용하기</S.ApplyButton>
      </S.ContentWrapper>
    </>
  );
}

export default CouponModalContent;
