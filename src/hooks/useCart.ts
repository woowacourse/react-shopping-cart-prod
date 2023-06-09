import { useCallback, useMemo } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import { getCartAPI } from '../api/cartAPI';
import { getOrderAPI } from '../api/orderAPI';
import type HTTPError from '../api/utils/HTTPError';
import {
  CART_API_ERROR_MESSAGE,
  HTTP_STATUS_CODE,
  ORDER_API_ERROR_MESSAGE,
} from '../constants/api';
import { PATH } from '../constants/path';
import { cartItemQuantityState, cartListCheckoutCostsState, cartListState } from '../store/cart';
import { checkedCartIdListState } from '../store/cartCheckbox';
import { errorModalMessageState } from '../store/error';
import { currentMemberInformationState } from '../store/member';
import { orderListState } from '../store/order';
import { currentServerState } from '../store/server';
import type { APIErrorMessage } from '../types/api';
import type { CartItemData } from '../types/cart';
import type { OrderCartItemsData } from '../types/order';
import type { ProductItemData } from '../types/product';
import { useLoadWithSetFetchData } from './common/useLoadWithSetFetchData';
import { useNavigateSearchParams } from './common/useNavigateSearchParams';
import { useToast } from './common/useToast';

const useCart = () => {
  const currentServer = useRecoilValue(currentServerState);
  const cartAPI = useMemo(() => getCartAPI(currentServer), [currentServer]);
  const setErrorModalMessage = useSetRecoilState(errorModalMessageState);
  const { isToastAdded, setIsToastAdded } = useToast();
  const navigate = useNavigateSearchParams();

  const refreshCart = useRecoilCallback(
    ({ set, reset }) =>
      async () => {
        const newCartList = await cartAPI.getCartList();
        set(cartListState, newCartList);
        reset(checkedCartIdListState);
      },
    [cartAPI]
  );

  const updateCart = useRecoilCallback(
    ({ set }) =>
      (cartItem: CartItemData) => {
        set(cartListState, (prevCartList) => [...prevCartList, cartItem]);
      },
    [cartAPI]
  );

  const handleCartError = useCallback(
    (error: HTTPError, errorMessage: APIErrorMessage) => {
      if (error.statusCode === HTTP_STATUS_CODE.BAD_REQUEST) {
        setErrorModalMessage(errorMessage[error.statusCode] ?? error.message);
      }

      if (error.statusCode === HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
        setErrorModalMessage(errorMessage[error.statusCode] ?? error.message);
      }
    },
    [setErrorModalMessage]
  );

  const { setData: addItem } = useLoadWithSetFetchData<CartItemData, ProductItemData>(
    useRecoilCallback(
      () => async (product) => {
        const response = await cartAPI.postCartItem(product.id);
        const cartItemId = response.headers.get('Location')?.split('/').pop();

        return { id: Number(cartItemId), quantity: 1, product };
      },
      [cartAPI]
    ),
    {
      onSuccess: (cartItem) => {
        setIsToastAdded(true);
        updateCart(cartItem);
      },
      onError: (error) => {
        handleCartError(error, CART_API_ERROR_MESSAGE.ADD);
      },
    }
  );

  const { setData: updateItemQuantity } = useLoadWithSetFetchData<
    void,
    { cartItemId: number; quantity: number }
  >(
    useRecoilCallback(
      ({ set }) =>
        async ({ cartItemId, quantity }) => {
          set(cartItemQuantityState(cartItemId), quantity);
          await cartAPI.patchCartItem(cartItemId, quantity);
        },
      [cartAPI]
    ),
    {
      onError: (error) => {
        handleCartError(error, CART_API_ERROR_MESSAGE.UPDATE);
      },
    }
  );

  const { setData: removeItem } = useLoadWithSetFetchData<void, number>(
    useCallback(
      async (cartItemId) => {
        await cartAPI.deleteCartItem(cartItemId);
      },
      [cartAPI]
    ),
    {
      onSuccess: () => {
        refreshCart();
      },
      onError: (error) => {
        handleCartError(error, CART_API_ERROR_MESSAGE.DELETE);
      },
    }
  );

  const { setData: removeCheckedItems } = useLoadWithSetFetchData<void, number[]>(
    useCallback(
      async (cartItemIds) => {
        await Promise.all(cartItemIds.map((cartItemId) => cartAPI.deleteCartItem(cartItemId)));
      },
      [cartAPI]
    ),
    {
      onSuccess: () => {
        refreshCart();
      },
      onError: (error) => {
        handleCartError(error, CART_API_ERROR_MESSAGE.DELETE);
      },
    }
  );

  const { setData: orderCheckedItems } = useLoadWithSetFetchData<string, number[]>(
    useRecoilCallback(
      ({ snapshot }) =>
        async (cartItemIds) => {
          const cartListCheckoutCosts = await snapshot.getPromise(cartListCheckoutCostsState);

          const orderCartItemsData: OrderCartItemsData = {
            cartItemIds: [...cartItemIds],
            ...cartListCheckoutCosts,
          };

          const orderAPI = getOrderAPI(currentServer);
          const response = await orderAPI.postOrder(orderCartItemsData);
          const orderId = response.headers.get('Location')?.split('/').pop()!;

          return orderId;
        },
      [currentServer]
    ),
    {
      onSuccess: useRecoilCallback(
        ({ refresh }) =>
          async (orderId) => {
            navigate(PATH.ORDER_SUCCESS, { orderId });
            await refreshCart();
            refresh(currentMemberInformationState);
            refresh(orderListState);
          },
        [refreshCart, navigate]
      ),
      onError: (error) => {
        handleCartError(error, ORDER_API_ERROR_MESSAGE.ADD);
      },
    }
  );

  return {
    isToastAdded,
    addItem,
    updateItemQuantity,
    removeItem,
    removeCheckedItems,
    orderCheckedItems,
  };
};

export { useCart };
