import OrderedProductItem from './OrderedProductItem';

import type { CartProduct } from '../../types/product';

interface OrderedProductListProps {
  orderItems: CartProduct[];
}

const OrderedProductList = ({ orderItems }: OrderedProductListProps) => {
  return (
    <ul>
      {orderItems.map((orderItem) => (
        <OrderedProductItem
          key={orderItem.id}
          name={orderItem.product.name}
          price={orderItem.product.price}
          imageUrl={orderItem.product.imageUrl}
          quantity={orderItem.quantity}
        />
      ))}
    </ul>
  );
};

export default OrderedProductList;
