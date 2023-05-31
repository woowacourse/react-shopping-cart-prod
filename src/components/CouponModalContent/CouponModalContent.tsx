import { useSetRecoilState } from 'recoil';
import { modalOpenState } from '../../recoil/modalAtoms';
import { ModalHeader } from '../ProductModalContent/ProductModalContent.style';
import { ModalTitle } from '../ProductModalContent/ProductModalContent.style';
import { ModalCloseButton } from '../ProductModalContent/ProductModalContent.style';
import type { Coupon } from '../../types/types';
import couponIcon from '../../assets/coupon.svg';
import * as S from './CouponModalContent.style';

type CouponModalContentProps = {
  coupons: Coupon[];
};

function CouponModalContent({ coupons }: CouponModalContentProps) {
  const setModalOpen = useSetRecoilState(modalOpenState);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <ModalHeader>
        <ModalTitle>COUPON</ModalTitle>
        <ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
      </ModalHeader>
      <S.ContentWrapper>
        {coupons.map(({ discountPercent, couponName, minAmount }) => (
          <S.Label>
            <S.Input name="coupon" type="radio" />
            <S.Coupon>
              <S.CouponImage src={couponIcon} />
              <div>
                <S.DiscountPercentage>{discountPercent}%</S.DiscountPercentage>
                <S.Name>{couponName}</S.Name>
                <div>
                  {minAmount === 0
                    ? '전체 적용 가능'
                    : `${minAmount.toLocaleString()}이상 구매 시 사용 가능`}
                </div>
              </div>
            </S.Coupon>
          </S.Label>
        ))}
        <S.ApplyButton>적용하기</S.ApplyButton>
      </S.ContentWrapper>
    </>
  );
}

export default CouponModalContent;
