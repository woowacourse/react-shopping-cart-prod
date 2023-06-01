import { useState } from 'react';

import PageTitle from '@Components/PageTitle';
import PaymentArea from '@Components/PaymentArea';

import NotFound from '@Pages/NotFound';

import OrderDetail from './OrderDetail';
import * as S from './style';

function OrderSheet() {
  const [isEmptyCartItems, setIsEmptyCartItems] = useState(false);

  const setIsEmptyCartItemsTrue = () => setIsEmptyCartItems(true);

  if (isEmptyCartItems) return <NotFound />;

  return (
    <>
      <PageTitle title="주문서" />
      <S.Wrapper>
        <OrderDetail setIsEmptyCartItemsTrue={setIsEmptyCartItemsTrue} />
        <PaymentArea />
      </S.Wrapper>
    </>
  );
}

export default OrderSheet;
