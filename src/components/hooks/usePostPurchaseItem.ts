import { useRecoilValue } from 'recoil';
import { cartBillTotalPriceState, cartState, checkedListState } from '../../atom/cart';
import { couponState } from '../../atom/coupon';
import { useState } from 'react';
import { ServerNameType } from '../../types';
import useToast from './useToast';
import * as api from '../../api';
import { API_ERROR_MESSAGE, API_SUCCESS_MESSAGE } from '../../constants';

export const usePostPurchaseItem = () => {
  const cart = useRecoilValue(cartState);
  const checkedList = useRecoilValue(checkedListState);
  const coupons = useRecoilValue(couponState);
  const [selectedCoupon, setSelectedCoupon] = useState(0);
  const { showToast } = useToast();

  const deliveryFee = checkedList.filter((checked) => checked).length === 0 ? 0 : 3000;
  const cartBillTotalPrice = useRecoilValue(cartBillTotalPriceState);
  const couponDiscountPrice =
    ((cartBillTotalPrice + deliveryFee) *
      coupons.filter((coupon) => coupon.id === selectedCoupon)[0]?.discountRate) /
      100 || 0;

  const postPurchaseItemThroughApi = async (
    serverName: ServerNameType,
    loginCredential: string,
    couponKind: FormDataEntryValue | null
  ) => {
    const purchasingCartItems = checkedList
      .map(
        (checked, idx) =>
          checked && { productId: cart[idx].product.id, quantity: cart[idx].quantity }
      )
      .filter(
        (cartItem): cartItem is { productId: number; quantity: number } =>
          typeof cartItem !== 'boolean'
      );

    const couponId = couponKind !== 'null' ? Number(couponKind) : null;

    await api
      .postPurchaseCartItem(serverName, loginCredential, purchasingCartItems, couponId)
      .then(() => {
        showToast('info', API_SUCCESS_MESSAGE.purchase);
      })
      .catch((e: Error) => {
        if (e.name !== 'Error') {
          showToast('error', API_ERROR_MESSAGE.postPurchaseCartItem);
          return;
        }

        return showToast('error', e.message);
      });
  };

  return {
    postPurchaseItemThroughApi,
    setSelectedCoupon,
    couponDiscountPrice,
    deliveryFee,
    cartBillTotalPrice,
    coupons,
  };
};
