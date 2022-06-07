import useFetch from 'hooks/useFetch';
import useCart from 'hooks/useCart';
import { useParams } from 'react-router-dom';
import { METHOD, PATH_NAME } from 'constants';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useProductPage = () => {
  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: product,
    fetchApi,
  } = useFetch({
    method: METHOD.GET,
    url: `/api/products/${id}`,
  });
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { authenticated } = useSelector((state) => state.user);

  const handleAddCartItem = () => {
    if (!authenticated) {
      navigate(PATH_NAME.LOGIN);
      return;
    }
    addItem(id);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return { isLoading, isError, product, handleAddCartItem };
};

export default useProductPage;
