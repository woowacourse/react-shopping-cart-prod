import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import CartProductItem from './CartProductItem';
import { cartAtom } from '../../recoil/cartItemData';
import Message from '../Common/Message';

const CartProductList = () => {
  const cart = useRecoilValue(cartAtom);

  return (
    <CartProductListContainer>
      {cart.length === 0 ? (
        <Message type='empty_cart' link='/' />
      ) : (
        cart.map((cartProduct) => (
          <li key={cartProduct.cartItemId}>
            <CartProductItem cartProduct={cartProduct} />
          </li>
        ))
      )}
    </CartProductListContainer>
  );
};

const CartProductListContainer = styled.ul`
  width: 700px;

  & > li {
    padding: 33px 0;
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  }

  @media (max-width: 1100px) {
    width: 100%;
  }
`;

export default CartProductList;
