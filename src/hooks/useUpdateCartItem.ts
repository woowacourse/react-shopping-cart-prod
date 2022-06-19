import { postCartItem, patchCartItem, deleteCartItem } from 'redux/action-creators/cartListThunk';
import { useAppDispatch } from './useAppDispatch';
import { CartItem } from 'types/domain';
import { CartListAction } from 'redux/actions/cartList';

const useUpdateCartItem = (cartList: CartItem[]) => {
  const dispatch = useAppDispatch<CartListAction>();

  const updateCartItemQuantity = (id: number, type = 'Increase', updateQuantity = 1) => {
    const targetItem = cartList.find(cartItem => cartItem.productId === id);

    if (type === 'Increase') {
      if (!targetItem) {
        dispatch(postCartItem({ productId: id, quantity: 1, checked: true }));

        return;
      }

      const newTargetItem = {
        cartItems: [
          {
            id: targetItem.id,
            quantity: targetItem.quantity + updateQuantity,
            checked: true,
          },
        ],
      };

      dispatch(patchCartItem(newTargetItem));

      return;
    }

    if (type === 'Decrease') {
      if (targetItem.quantity - updateQuantity > 0) {
        const newTargetItem = {
          cartItems: [
            {
              id: targetItem.id,
              quantity: targetItem.quantity - updateQuantity,
              checked: true,
            },
          ],
        };

        dispatch(patchCartItem(newTargetItem));
      }

      if (targetItem.quantity - updateQuantity <= 0) {
        const delteCartItems = {
          cartItems: [
            {
              id: targetItem.id,
            },
          ],
        };

        dispatch(deleteCartItem(delteCartItems));
      }
    }
  };

  const removeCartItem = delteCartItems => {
    dispatch(deleteCartItem(delteCartItems));
  };

  const toggleCartItemWillPurchase = (id: number) => {
    const targetItem = cartList.find(cartItem => cartItem.productId === id);
    const prevChecked = targetItem.checked;

    const newTargetItem = {
      cartItems: [
        {
          id: targetItem.id,
          quantity: targetItem.quantity,
          checked: !prevChecked,
        },
      ],
    };

    dispatch(patchCartItem(newTargetItem));
  };

  return { updateCartItemQuantity, toggleCartItemWillPurchase, removeCartItem };
};

export default useUpdateCartItem;
