import { ProductType } from '../../types';
import * as S from './styles/OrderItemDetail.styles';

export default function OrderItemDetail(props: { product: ProductType; quantity: number }) {
  const { product, quantity } = props;

  return (
    <S.Wrapper>
      <div>
        <img src={`${product.imageUrl}`} alt="상품 이미지" />
      </div>
      <div>
        <S.ItemNameText>{product.name}</S.ItemNameText>
        <S.ItemCountText>수량 : {quantity}개</S.ItemCountText>
        <S.ItemPriceText>{product.price.toLocaleString()} 원</S.ItemPriceText>
      </div>
    </S.Wrapper>
  );
}
