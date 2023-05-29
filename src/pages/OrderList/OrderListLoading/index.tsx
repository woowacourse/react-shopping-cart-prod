import Delivery from '@Asset/Delivery.png';

import * as S from './style';

function OrderListLoading() {
  return (
    <S.Container>
      <S.Image src={Delivery} />
      <S.Explanation>주문 목록을 불러오는 중입니다.</S.Explanation>
    </S.Container>
  );
}

export default OrderListLoading;
