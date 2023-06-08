import { Link } from 'react-router-dom';
import styled from 'styled-components';
import OrderProductItem from './OrderProductItem';
import { SM } from '../../constants/screenSizes';
import { ORDER_DETAILS_ROUTES } from '../../constants/routes';
import type { OrderedProduct } from '../../types/product';

interface OrderProductListProps {
  orderProducts: OrderedProduct;
  showDetailsLink?: boolean;
}

const OrderProductList = ({
  orderProducts,
  showDetailsLink,
}: OrderProductListProps) => {
  const { orderId, orderDateTime, orderItems } = orderProducts;

  return (
    <OrderProductContainer>
      <OrderProductListHeader>
        <div>
          <OrderId>주문번호 : {orderId}</OrderId>
          <OrderDataTime>{orderDateTime}</OrderDataTime>
        </div>
        {showDetailsLink && (
          <OrderDetailsLink to={ORDER_DETAILS_ROUTES(orderId)}>
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

const OrderDataTime = styled.span`
  @media (max-width: ${SM}) {
    display: none;
  }
`;

const OrderDetailsLink = styled(Link)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black};
`;

export default OrderProductList;
