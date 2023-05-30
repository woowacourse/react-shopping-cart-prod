import { useRecoilValue } from 'recoil';
import * as S from './styles/CartBill.styles';
import { cartBillTotalPriceState, checkedListState } from '../../atom/state';

export default function CartBill() {
  const checkedList = useRecoilValue(checkedListState);
  const cartBillTotalPrice = useRecoilValue(cartBillTotalPriceState);
  const deliveryFee = checkedList.filter((checked) => checked).length === 0 ? 0 : 3000;

  return (
    <S.Wrapper>
      <S.TitleBox>결제예상금액</S.TitleBox>
      <S.BillBox>
        <S.BillRow>
          <p>총 상품가격</p>
          <p>{cartBillTotalPrice.toLocaleString()}원</p>
        </S.BillRow>
        <S.BillRow>
          <p>총 배송비</p>
          <p>{deliveryFee.toLocaleString()}원</p>
        </S.BillRow>
        <S.BillRow>
          <p>총 주문금액</p>
          <p>{(cartBillTotalPrice + deliveryFee).toLocaleString()}원</p>
        </S.BillRow>
        <S.OrderButton>주문하기</S.OrderButton>
      </S.BillBox>
    </S.Wrapper>
  );
}
