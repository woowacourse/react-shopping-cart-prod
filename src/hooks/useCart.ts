import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MESSAGE } from '../constants';
import { $CartList, $CheckedCartIdList, $CurrentServerUrl } from '../recoil/atom';
import useMutation from './useMutation';
import useToast from './useToast';
import type { CartItem, Product } from '../types';

const useCart = () => {
  const Toast = useToast();
  const currentServerUrl = useRecoilValue($CurrentServerUrl);
  const [cartList, setCartList] = useRecoilState($CartList(currentServerUrl));
  const setCheckedCartIdList = useSetRecoilState($CheckedCartIdList(currentServerUrl));

  const { mutateQuery: addCartQuery, loading: loadingAddState } = useMutation<Record<string, number>, CartItem>({
    onSuccess: data => {
      const regex = /[^0-9]/g;
      const cartId = data?.headers.get('Location')?.replace(regex, '');
      const product = data?.fetchInformation.referenceData as Product;

      if (cartId && product) {
        setCartList(prev => [...prev, { id: Number(cartId), quantity: 1, product }]);
      }

      setCheckedCartIdList(prev => [...prev, Number(cartId)]);

      Toast.success(MESSAGE.ADD_CART_SUCCESSFUL);
    },
    onFailure: () => {
      Toast.error(MESSAGE.ADD_CART_FAILED);
    },
  });

  const { mutateQuery: deleteCartQuery, loading: loadingDeleteState } = useMutation<Record<string, number>, CartItem>({
    onSuccess: data => {
      const regex = /(\d+)$/;
      const cartId = data?.fetchInformation.url.match(regex)?.at(1);

      setCartList(prev => prev.filter(({ id }) => id !== Number(cartId)));
      setCheckedCartIdList(prev => prev.filter(item => item !== Number(cartId)));

      Toast.success(MESSAGE.DELETE_CART_SUCCESSFUL);
    },
    onFailure: () => {
      Toast.error(MESSAGE.DELETE_CART_FAILED);
    },
  });

  const { mutateQuery: mutateQuantityQuery, loading: loadingQuantityState } = useMutation<
    Record<string, number>,
    CartItem
  >({
    onSuccess: data => {
      const regex = /(\d+)$/;
      const cartId = data?.fetchInformation.url.match(regex)?.at(1);
      const quantity = data?.fetchInformation?.bodyData?.quantity;

      if (cartId && quantity) {
        setCartList(prev => prev.map(item => (item.id === Number(cartId) ? { ...item, quantity } : item)));
      }
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
    });
  };

  const deleteCartItem = async (cartId: number) => {
    await deleteCartQuery({
      url: `${currentServerUrl}/cart-items/${cartId}`,
      method: 'DELETE',
    });
  };

  const addCartItem = async (product: Product) => {
    await addCartQuery({
      url: `${currentServerUrl}/cart-items`,
      method: 'POST',
      bodyData: { productId: product.id },
      referenceData: product,
    });
  };

  const loading = loadingAddState || loadingDeleteState || loadingQuantityState;

  return {
    cartList,
    mutateQuantity,
    deleteCartItem,
    addCartItem,
    loading,
  };
};

export default useCart;
