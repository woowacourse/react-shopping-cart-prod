import OrderProductItem from './OrderProductItem';
import type { OrderProduct } from '../../types/product';

interface OrderProductListProps {
  orderProducts: OrderProduct[];
}

const OrderProductList = ({ orderProducts }: OrderProductListProps) => {
  return (
    <ul>
      {orderProducts.map((orderProduct, index) => (
        <li>
          <OrderProductItem
            key={`orderProducts-${index}`}
            orderProduct={orderProduct}
          />
        </li>
      ))}
    </ul>
  );
};

export default OrderProductList;
