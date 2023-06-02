import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Coupon from '@Components/Coupon';

import { MemberCouponType } from '@Types/index';

import { fetchData } from '@Utils/api';

import memberCouponState from '@Atoms/memberCouponState';
import serverState from '@Atoms/serverState';
import usingCouponState from '@Atoms/usingCouponState';

import { FETCH_METHOD, FETCH_URL } from '@Constants/servers';

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
    <Container>
      <AmountUnusedCoupon>
        사용 가능 쿠폰
        <Number> {amountUnusedCoupon}</Number>개
      </AmountUnusedCoupon>
      <List>
        {memberCoupon.map((item) => (
          <Coupon
            key={item.id}
            name={item.name}
            description={item.description}
            isSelect={item.id === usingCoupon.id}
            isUsed={item.isUsed}
            handleClick={makeSelectCoupon(item)}
            handleDeleteButton={makeDeleteCoupon(item)}
          />
        ))}
      </List>
    </Container>
  );
};
const Container = styled.div``;

const AmountUnusedCoupon = styled.div`
  margin-left: 10px;
  font-weight: 600;
  font-size: 17px;
  line-height: 20px;
`;

const Number = styled.span`
  color: rgb(6, 192, 158);
`;

const List = styled.ul`
  margin-top: 30px;
  max-height: 730px;
  overflow-y: auto;

  & > li {
    margin-bottom: 20px;
  }
`;

export default CouponList;
