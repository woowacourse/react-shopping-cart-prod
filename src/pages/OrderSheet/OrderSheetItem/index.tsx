import { CartItemType } from '@Types/index';

import convert from '@Utils/convert';

import * as S from './style';

function OrderSheetItem({ product, quantity }: CartItemType) {
  const productTotalPrice = convert.toLocalPriceFromNumber(product.price * quantity);

  return (
    <S.Container>
      <S.DeliveryInfo>
        <S.ExpectArrive>1~4일내 도착 예정</S.ExpectArrive>
        <S.DeliveryType>택배배송</S.DeliveryType>
      </S.DeliveryInfo>
      <S.ProductInfo>
        <S.ProductImage src={product.imageUrl} alt={product.name} />
        <S.ProductWrapper>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductQuantity>수량 : {quantity} 개</S.ProductQuantity>
          <S.ProductPrice>{productTotalPrice}</S.ProductPrice>
        </S.ProductWrapper>
      </S.ProductInfo>
    </S.Container>
  );
}

export default OrderSheetItem;
