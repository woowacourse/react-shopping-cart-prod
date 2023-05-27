import { useState } from 'react';
import { ShoppingCartIcon } from '../../../assets/ShoppingCartIcon';
import { useCartRecoil } from '../../../hooks/recoil/useCartRecoil';
import { Counter } from '../../../layout/counter/Counter';
import { useCartFetch } from '../../../hooks/fetch/useCartFetch';
import Loading from '../../common/Loading';
import { useRecoilValue } from 'recoil';
import { cartItemsState } from '../../../recoil/atoms/cartAtom';
import styled from 'styled-components';

interface AddCartButtonProps {
  productId: number;
}

export const AddCartButton = ({ productId }: AddCartButtonProps) => {
  const cartItems = useRecoilValue(cartItemsState);
  const initialQuantity =
    cartItems.find((cartItem) => cartItem.product.id === productId)?.quantity ??
    1;
  const cartId = cartItems.find(
    (cartItem) => cartItem.product.id === productId
  )?.id;

  const [isLoading, setIsLoading] = useState(false);

  const {
    addRecoilCartById,
    deleteRecoilCartById,
    patchRecoilCartItemQuantity,
  } = useCartRecoil();
  const { addCartItemByProductId, deleteCartItemById, patchCartItemQuantity } =
    useCartFetch();

  const handleClickShoppingCartIcon = () => {
    setIsLoading(true);
    addCartItemByProductId(productId).then((response) => {
      const cartId = response.headers
        .get('Location')
        ?.replace('/cart-items/', '');

      addRecoilCartById(Number(cartId), productId);
      setIsLoading(false);
    });
  };

  const deleteCartItem = () => {
    if (cartId === undefined) return;

    deleteRecoilCartById(cartId);
    deleteCartItemById(cartId);
  };

  const patchQuantity = (quantity: number) => {
    if (cartId === undefined) return;

    patchRecoilCartItemQuantity(cartId, quantity);
    patchCartItemQuantity(cartId, quantity);
  };

  const handleChangeQuantity = (quantity: number) => {
    if (quantity <= 0) {
      deleteCartItem();
      return;
    }
    patchQuantity(quantity);
  };

  return (
    <>
      {cartId !== undefined ? (
        <Counter
          quantity={initialQuantity}
          onQuantityChange={handleChangeQuantity}
        />
      ) : isLoading ? (
        <Loading />
      ) : (
        <Style.Container>
          <ShoppingCartIcon handleClick={handleClickShoppingCartIcon} />
        </Style.Container>
      )}
    </>
  );
};

const Style = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 65px;
    height: 65px;
    border-radius: 50%;
    background: #ffffff;
  `,
};
