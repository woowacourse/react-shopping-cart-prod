import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'redux/actions';
import { StoreState } from 'types';

type SelectedState = Pick<
  StoreState['productsState'],
  'isLoading' | 'productList' | 'error'
>;

const useProductList = () => {
  const dispatch = useDispatch();
  const { isLoading, productList, error } = useSelector<
    StoreState,
    SelectedState
  >(({ productsState }) => ({
    isLoading: productsState.isLoading,
    productList: productsState.productList,
    error: productsState.error,
  }));
  const avaliableList = productList.filter((product) => product.stock > 0);
  const outOfStockList = productList.filter((product) => product.stock <= 0);

  useEffect(() => {
    dispatch(actions.getProductList());
  }, [dispatch]);

  return {
    isLoading,
    productList: [...avaliableList, ...outOfStockList],
    error,
  };
};

export default useProductList;
