import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { BsCart4 } from 'react-icons/bs';
import getCartItemId from '../../../globalState/selectors/getCartItemId';
import getCartStateController from '../../../globalState/selectors/getCartStateController';
import productQuantityInCart from '../../../globalState/selectors/productQuantityInCart';
import useCartService from '../../../hooks/useCartService';
import Counter from '../../common/Counter/Counter';
import { Product } from '../../../types/product';

const ProductCounter = (product: Product) => {
  const { id: productId } = product;

  const { addCartItem, updateCartItemQuantity, deleteCartItem } = useCartService();

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

  const handleAddCartButtonClick = async () => {
    const newCartItemId = await addCartItem(product);
    setCount(1);
    cartContoller.add(newCartItemId, 1, product);
  };

  const handleNoQuantityAction = (quantity: number) => {
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
          onClickedButton={handleNoQuantityAction}
          onBlurredInput={handleNoQuantityAction}
          onChangedInput={handleNoQuantityAction}
        />
      ) : (
        <CartButton
          type="button"
          aria-label="장바구니에 추가하기"
          onClick={handleAddCartButtonClick}
        >
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
  background: #fff;
  border: 1px solid #dddddd;

  padding: 7px;

  cursor: pointer;
`;

export default ProductCounter;
