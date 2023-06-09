import { PaymentInfo } from '../../../@common/PaymentInfo';
import * as S from './FinalPriceBox.style';
import { useRecoilValue } from 'recoil';
import { couponState, pointState, totalPaymentPriceSelector } from '../../../../recoil/orderAtom';
import { fetchPostOrder } from '../../../../api/fetcher';
import { useNavigate } from 'react-router-dom';
import { PAGE_PATH } from '../../../../constants';
import { orderRequestData } from '../../../../recoil/orderAtom';
import { memberAuthorization } from '../../../../recoil/userAtoms';
import { serverState } from '../../../../recoil/serverAtom';
import useMutateQuery from '../../../../hooks/useMutateQuery';
import { OrderRequest } from '../../../../types/types';

function FinalPriceBox() {
  const totalPrice = useRecoilValue(totalPaymentPriceSelector);
  const finalOrderInfo = useRecoilValue(orderRequestData);
  const memberAuth = useRecoilValue(memberAuthorization);
  const server = useRecoilValue(serverState);
  const navigate = useNavigate();
  const point = useRecoilValue(pointState);
  const couponDiscount = useRecoilValue(couponState);
  const pointDiscount = point === '' ? 0 : point;
  const couponDiscountPrice = couponDiscount ? couponDiscount.discountPrice : 0;
  const { mutateQuery } = useMutateQuery<OrderRequest>({
    fetcher: () => fetchPostOrder({ server, auth: memberAuth, bodyData: finalOrderInfo }),
    onSuccess: () => navigate(PAGE_PATH.ORDER),
  });

  const purchase = async () => {
    await mutateQuery();
  };

  return (
    <>
      <S.PurchaseWrapper>
        <S.PurchaseTitle>결제금액</S.PurchaseTitle>
      </S.PurchaseWrapper>
      <S.PurchaseWrapper>
        <PaymentInfo
          totalPrice={totalPrice}
          pointDiscount={Number(pointDiscount)}
          couponDiscount={couponDiscountPrice}
        />
        <S.PurchaseButtonWrapper>
          <S.PaymentButton onClick={purchase}>결제하기</S.PaymentButton>
        </S.PurchaseButtonWrapper>
      </S.PurchaseWrapper>
    </>
  );
}

export default FinalPriceBox;
