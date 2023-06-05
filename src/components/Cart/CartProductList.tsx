import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import CartProductItem from './CartProductItem';
import { cartAtom } from '../../recoil/cartItemData';

const CartProductList = () => {
  const cart = useRecoilValue(cartAtom);

  if (cart.length === 0) return <EmptyCart>장바구니가 비었어요</EmptyCart>;

  return (
    <CartProductListContainer>
      {cart.map((cartProduct) => (
        <li key={cartProduct.cartItemId}>
          <CartProductItem cartProduct={cartProduct} />
        </li>
      ))}
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

const EmptyCart = styled.p`
  margin: 40px 0;
`;

export default CartProductList;
