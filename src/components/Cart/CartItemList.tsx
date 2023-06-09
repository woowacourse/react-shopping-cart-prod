import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import CartItem from './CartItem';
import { cartAtom } from '../../recoil/cartItemData';
import ActionMessage from '../Common/ActionMessage';

const CartItemList = () => {
  const cart = useRecoilValue(cartAtom);

  return (
    <CartItemListContainer>
      {cart.length === 0 ? (
        <ActionMessage type='empty_cart' link='/' />
      ) : (
        cart.map((cartProduct) => (
          <li key={cartProduct.cartItemId}>
            <CartItem cartItem={cartProduct} />
          </li>
        ))
      )}
    </CartItemListContainer>
  );
};

const CartItemListContainer = styled.ul`
  width: 700px;

  & > li {
    padding: 33px 0;
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  }

  @media (max-width: 1100px) {
    width: 100%;
  }
`;

export default CartItemList;
