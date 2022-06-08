import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'redux/actions';
import { Product, StoreState } from 'types';

type SelectedState = StoreState['productDetailState'];

const useProductDetail = (id: Product['id']) => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector<StoreState, StoreState['customerState']>(
    ({ customerState }) => customerState
  );
  const { isLoading, error, productDetail, isAddedToCart } = useSelector<
    StoreState,
    SelectedState
  >(({ productDetailState }) => productDetailState);

  const addItemToCart = () => {
    dispatch(actions.addItemToCart(id, 1));
  };

  useEffect(() => {
    if (id) {
      dispatch(actions.getProductDetail(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (accessToken && productDetail) {
      dispatch(actions.checkIsProductAddedToCart(id));
    }
  }, [accessToken, id, productDetail, dispatch]);

  return {
    accessToken,
    isLoading,
    productDetail,
    isAddedToCart,
    error,
    addItemToCart,
  };
};

export default useProductDetail;
