import * as S from './PurchaseBox.style.ts';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { checkedItemListState, totalPriceSelector } from '../../../recoil/cartAtoms.ts';
import PaymentInfo from '../../@common/PaymentInfo/PaymentInfo.tsx';
import { useNavigate } from 'react-router-dom';
import { orderState } from '../../../recoil/orderAtom.ts';

function PurchaseBox() {
  const navigate = useNavigate();
  const totalPrice = useRecoilValue(totalPriceSelector);
  const purchaseItem = useRecoilValue(checkedItemListState);
  const setPaymentItems = useSetRecoilState(orderState);

  const purchaseCartItems = () => {
    setPaymentItems(purchaseItem);
    navigate('/payment');
  };

  return (
    <>
      <S.PurchaseWrapper>
        <S.PurchaseTitle>결제예상금액</S.PurchaseTitle>
      </S.PurchaseWrapper>
      <S.PurchaseWrapper>
        <PaymentInfo totalPrice={totalPrice} />
        <S.PurchaseButtonWrapper>
          <S.PurchaseButton disabled={totalPrice === 0} onClick={purchaseCartItems}>
            주문하기
          </S.PurchaseButton>
        </S.PurchaseButtonWrapper>
      </S.PurchaseWrapper>
    </>
  );
}

export default PurchaseBox;
