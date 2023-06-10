import { useRecoilValue } from 'recoil';
import serverNameState from '../../globalState/atoms/serverName';
import CartApi from '../../api/Cart';

const useCartItemApi = () => {
  const serverName = useRecoilValue(serverNameState);

  const addCartItem = async (productId: number) => {
    const cartItemId = await CartApi.addNewItem(serverName, productId);
    return cartItemId;
  };

  const updateCartItemQuantity = (cartId: string) => async (quantity: number) => {
    await CartApi.changeQuantity(serverName, cartId, quantity);
  };

  const deleteCartItem = async (cartId: string) => {
    await CartApi.deleteItem(serverName, cartId);
  };

  return {
    addCartItem,
    updateCartItemQuantity,
    deleteCartItem,
  } as const;
};

export default useCartItemApi;
