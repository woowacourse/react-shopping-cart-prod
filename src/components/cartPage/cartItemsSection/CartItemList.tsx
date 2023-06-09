import styled from 'styled-components';
import { CartItem } from './CartItem';
import { CartItemDetail } from '../../../recoil/atoms/cartAtom';

interface CartProductListProps {
  cartItemList: CartItemDetail[];
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
    width: 740px;
    height: max-content;

    display: flex;
    flex-direction: column;

    @media screen and (max-width: 480px) {
      width: 90vw;
    }
  `,
};
