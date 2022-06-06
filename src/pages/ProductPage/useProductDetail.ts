import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'types';

import { actions } from 'redux/actions';

type SelectedState = StoreState['productDetailState'];

const useProductDetail = (id: string) => {
  const dispatch = useDispatch();
  const { isLoading, error, productDetail } = useSelector<
    StoreState,
    SelectedState
  >(({ productDetailState }) => ({
    isLoading: productDetailState.isLoading,
    productDetail: productDetailState.productDetail,
    error: productDetailState.error,
  }));

  const addItemToCart = () => {
    dispatch(actions.addItemToCart(id, 1));
  };

  useEffect(() => {
    if (id) {
      dispatch(actions.getProductDetail(id));
    }
  }, [id, dispatch]);

  return {
    isLoading,
    productDetail,
    error,
    addItemToCart,
  };
};

export default useProductDetail;
