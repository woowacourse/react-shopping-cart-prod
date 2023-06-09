import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { BsCart4 } from 'react-icons/bs';
import getCartItemId from '../../../globalState/selectors/getCartItemId';
import getCartStateController from '../../../globalState/selectors/getCartStateController';
import productQuantityInCart from '../../../globalState/selectors/productQuantityInCart';
import useCartItemApi from '../../../hooks/api/useCartItemApi';
import Counter from '../../common/Counter/Counter';
import type { Product } from '../../../types/product';
import Colors from '../../../constant/Colors';

const ProductCounter = (product: Product) => {
  const { id: productId } = product;

  const { addCartItem, updateCartItemQuantity, deleteCartItem } = useCartItemApi();

  const cartItemId = useRecoilValue(getCartItemId(productId));
  const quantityInCart = useRecoilValue(productQuantityInCart(productId));
  const cartContoller = useRecoilValue(getCartStateController(cartItemId));

  const [count, setCount] = useState(quantityInCart);

  useEffect(() => {
    if (count === quantityInCart) return;

    setCount(quantityInCart);
  }, [cartItemId]);

  const updateCount = (quantity: number) => {
    setCount(quantity);

    if (quantity === 0 || cartItemId === null) return;

    updateCartItemQuantity(cartItemId)(quantity);
    cartContoller.set(quantity);
  };

  const addNewCartItem = async () => {
    const newCartItemId = await addCartItem(product);
    setCount(1);
    cartContoller.add(newCartItemId, 1, product);
  };

  const deleteCartItemIfNoQuantity = (quantity: number) => {
    if (quantity !== 0 || cartItemId === null) return;

    deleteCartItem(cartItemId);
    cartContoller.delete();
  };
  return (
    <CartButtonWrapper>
      {count ? (
        <Counter
          count={count}
          updateCount={updateCount}
          onClickedButton={deleteCartItemIfNoQuantity}
          onBlurredInput={deleteCartItemIfNoQuantity}
          onChangedInput={deleteCartItemIfNoQuantity}
        />
      ) : (
        <CartButton type="button" aria-label="장바구니에 추가하기" onClick={addNewCartItem}>
          <BsCart4 size="25px" />
        </CartButton>
      )}
    </CartButtonWrapper>
  );
};

const CartButtonWrapper = styled.div`
  position: absolute;
  right: 8px;
  bottom: 8px;
`;

const CartButton = styled.button`
  background: ${Colors.white};
  border: 1px solid ${Colors.grey4};

  padding: 7px;

  cursor: pointer;
`;

export default ProductCounter;
