import { base64 } from '../service/apiURL';
import { checkCartListState, serverState } from '../service/atom';
import { CartItemType } from '../types/types';
import { useMutation, useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

export const useCartFetch = () => {
  const serverURL = useRecoilValue(serverState);
  const [checkCartList, setCheckCartList] = useRecoilState(checkCartListState);

  const calcTotalPrice = () => {
    return checkCartList.reduce((prev, curr) => {
      const cartItem = cartData && cartData.find((cart) => cart.id === curr);
      if (cartItem) {
        const { product, quantity } = cartItem;
        return prev + product.price * quantity;
      }
      return prev + 0;
    }, 0);
  };

  const fetchCartData = async () => {
    const res = await fetch(`${serverURL}/cart-items`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  };

  const {
    data: cartData,
    refetch,
    isFetching,
    isLoading,
  } = useQuery<CartItemType[]>('cart', fetchCartData, {
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
    async ({ body }: { body?: object }) => {
      const res = await fetch(`${serverURL}/cart-items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64}`,
        },
        body: JSON.stringify(body),
      });
      return res;
    },
    {
      onSuccess: async (res) => {
        const cartId = Number(res.headers.get('Location')?.split('/')[2]);
        if (cartId) {
          setCheckCartList((prev) => [...prev, cartId]);
        }
        refetch();
      },
      onError: (e) => {
        console.log(e);
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
    calcTotalPrice: calcTotalPrice(),
    isFetching,
    isLoading,
  };
};
