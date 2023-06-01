import { Suspense } from 'react';
import * as S from './AllCouponSelectContainer.styles';
import AllCouponSelect from './AllCouponSelect';

const AllCouponSelectContainer = () => {
  return (
    <>
      <S.Header>추가 쿠폰 적용</S.Header>
      <S.Container>
        <S.Text>장바구니 할인쿠폰</S.Text>
        <Suspense>
          <AllCouponSelect />
        </Suspense>
      </S.Container>
    </>
  );
};

export default AllCouponSelectContainer;
