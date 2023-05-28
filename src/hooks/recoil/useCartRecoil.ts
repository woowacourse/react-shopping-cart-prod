import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  cartItemsState,
  selectedCartIdListState,
} from '../../recoil/atoms/cartAtom';
import { useProductFetch } from '../fetch/useProductFetch';
import { useSelectedCartRecoil } from './useSelectedCartRecoil';

export const useCartRecoil = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const setSelectedCartIdList = useSetRecoilState(selectedCartIdListState);
  const { getProductDetailById } = useProductFetch();
  const { selectedCartIdList, deleteAllSelectedCartId } =
    useSelectedCartRecoil();

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

  const deleteAllSelectedRecoilCartItems = () => {
    selectedCartIdList.forEach((cartId) => {
      deleteRecoilCartById(cartId);
    });
    deleteAllSelectedCartId();
  };

  const patchRecoilCartItemQuantity = (cartId: number, quantity: number) => {
    setCartItems((current) =>
      current.map((cartItem) => {
        if (cartItem.id === cartId) return { ...cartItem, quantity };
        return cartItem;
      })
    );
  };

  const getAllCartIdList = () => {
    return cartItems.map((cartItem) => cartItem.id);
  };

  return {
    addRecoilCartById,
    deleteRecoilCartById,
    deleteAllSelectedRecoilCartItems,
    patchRecoilCartItemQuantity,
    getAllCartIdList,
    cartItems,
  };
};
