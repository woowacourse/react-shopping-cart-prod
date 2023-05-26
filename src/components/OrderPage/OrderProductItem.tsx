import * as S from './OrderProductItem.styles';

interface OrderProductItemProps {
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}
const OrderProductItem = ({
  imageUrl,
  name,
  price,
  quantity,
}: OrderProductItemProps) => {
  const itemTotalPrice = price * quantity;

  return (
    <S.Item>
      <S.ProductImg src={imageUrl} alt={name} />
      <S.ProductInfo>
        <S.ProductName>{name}</S.ProductName>
        <S.ProductQuantity>
          {itemTotalPrice.toLocaleString()}원 / 수량 : {quantity}개
        </S.ProductQuantity>
      </S.ProductInfo>
    </S.Item>
  );
};

export default OrderProductItem;
