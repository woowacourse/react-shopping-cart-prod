import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { loadProductsAPI } from '@/redux/modules/product/productThunk';

import { ProductListContainer } from './styles';

import { ProductState } from '@/types';

import { Loader } from '@/components/@shared';
import Product from '@/components/Product';

function ProductList() {
  const { productList, loading, error }: ProductState = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsAPI());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <ProductListContainer>
      {productList.map((product) => (
        <Product key={product.id} productInfo={product} />
      ))}
    </ProductListContainer>
  );
}

export default ProductList;
