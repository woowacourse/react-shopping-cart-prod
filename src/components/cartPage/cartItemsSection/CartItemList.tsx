import styled from 'styled-components';
import { CartItem } from './CartItem';
import { Product } from '../../../types/Product';

interface CartItemType {
  id: number;
  quantity: number;
  product: Product;
}

interface CartProductListProps {
  cartItemList: CartItemType[];
}

export const CartItemList = ({ cartItemList }: CartProductListProps) => {
  return (
    <Style.Container>
      {cartItemList.map((cartItem, index) => {
        return (
          <CartItem
            key={cartItem.id * index + cartItem.product.price}
            {...cartItem.product}
            productId={cartItem.product.id}
            cartId={cartItem.id}
          />
        );
      })}
    </Style.Container>
  );
};

const Style = {
  Container: styled.ul`
    width: 100%;
    height: max-content;

    display: flex;
    flex-direction: column;
  `,
};
