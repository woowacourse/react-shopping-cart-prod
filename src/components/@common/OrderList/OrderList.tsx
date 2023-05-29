import { OrderResponse } from '../../../types/responses/OrderResponse.ts';
import { useNavigate } from 'react-router-dom';

type OrderListProps = {
  orderData: OrderResponse;
  hasDetailNavigateButton?: boolean;
};

const OrderList = ({ orderData, hasDetailNavigateButton }: OrderListProps) => {
  const navigate = useNavigate();

  const handleDetailButton = () => {
    navigate(`/order/${orderData.orderId}`, { state: { makeOrder: orderData } });
  };

  return (
    <ul>
      <div>
        <h2>Order ID: {orderData.orderId}</h2>
        {hasDetailNavigateButton && <button onClick={handleDetailButton}>상세보기</button>}
      </div>
      {orderData.items.map((item) => {
        return (
          <li key={item.product.id}>
            <img src={item.product.imageUrl} alt='' />
            <h3>{item.product.name}</h3>
            <p>
              {item.product.price}원 / 수량: {item.quantity}개
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default OrderList;
