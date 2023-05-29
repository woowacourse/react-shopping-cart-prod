import { Link } from 'react-router-dom';
import styled from 'styled-components';
import OrderProductItem from './OrderProductItem';
import type { OrderDetails } from '../../types/product';

interface OrderProductListProps {
  orderProducts: OrderDetails;
  showDetailsLink?: boolean;
}

const OrderProductList = ({
  orderProducts,
  showDetailsLink,
}: OrderProductListProps) => {
  const { orderId, orderDateTime } = orderProducts;
  const orderItems = orderProducts.orderItems;

  return (
    <OrderProductContainer>
      <OrderProductListHeader>
        <div>
          <OrderId>주문번호 : {orderId}</OrderId>
          <span>{orderDateTime}</span>
        </div>
        {showDetailsLink && (
          <OrderDetailsLink to={`/orders/${orderId}`}>
            상세보기 {'>'}
          </OrderDetailsLink>
        )}
      </OrderProductListHeader>
      {orderItems.map((orderItem, index) => (
        <li>
          <OrderProductItem
            key={`orderProducts-${index}`}
            orderProduct={orderItem}
          />
        </li>
      ))}
    </OrderProductContainer>
  );
};

const OrderProductContainer = styled.ul`
  width: 1100px;
  margin: 50px 0;
  border: 1px solid ${({ theme }) => theme.colors.gray400};
`;

const OrderProductListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 92px;
  padding: 36px 39px;
  background-color: ${({ theme }) => theme.colors.gray200};
  font-size: 20px;
`;

const OrderId = styled.span`
  display: inline-block;
  margin-right: 50px;
`;

const OrderDetailsLink = styled(Link)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black};
`;

export default OrderProductList;
