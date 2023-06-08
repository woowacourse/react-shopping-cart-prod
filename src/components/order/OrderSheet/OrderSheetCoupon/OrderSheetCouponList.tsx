import { useRecoilValue } from 'recoil';
import OrderSheetCouponItem from './OrderSheetCouponItem';
import serverNameState from '../../../../globalState/atoms/serverName';
import ServerUtil from '../../../../utils/ServerUrl';
import useFetch from '../../../../hooks/api/useFetch';
import { FetchCouponsResponse } from '../../../../types/api';
import { USER_AUTH_TOKEN } from '../../../../constant/user';
import { Coupon } from '../../../../types/product';
import { styled } from 'styled-components';

interface OrderSheetCouponListProps {
  onChangeCoupon: (coupon: Coupon | null) => void;
}

const OrderSheetCouponList = ({
  onChangeCoupon,
}: OrderSheetCouponListProps) => {
  const serverName = useRecoilValue(serverNameState);
  const couponsUrl = ServerUtil.getUsersCouponUrl(serverName);

  const { getData: getMyCouponData, error } = useFetch<FetchCouponsResponse>(
    couponsUrl,
    {
      headers: {
        Authorization: `Basic ${USER_AUTH_TOKEN}`,
      },
    },
  );

  if (error) {
    throw error;
  }

  const myCoupons = getMyCouponData()?.coupons;

  return myCoupons?.length ? (
    <div>
      {myCoupons.map((coupon) => (
        <CouponLi key={coupon.id}>
          <OrderSheetCouponItem
            coupon={coupon}
            onChangeCoupon={onChangeCoupon}
          />
        </CouponLi>
      ))}
      <CouponLi>
        <NotSelectCouponLabel>
          <input type="radio" name="coupon" defaultChecked />
          <p>적용 안함</p>
        </NotSelectCouponLabel>
      </CouponLi>
    </div>
  ) : (
    <div>보유한 쿠폰이 없습니다 :(</div>
  );
};

const CouponLi = styled.div`
  &:not(:first-child) {
    padding-top: 7px;
  }
  &:not(:last-child) {
    padding-bottom: 7px;
  }
`;

const NotSelectCouponLabel = styled.label`
  display: flex;
  gap: 10px;
  width: 100%;
`;

export default OrderSheetCouponList;
