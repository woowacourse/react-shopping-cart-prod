import { Suspense } from 'react';

import PaymentAmount from './PaymentAmount';
import SkeletonPaymentAmount from './PaymentAmount/SkeletonPaymentAmount';
import * as S from './style';

function PaymentArea() {
  return (
    <S.PaymentLayout>
      <Suspense fallback={<SkeletonPaymentAmount />}>
        <PaymentAmount />
      </Suspense>
    </S.PaymentLayout>
  );
}

export default PaymentArea;
