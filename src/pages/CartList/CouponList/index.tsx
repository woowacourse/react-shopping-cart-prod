import { useRecoilState, useRecoilValue } from 'recoil';

import Coupon from '@Components/Coupon';

import { MemberCouponType } from '@Types/index';

import { fetchData } from '@Utils/api';

import memberCouponState from '@Atoms/memberCouponState';
import serverState from '@Atoms/serverState';
import usingCouponState from '@Atoms/usingCouponState';

import { FETCH_METHOD, FETCH_URL } from '@Constants/servers';

import * as S from './style';

interface CouponListProps {
  onClose: () => void;
}

const CouponList = ({ onClose }: CouponListProps) => {
  const server = useRecoilValue(serverState);
  const [memberCoupon, setMemberCoupon] = useRecoilState(memberCouponState);
  const [usingCoupon, setUsingCoupon] = useRecoilState(usingCouponState);

  const amountUnusedCoupon = memberCoupon.filter((item) => !item.isUsed).length;
  const makeSelectCoupon = (coupon: MemberCouponType) => () => {
    setUsingCoupon(coupon);
    onClose();
  };

  const makeDeleteCoupon = (coupon: MemberCouponType) => async () => {
    await fetchData({ url: `${FETCH_URL.totalCoupon}/${coupon.id}`, method: FETCH_METHOD.DELETE, server });
    setMemberCoupon((current) => current.filter((item) => coupon.id !== item.id));
  };

  return (
    <S.Container>
      <S.AmountUnusedCoupon>
        사용 가능 쿠폰
        <S.Number> {amountUnusedCoupon}</S.Number>개
      </S.AmountUnusedCoupon>
      <S.List>
        {memberCoupon.map((item) => (
          <Coupon
            key={item.id}
            coupon={item}
            isSelect={item.id === usingCoupon.id}
            handleClick={makeSelectCoupon(item)}
            handleDeleteButton={makeDeleteCoupon(item)}
          />
        ))}
      </S.List>
    </S.Container>
  );
};
export default CouponList;
