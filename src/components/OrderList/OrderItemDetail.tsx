import { ProductType } from '../../types';
import * as S from './styles/OrderItemDetail.styles';
import Image from '../common/Image';

export default function OrderItemDetail(props: { product: ProductType; quantity: number }) {
  const { product, quantity } = props;

  return (
    <S.Wrapper>
      <S.ImageWrapper>
        <Image src={`${product.imageUrl}`} alt="상품 이미지" />
      </S.ImageWrapper>
      <div>
        <S.ItemNameText>{product.name}</S.ItemNameText>
        <S.ItemCountText>수량 : {quantity}개</S.ItemCountText>
        <S.ItemPriceText>{product.price.toLocaleString()} 원</S.ItemPriceText>
      </div>
    </S.Wrapper>
  );
}
