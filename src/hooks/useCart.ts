import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { API_URL, MESSAGE, USER } from 'src/constants';
import { $CartList, $CheckedCartIdList, $CurrentServerUrl } from 'src/recoil/atom';
import useMutation from './useMutation';
import useToast from './useToast';
import type { CartItem, Product } from 'src/types';

const useCart = () => {
  const Toast = useToast();
  const currentServerUrl = useRecoilValue($CurrentServerUrl);
  const [cartList, setCartList] = useRecoilState($CartList(currentServerUrl));
  const setCheckedCartIdList = useSetRecoilState($CheckedCartIdList(currentServerUrl));

  const { mutateQuery: addCartQuery, isLoading: addLoading } = useMutation<Record<string, number>, CartItem>({
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
    onFailure: message => {
      Toast.error(message ?? MESSAGE.ADD_CART_FAILED);
    },
  });

  const { mutateQuery: deleteCartQuery, isLoading: deleteLoading } = useMutation<Record<string, number>, CartItem>({
    onSuccess: data => {
      const regex = /(\d+)$/;
      const cartId = data?.fetchInformation.url.match(regex)?.at(1);

      setCartList(prev => prev.filter(({ id }) => id !== Number(cartId)));
      setCheckedCartIdList(prev => prev.filter(item => item !== Number(cartId)));

      Toast.success(MESSAGE.DELETE_CART_SUCCESSFUL);
    },
    onFailure: message => {
      Toast.error(message ?? MESSAGE.DELETE_CART_FAILED);
    },
  });

  const { mutateQuery: mutateQuantityQuery, isLoading: mutateLoading } = useMutation<Record<string, number>, CartItem>({
    onSuccess: data => {
      const regex = /(\d+)$/;
      const cartId = data?.fetchInformation.url.match(regex)?.at(1);
      const quantity = data?.fetchInformation?.bodyData?.quantity;

      if (cartId && quantity) {
        setCartList(prev => prev.map(item => (item.id === Number(cartId) ? { ...item, quantity } : item)));
      }
    },
    onFailure: message => {
      Toast.error(message ?? MESSAGE.MUTATE_CART_FAILED);
    },
  });

  const mutateQuantity = async (cartId: number, quantity: number) => {
    await mutateQuantityQuery({
      url: `${currentServerUrl}${API_URL.CART_ITEM(`${cartId}`)}`,
      method: 'PATCH',
      bodyData: { quantity },
      headers: {
        Authorization: `Basic ${btoa(USER)}`,
        'Content-Type': 'application/json',
      },
    });
  };

  const deleteCartItem = async (cartId: number) => {
    await deleteCartQuery({
      url: `${currentServerUrl}${API_URL.CART_ITEM(`${cartId}`)}`,
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${btoa(USER)}`,
        'Content-Type': 'application/json',
      },
    });
  };

  const addCartItem = async (product: Product) => {
    await addCartQuery({
      url: `${currentServerUrl}${API_URL.CART}`,
      method: 'POST',
      bodyData: { productId: product.id },
      headers: {
        Authorization: `Basic ${btoa(USER)}`,
        'Content-Type': 'application/json',
      },
      referenceData: product,
    });
  };

  const loading = addLoading || deleteLoading || mutateLoading;

  return {
    cartList,
    mutateQuantity,
    deleteCartItem,
    addCartItem,
    loading,
  };
};

export default useCart;
