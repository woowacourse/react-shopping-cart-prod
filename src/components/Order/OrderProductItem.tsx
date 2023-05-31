import styled from 'styled-components';

import type { Order, OrderProduct, Product } from '../../types/product';

interface OrderItemProps {
  orderProduct: OrderProduct;
}

const OrderProductItem = ({ orderProduct }: OrderItemProps) => {
  const { quantity, product } = orderProduct;

  return <div>주문 아이템!</div>;
};

export default OrderProductItem;
