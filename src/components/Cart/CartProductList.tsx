import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import CartProductItem from './CartProductItem';

import { cartProductState } from '../../states/cartProducts';
import Message from '../Common/Message';
import useFetchCartProducts from '../../hooks/useFetchCartProducts';

const CartProductList = () => {
  const cartProducts = useRecoilValue(cartProductState);

  useFetchCartProducts();

  if (!cartProducts.length) {
    return (
      <MessageWrapper>
        <Message type="cartEmpty" />
      </MessageWrapper>
    );
  }

  return (
    <ul>
      {cartProducts.map(cartProduct => (
        <CartProductItem key={cartProduct.id} cartProduct={cartProduct} />
      ))}
    </ul>
  );
};

const MessageWrapper = styled.div`
  position: relative;
  height: 400px;
`;

export default CartProductList;
