import useFetch from 'hooks/useFetch';
import useCart from 'hooks/useCart';
import { useParams } from 'react-router-dom';
import { METHOD, PATH_NAME } from 'constants';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSnackBar from 'hooks/useSnackBar';

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
  const { addItem, cartItems, getItems } = useCart();
  const { showErrorSnackBar } = useSnackBar();
  const navigate = useNavigate();
  const { authenticated } = useSelector((state) => state.user);

  const includedInCart = (id) =>
    cartItems && cartItems?.findIndex((item) => item.productId === +id) !== -1;

  const handleAddCartItem = () => {
    if (includedInCart(id)) {
      showErrorSnackBar('이미 장바구니에 추가된 상품입니다.');
      return;
    }
    if (!authenticated) {
      navigate(PATH_NAME.LOGIN);
      return;
    }
    addItem(id);
  };

  useEffect(() => {
    fetchApi();
    if (!cartItems) {
      getItems();
    }
  }, []);

  return { isLoading, isError, product, handleAddCartItem };
};

export default useProductPage;
