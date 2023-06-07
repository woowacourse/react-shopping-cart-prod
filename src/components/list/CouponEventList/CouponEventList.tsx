import styled from '@emotion/styled';
import ErrorBox from '../../common/ErrorBox/ErrorBox';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import useCoupon from '../../../hooks/useCoupon';
import CouponEventItem from '../../box/CouponEventItem/CouponEventItem';
import EmptyList from '../../common/EmptyList';

const CouponEventList = () => {
  const { couponData, isFetching, isError } = useCoupon('issuable');

  if (isFetching) {
    return <LoadingSpinner />;
  }
  if (isError || !couponData) {
    return <ErrorBox errorType="network" />;
  }
  if (couponData.length === 0) {
    return <EmptyList text="이벤트가 없습니다" />;
  }
  return (
    <CouponEventListWrapper>
      {couponData.map((coupon) => (
        <CouponEventItem key={coupon.id} coupon={coupon} />
      ))}
    </CouponEventListWrapper>
  );
};

export default CouponEventList;

const CouponEventListWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;

  & > div:not(:last-child) {
    margin-bottom: 30px;
  }
`;
