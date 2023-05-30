import { OrderResponse } from '../../../types/responses/OrderResponse.ts';
import { useNavigate } from 'react-router-dom';
import routes from '../../../constants/routes.ts';
import * as Styled from './OrderList.styles.tsx';

type OrderListProps = {
  orderData: OrderResponse;
  hasDetailNavigateButton?: boolean;
};

const OrderList = ({ orderData, hasDetailNavigateButton }: OrderListProps) => {
  const navigate = useNavigate();

  const handleDetailButton = () => {
    navigate(`${routes.orderList}/${orderData.orderId}`, { state: { makeOrder: orderData } });
  };

  return (
    <Styled.OrderListWrapper>
      <Styled.OrderListHeader>
        <h2>주문 번호: {orderData.orderId}</h2>
        {hasDetailNavigateButton && <Styled.OrderDetailButton onClick={handleDetailButton}>상세보기</Styled.OrderDetailButton>}
      </Styled.OrderListHeader>
      {orderData.items.map((item) => {
        return (
          <Styled.OrderList key={item.product.id}>
            <Styled.OrderListImage src={item.product.imageUrl} alt={`picture of ${item.product.name}`} aria-label={`picture of ${item.product.name}`} />
            <Styled.OrderListContent>
              <h3>{item.product.name}</h3>
              <Styled.OrderQuantity>
                {item.product.price.toLocaleString()}원 / 수량: {item.quantity}개
              </Styled.OrderQuantity>
            </Styled.OrderListContent>
          </Styled.OrderList>
        );
      })}
    </Styled.OrderListWrapper>
  );
};

export default OrderList;
