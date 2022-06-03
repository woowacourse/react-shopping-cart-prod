import useFetch from 'hooks/useFetch';
import useCart from 'hooks/useCart';
import useAuth from 'hooks/useAuth';
import { METHOD } from 'constants';
import { useEffect } from 'react';

const useProductListPage = () => {
  const { checkIsAuthenticated } = useAuth();
  const {
    isLoading,
    isError,
    data: products,
    fetchApi,
  } = useFetch({
    method: METHOD.GET,
    url: '/products',
  });

  const { cartItems, deleteItem, addItem } = useCart();

  const isEmpty = products && !isLoading && products.length === 0;

  const includedInCart = (id) =>
    cartItems && cartItems?.findIndex((item) => item.id === id) !== -1;

  const handleClickCartButton = (id) => (e) => {
    e.stopPropagation();
    if (includedInCart(id)) {
      deleteItem(id);
      return;
    }
    addItem(id);
  };

  useEffect(() => {
    fetchApi();
    checkIsAuthenticated();
  }, []);

  return {
    isLoading,
    isError,
    products,
    isEmpty,
    includedInCart,
    handleClickCartButton,
  };
};

export default useProductListPage;
