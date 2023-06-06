import { styled } from 'styled-components';
import { useCoupon } from '../../hooks/useCoupon';
import CouponList from './CouponList';

interface Props {
  totalProductsPrice: number;
  handleCouponSelect: ({ couponId, discountPrice, minOrderPrice }: Record<string, number>) => void;
  closeCouponModal: () => void | undefined;
}

export default function CouponModalContent({
  totalProductsPrice,
  handleCouponSelect,
  closeCouponModal,
}: Props) {
  const { rateCoupons, fixedCoupons } = useCoupon();

  return (
    <>
      <div>
        <Style.ModalTitle>쿠폰목록</Style.ModalTitle>
        <CouponList
          totalProductsPrice={totalProductsPrice}
          rateCoupons={rateCoupons}
          fixedCoupons={fixedCoupons}
          handleCouponSelect={handleCouponSelect}
        />
      </div>
      <button className="sr-only" onClick={closeCouponModal}>
        쿠폰선택창 닫기
      </button>
    </>
  );
}

const Style = {
  ModalTitle: styled.p`
    width: 100%;

    border-bottom: 4px solid var(--grey-400);
    padding-bottom: 30px;
    margin-bottom: 20px;

    font-size: 24px;
    color: var(--grey-400);
    text-align: center;
  `,
};
