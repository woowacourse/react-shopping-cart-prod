import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import CartProductItem from './CartProductItem';

import { cartProductState } from '../../states/cartProducts';
import Message from '../Common/Message';
import useFetchCartProducts from '../../hooks/useFetchCartProducts';

const CartProductList = () => {
  const cartProducts = useRecoilValue(cartProductState);

  useFetchCartProducts();

  if (cartProducts.length === 0) {
    return (
      <MessageWrapper>
        <Message type='cartEmpty' />
      </MessageWrapper>
    );
  }

  return (
    <CartProductListContainer>
      {cartProducts.map((cartProduct) => (
        <li key={cartProduct.id}>
          <CartProductItem cartProduct={cartProduct} />
        </li>
      ))}
    </CartProductListContainer>
  );
};

const CartProductListContainer = styled.ul`
  & > li {
    padding: 18px 0;
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};

    @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
      padding: 30px 0;
    }
  }
`;

const MessageWrapper = styled.div`
  position: relative;
  height: 400px;
`;

export default CartProductList;
