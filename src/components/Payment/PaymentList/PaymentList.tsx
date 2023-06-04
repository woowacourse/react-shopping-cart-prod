import type { CartItem } from '../../../types/types';
import * as S from './PaymentList.style';

type PaymentListProps = {
  order: CartItem[];
};

function PaymentList({ order }: PaymentListProps) {
  return (
    <S.Wrapper>
      <S.Summary>총 {order.length}건</S.Summary>
      {order.map(({ product, quantity }) => (
        <S.PaymentItem>
          <S.ItemImage src={product.imageUrl} />
          <S.ItemInfo>
            <S.ItemName>{product.name}</S.ItemName>
            <div>
              <S.ItemPrice>{(product.price * quantity).toLocaleString()}원</S.ItemPrice>
              <S.ItemQuantity> | {quantity}개</S.ItemQuantity>
            </div>
          </S.ItemInfo>
        </S.PaymentItem>
      ))}
    </S.Wrapper>
  );
}

export default PaymentList;
