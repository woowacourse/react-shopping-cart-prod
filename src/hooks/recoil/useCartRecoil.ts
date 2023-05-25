import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  cartItemsState,
  selectedCartIdListState,
} from '../../recoil/atoms/cartAtom';
import { useProductFetch } from '../fetch/useProductFetch';

export const useCartRecoil = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const setSelectedCartIdList = useSetRecoilState(selectedCartIdListState);
  const { getProductDetailById } = useProductFetch();

  const addRecoilCartById = async (cartId: number, productId: number) => {
    const product = await getProductDetailById(productId);

    if (cartItems.some((cartItem) => cartItem.product.id === productId)) return;

    setCartItems((current) => {
      return [...current, { id: cartId, quantity: 1, product: product }];
    });
  };

  const deleteRecoilCartById = (cartId: number) => {
    setCartItems((current) =>
      current.filter((cartItem) => cartItem.id !== cartId)
    );
    setSelectedCartIdList((current) =>
      current.filter((selectedId) => selectedId !== cartId)
    );
  };

  const patchRecoilCartItemQuantity = (cartId: number, quantity: number) => {
    setCartItems((current) =>
      current.map((cartItem) => {
        if (cartItem.id === cartId) return { ...cartItem, quantity };
        return cartItem;
      })
    );
  };

  const getProductQuantityByCartId = (cartId: number) => {
    const quantity = cartItems.find(
      (cartItem) => cartItem.id === cartId
    )?.quantity;

    return quantity;
  };

  const getCartHasProduct = (productId: number) => {
    return cartItems.some((cartItem) => cartItem.product.id === productId);
  };

  const getAllCartIdList = () => {
    return cartItems.map((cartItem) => cartItem.id);
  };

  const getCartIdByProductId = (productId: number) => {
    const cartId = cartItems.find(
      (cartItem) => cartItem.product.id === productId
    )?.id;

    return cartId;
  };

  return {
    addRecoilCartById,
    deleteRecoilCartById,
    patchRecoilCartItemQuantity,
    getProductQuantityByCartId,
    getCartHasProduct,
    getAllCartIdList,
    getCartIdByProductId,
    cartItems,
  };
};
