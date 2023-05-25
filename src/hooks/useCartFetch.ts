import { base64 } from '../service/apiURL';
import { serverState } from '../service/atom';
import { CartItemType } from '../types/types';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

export const useCartFetch = () => {
  const serverURL = useRecoilValue(serverState);

  const fetchCartData = async () => {
    const res = await fetch(`${serverURL}/cart-items`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });
    const data = await res.json();
    return data;
  };

  const { data: cartData, refetch } = useQuery<CartItemType[]>('cart', fetchCartData, {
    onError: (e) => {
      console.log(e);
    },
  });

  const mutateCartData = useMutation(
    async ({
      method,
      cartId,
      body,
    }: {
      method: 'DELETE' | 'PATCH';
      cartId: number;
      body?: object;
    }) =>
      await fetch(`${serverURL}/cart-items/${cartId}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64}`,
        },
        body: JSON.stringify(body),
      }),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const fetchAddCartItem = useMutation(
    async ({ body }: { body?: object }) =>
      await fetch(`${serverURL}/cart-items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64}`,
        },
        body: JSON.stringify(body),
      }),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const addCartItemAPI = (body?: object) => {
    fetchAddCartItem.mutate({ body });
  };

  const changeCartQuantityAPI = (cartId: number, body?: object) =>
    mutateCartData.mutate({ method: 'PATCH', cartId, body });

  const deleteCartItemAPI = (cartId: number) => mutateCartData.mutate({ method: 'DELETE', cartId });

  return {
    cartData,
    addCartItemAPI,
    changeCartQuantityAPI,
    deleteCartItemAPI,
  };
};
