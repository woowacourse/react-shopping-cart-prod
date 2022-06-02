import useFetch from 'hooks/useFetch';
import useCart from 'hooks/useCart';
import useAuth from 'hooks/useAuth';
import { useParams } from 'react-router-dom';
import { METHOD } from 'constants';
import { useEffect } from 'react';

const useProductPage = () => {
  const { checkIsAuthenticated } = useAuth();
  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: product,
    fetchApi,
  } = useFetch({
    method: METHOD.GET,
    url: `/products/${id}`,
  });
  const { addItem } = useCart();

  const handleClickCartButton = () => {
    addItem(id);
  };

  useEffect(() => {
    fetchApi();
    checkIsAuthenticated();
  }, []);

  return { isLoading, isError, product, handleClickCartButton };
};

export default useProductPage;
