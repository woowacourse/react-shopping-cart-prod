import styled from '@emotion/styled';
import CouponItem from '../../box/CouponItem/CouponItem';
import useCouponFetch from '../../../hooks/useCouponFetch';
import Button from '../../common/Button/Button';
import { useConfirmModal } from '../../../hooks/useConfirmModal';

const CouponList = () => {
  const { allCoupon, addCouponAPI } = useCouponFetch();
  const { openModal } = useConfirmModal();

  const addCoupon = async (couponId: number) => {
    addCouponAPI({ id: couponId });
  };
  return (
    <CouponListWrapper>
      {allCoupon?.map((issuableCoupon) => {
        const { issuable, ...coupon } = issuableCoupon;

        return (
          <CouponWrapper key={coupon.id}>
            <CouponItem coupon={coupon} />
            <PublishButton
              size="big"
              text="발급하기"
              onClick={() => {
                issuable
                  ? openModal({
                      title: '쿠폰을 발급하시겠습니까?',
                      callback: () => addCoupon(coupon.id),
                    })
                  : openModal({ title: '이미 발급된 쿠폰입니다.' });
              }}
            />
          </CouponWrapper>
        );
      })}
    </CouponListWrapper>
  );
};

export default CouponList;

const CouponListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media screen and (max-width: 660px) {
    gap: 12px;
  }
`;

const CouponWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-items: center;

  @media screen and (max-width: 660px) {
    flex-direction: column;
  }
`;

const PublishButton = styled(Button)`
  width: 30%;
  @media screen and (max-width: 660px) {
    size: 'big';
    width: 350px;
  }
`;
