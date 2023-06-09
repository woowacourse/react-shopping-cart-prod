import * as S from './OrderItemInfo.style';

interface OrderItemInfoProps {
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

function OrderItemInfo({ name, imageUrl, price, quantity }: OrderItemInfoProps) {
  return (
    <S.Container>
      <S.Image src={imageUrl} alt={`주문한 ${name} 이미지`} />
      <S.InfoWrapper>
        <S.Name>{name}</S.Name>
        <S.PriceAndQuantity>
          {price}원 / 수량 : {quantity}개
        </S.PriceAndQuantity>
      </S.InfoWrapper>
    </S.Container>
  );
}

export default OrderItemInfo;
