import PageTitle from '@Components/PageTitle';
import PaymentArea from '@Components/PaymentArea';

import OrderDetail from './OrderDetail';
import * as S from './style';

function OrderSheet() {
  return (
    <>
      <PageTitle title="주문서" />
      <S.Wrapper>
        <OrderDetail />
        <PaymentArea />
      </S.Wrapper>
    </>
  );
}

export default OrderSheet;
