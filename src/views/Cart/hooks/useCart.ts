import { useRecoilState } from 'recoil';
import useFetchCart from './useFetchCart';
import cartState from '../recoil/cartState';
import { CartItemType } from 'types/ProductType';
import validateCart from '@views/Payment/utils/validateCart';

export const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const fetchCart = useFetchCart();

  const getCartItemQuantity = (productId: number) => {
    const cartItem = cart.find((cartItem) => cartItem.product.id === productId);
    return cartItem?.quantity ?? 0;
  };

  const getCartItemId = (productId: number): number | undefined => {
    const cartItem = cart.find((cartItem) => cartItem.product.id === productId);
    return cartItem?.id;
  };

  const addCartItem = (productId: number) => {
    let isAdding = false;
    return async () => {
      if (isAdding) return;
      isAdding = true;

      await fetchCart.POST(productId);
      const response = await fetchCart.GET();
      if (!response.ok) throw new Error();

      const newCart: CartItemType[] = await response.json();

      const checkedCart = newCart.map((cartItem) => {
        cartItem.checked = true;
        return cartItem;
      });

      isAdding = false;
      setCart(checkedCart);
    };
  };

  const updateCartItemQuantity = (cartId: number, quantity: number) => {
    validateCart(cart, cartId);
    // DELETE
    if (quantity === 0) {
      setCart(cart.filter((cartItem) => cartItem.id !== cartId));
      fetchCart.DELETE(cartId);
      return;
    }

    // UPDATE(PATCH)
    setCart(
      cart.map((cartItem) => {
        if (cartItem.id === cartId) {
          return {
            ...cartItem,
            quantity,
          };
        }
        return cartItem;
      })
    );
    fetchCart.PATCH(cartId, quantity);
  };

  const totalPrice = cart.reduce((totalPrice, cartItem) => {
    return cartItem.checked ? totalPrice + cartItem.product.price * cartItem.quantity : totalPrice;
  }, 0);

  return {
    cart,
    setCart,
    getCartItemQuantity,
    getCartItemId,
    updateCartItemQuantity,
    addCartItem,
    totalPrice,
  };
};

export const useCheckCart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const fetchCart = useFetchCart();

  const isAllChecked = cart.every((cartItem) => cartItem.checked);

  const getCartItemIsChecked = (cartId: number) => {
    const cartItem = cart.find((cartItem) => cartItem.id === cartId);
    return cartItem?.checked ?? false;
  };

  const setCartItemIsChecked = (cartId: number) => {
    setCart(
      cart.map((cartItem) => {
        if (cartItem.id === cartId) {
          return {
            ...cartItem,
            checked: !cartItem.checked,
          };
        }
        return cartItem;
      })
    );
  };

  const checkedCartCount = cart.reduce(
    (totalCount, cartItem) => (cartItem.checked ? totalCount + 1 : totalCount),
    0
  );

  const toggleAllCartItem = () => {
    setCart((prevCart) => {
      return prevCart.map((item) => ({ ...item, checked: !isAllChecked }));
    });
  };

  const deleteCheckedItems = () => {
    setCart(cart.filter((cartItem) => cartItem.checked === false));

    cart
      .filter((cartItem) => cartItem.checked === true)
      .forEach((cartItem) => {
        fetchCart.DELETE(cartItem.id);
      });
  };

  const getCheckedItemIds = () => {
    return cart.filter((item) => item.checked).map((item) => item.id);
  };

  const totalPrice = cart.reduce((totalPrice, cartItem) => {
    return cartItem.checked ? totalPrice + cartItem.product.price * cartItem.quantity : totalPrice;
  }, 0);

  return {
    cart,
    isAllChecked,
    checkedCartCount,
    getCartItemIsChecked,
    setCartItemIsChecked,
    toggleAllCartItem,
    deleteCheckedItems,
    getCheckedItemIds,
  };
};
