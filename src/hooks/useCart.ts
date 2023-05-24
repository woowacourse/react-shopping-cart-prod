import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MESSAGE } from '../constants';
import { $CartIdList, $CheckedCartIdList, $CurrentServerUrl } from '../recoil/atom';
import useGetQuery from './useGetQuery';
import useMutation from './useMutation';
import useToast from './useToast';
import type { CartItem } from '../types';

const useCart = () => {
  const Toast = useToast();
  const [cartIdList, setCartIdList] = useRecoilState($CartIdList);
  const setCheckedCartIdList = useSetRecoilState($CheckedCartIdList);
  const currentServerUrl = useRecoilValue($CurrentServerUrl);

  const {
    data: cartItemStateList,
    refreshQuery,
    loading,
  } = useGetQuery<CartItem[]>(`${currentServerUrl}/cart-items`, {
    Authorization: `Basic ${btoa('a@a.com:1234')}`,
  });

  const addCartQuery = useMutation<Record<string, number>, CartItem>({
    onSuccess: data => {
      const regex = /[^0-9]/g;
      const cartId = data?.headers.get('Location')?.replace(regex, '');

      setCartIdList(prev => [...prev, Number(cartId)]);
      setCheckedCartIdList(prev => [...prev, Number(cartId)]);

      Toast.success(MESSAGE.ADD_CART_SUCCESSFUL);
      refreshQuery();
    },
    onFailure: () => {
      Toast.error(MESSAGE.ADD_CART_FAILED);
    },
  });

  const deleteCartQuery = useMutation<Record<string, number>, CartItem>({
    onSuccess: data => {
      const regex = /(\d+)$/;
      const cartId = data?.fetchInformation.url.match(regex)?.at(1);

      setCartIdList(prev => prev.filter(item => item !== Number(cartId)));
      setCheckedCartIdList(prev => prev.filter(item => item !== Number(cartId)));

      Toast.success(MESSAGE.DELETE_CART_SUCCESSFUL);
      refreshQuery();
    },
    onFailure: () => {
      Toast.error(MESSAGE.DELETE_CART_FAILED);
    },
  });

  const mutateQuantityQuery = useMutation<Record<string, number>, CartItem>({
    onSuccess: () => {
      refreshQuery();
    },
    onFailure: () => {
      Toast.error(MESSAGE.MUTATE_CART_FAILED);
    },
  });

  const mutateQuantity = async (cartId: number, quantity: number) => {
    await mutateQuantityQuery({
      url: `${currentServerUrl}/cart-items/${cartId}`,
      method: 'PATCH',
      bodyData: { quantity },
      headers: {
        Authorization: `Basic ${btoa('a@a.com:1234')}`,
        'Content-Type': 'application/json',
      },
    });
  };

  const deleteCartItem = async (cartId: number) => {
    await deleteCartQuery({
      url: `${currentServerUrl}/cart-items/${cartId}`,
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${btoa('a@a.com:1234')}`,
      },
    });
  };

  const addCartItem = async (productId: number) => {
    await addCartQuery({
      url: `${currentServerUrl}/cart-items`,
      method: 'POST',
      bodyData: { productId },
      headers: {
        Authorization: `Basic ${btoa('a@a.com:1234')}`,
        'Content-Type': 'application/json',
      },
    });
  };

  return {
    cartIdList,
    cartItemStateList,
    mutateQuantity,
    deleteCartItem,
    addCartItem,
    refreshQuery,
    loading,
  };
};

export default useCart;
