import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Coupon from '@Components/Coupon';

import { MemberCouponType } from '@Types/index';

import memberCouponState from '@Atoms/memberCouponState';
import usingCouponState from '@Atoms/usingCouponState';

interface CouponListProps {
  onClose: () => void;
}

const CouponList = ({ onClose }: CouponListProps) => {
  const memberCoupon = useRecoilValue(memberCouponState);
  const [usingCoupon, setUsingCoupon] = useRecoilState(usingCouponState);

  const amountUnusedCoupon = memberCoupon.filter((item) => !item.isUsed).length;
  const makeSelectCoupon = (coupon: MemberCouponType) => () => {
    setUsingCoupon(coupon);
    onClose();
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
            handleClick={makeSelectCoupon(item)}
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
