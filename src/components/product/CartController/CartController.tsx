import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import useCartService from '../../../hooks/useCartService';
import productQuantityInCart from '../../../globalState/selectors/productQuantityInCart';
import serverNameState from '../../../globalState/atoms/serverName';
import Counter from '../../common/Counter/Counter';
import SmallCartIcon from '../../../assets/icons/SmallCartIcon';
import CartControllerSuspense from './CartControllerSuspense';
import type { Product } from '../../../types/product';

const CartController = (product: Product) => {
  const { id: productId } = product;
  const { addCartItem, updateCartItemQuantity, deleteCartItem, getCartId } =
    useCartService();

  const quantityInCart = useRecoilValue(productQuantityInCart(productId));
  const [count, setCount] = useState(quantityInCart);
  const [isLoadingCounter, setIsLoadingCounter] = useState(false);
  const [isDisplayCounter, setIsDisplayCounter] = useState(!!quantityInCart);

  const prevServerName = useRef('');
  const serverName = useRecoilValue(serverNameState);

  const updateCount = (quantity: number) => {
    setCount(quantity);

    if (quantity === 0) return;
    updateCartItemQuantity(getCartId(productId))(quantity);
  };

  const handleAddCartButtonClick = async () => {
    setIsLoadingCounter(true);

    await addCartItem(product);

    setCount(1);
    setIsDisplayCounter(true);
    setIsLoadingCounter(false);
  };

  const handleNoQuantityAction = async (quantity: number) => {
    if (quantity !== 0) return;
    setIsLoadingCounter(true);

    await deleteCartItem(getCartId(productId));

    setIsDisplayCounter(false);
    setIsLoadingCounter(false);
  };

  useEffect(() => {
    if (prevServerName.current === serverName) return;

    setCount(quantityInCart);
    setIsDisplayCounter(!!quantityInCart);

    prevServerName.current = serverName;
  }, [quantityInCart]);

  return (
    <CartControllerSuspense isLoading={isLoadingCounter}>
      {isDisplayCounter ? (
        <Counter
          count={count}
          updateCount={updateCount}
          onClickedButton={handleNoQuantityAction}
          onBlurredInput={handleNoQuantityAction}
        />
      ) : (
        <CartButton
          type="button"
          aria-label="장바구니에 추가하기"
          onClick={handleAddCartButtonClick}
        >
          <SmallCartIcon />
        </CartButton>
      )}
    </CartControllerSuspense>
  );
};

const CartButton = styled.button`
  background: #fff;
  border: 1px solid #dddddd;

  padding: 7px;

  cursor: pointer;
`;

export default CartController;
