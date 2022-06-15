import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import createAction from "@redux/utils/createAction";
import CART_ACTION_TYPE from "@redux/reducers/cart-reducer/cartActions";
import {
  updateCartItemQuantity,
  deleteCartItems,
  getCart,
} from "@redux/reducers/cart-reducer/cartThunks";

import Button from "@components/Button";

// eslint-disable-next-line import/no-unresolved
import LabeledCheckbox from "@components/CheckBox/LabeledCheckbox/LabeledCheckbox";
import CartItem from "../CartItem/CartItem";

import getSelectedCartItemIds from "../../utils/getSelectedCartItemIds";
import styles from "./CartForm.module";

function CartForm({ className }) {
  const dispatch = useDispatch();
  const { isLoading, cart } = useSelector((state) => ({
    cart: state.cart.data,
    ...state.cart.query.getCart,
  }));

  const selectedCartItemIds = getSelectedCartItemIds(cart);
  const isAllSelected =
    selectedCartItemIds.length > 0 &&
    selectedCartItemIds.length === cart.length;

  const handleAllSelectToggle = useCallback(() => {
    if (isAllSelected) {
      dispatch(createAction(CART_ACTION_TYPE.DESELECT_ALL_CART_ITEMS));
      return;
    }
    dispatch(createAction(CART_ACTION_TYPE.SELECT_ALL_CART_ITEMS));
  }, [isAllSelected, dispatch]);

  const handleCheck = useCallback(
    (cartItemId) => (e) => {
      const { checked } = e.target;
      if (checked) {
        dispatch(
          createAction(CART_ACTION_TYPE.SELECT_CART_ITEM, { cartItemId })
        );
        return;
      }
      dispatch(
        createAction(CART_ACTION_TYPE.DESELECT_CART_ITEM, { cartItemId })
      );
    },
    [dispatch]
  );

  const handleQuantityChange = useCallback(
    (cartItemId) => (quantity) => {
      dispatch(updateCartItemQuantity({ cartItemId, quantity }));
    },
    [dispatch]
  );

  const handleDeleteProduct = useCallback(
    (cartItemId) => () => {
      dispatch(deleteCartItems({ cartItemIds: [cartItemId] }));
    },
    [dispatch]
  );

  const handleDeleteSelectedProducts = useCallback(() => {
    dispatch(deleteCartItems({ cartItemIds: selectedCartItemIds }));
  }, [dispatch, selectedCartItemIds]);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  if (isLoading) return <div>...loading</div>;

  return (
    <div className={className}>
      <div className="flex justify-between mb-26">
        <LabeledCheckbox
          id="all-select"
          label={isAllSelected ? "선택해제" : "전체선택"}
          onChange={handleAllSelectToggle}
          checked={isAllSelected}
        />
        <Button onClick={handleDeleteSelectedProducts}>상품삭제</Button>
      </div>
      <div>
        <div className="mb-16">{`상품 리스트 (${cart.length}개)`}</div>
        <table className={styles.table}>
          <tbody>
            {cart.map((cartItem) => {
              const isSelected = selectedCartItemIds.indexOf(cartItem.id) > -1;
              return (
                <tr key={cartItem.id}>
                  <td>
                    <CartItem
                      {...cartItem}
                      checked={isSelected}
                      onChecked={handleCheck(cartItem.id)}
                      onQuantityChange={handleQuantityChange(cartItem.id)}
                      onDelete={handleDeleteProduct(cartItem.id)}
                      quantity={cartItem.quantity}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CartForm;
