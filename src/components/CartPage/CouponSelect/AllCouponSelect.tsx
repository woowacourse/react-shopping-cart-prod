import { Suspense } from 'react';
import * as S from './AllCouponSelect.styles';
import AllSelect from './AllSelect';

const AllCouponSelect = () => {
  return (
    <>
      <S.Header>추가 쿠폰 적용</S.Header>
      <S.Container>
        <S.Text>장바구니 할인쿠폰</S.Text>
        <Suspense>
          <AllSelect />
        </Suspense>
      </S.Container>
    </>
  );
};

export default AllCouponSelect;
