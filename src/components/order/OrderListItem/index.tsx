import { OrderItem } from '../../../types';
import useNavigatePage from '../../../hooks/useNavigatePage';
import { S } from './OrderListItem.styles';

interface Props {
  order: OrderItem;
  isList?: boolean;
}

const OrderListItem = ({ order, isList = false }: Props) => {
  const { goOrderDetail } = useNavigatePage();

  const firstOrder = order.orderProducts[0];
  const orderLength = order.orderProducts.length;

  const orderItems =
    orderLength === 1 || isList ? (
      order.orderProducts.map(({ productId, name, imageUrl, price, quantity }) => (
        <S.ItemWrapper key={productId}>
          <S.Image src={imageUrl} alt={name} />
          <S.ItemInfoWrapper>
            <S.Name>{name}</S.Name>
            <S.Price>{`${price.toLocaleString()}원 / 수량 : ${quantity}개`}</S.Price>
          </S.ItemInfoWrapper>
        </S.ItemWrapper>
      ))
    ) : (
      <S.ItemWrapper key={firstOrder.productId}>
        <S.Image src={firstOrder.imageUrl} alt={firstOrder.name} />
        <S.ItemInfoWrapper>
          <S.Name>{`${firstOrder.name} 외 ${orderLength - 1}개`}</S.Name>
          <S.Price>{`${firstOrder.price.toLocaleString()}원 / 수량 : ${
            firstOrder.quantity
          }개`}</S.Price>
        </S.ItemInfoWrapper>
      </S.ItemWrapper>
    );

  return (
    <S.ItemsWrapper>
      <S.OrderInfoWrapper>
        <S.OrderNumber>{`주문번호 : ${order.orderId}`}</S.OrderNumber>
        {isList ? null : (
          <S.DetailButton
            onClick={() => goOrderDetail(order.orderId)}
          >{`상세보기 >`}</S.DetailButton>
        )}
      </S.OrderInfoWrapper>
      {orderItems}
    </S.ItemsWrapper>
  );
};

export default OrderListItem;
