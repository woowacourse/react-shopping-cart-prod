import { useState } from 'react';
import { useCartRecoil } from '../../../hooks/recoil/useCartRecoil';
import { Counter } from '../../../layout/counter/Counter';
import { useCartFetch } from '../../../hooks/fetch/useCartFetch';
import { Loading } from '../../common/Loading';
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

    // eslint-disable-next-line no-restricted-globals
    const isUserWantDelete = confirm('상품을 장바구니에서 삭제하시겠습니까?');

    if (!isUserWantDelete) return;

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
        <Style.ShoppingCartImage
          src={`${process.env.PUBLIC_URL}/plusIcon.svg`}
          alt="장바구니 추가 버튼"
          onClick={handleClickShoppingCartIcon}
        />
      )}
    </>
  );
};

const Style = {
  ShoppingCartImage: styled.img`
    width: 35px;
    height: 35px;

    cursor: pointer;
  `,
};
