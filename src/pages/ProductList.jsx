import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from 'components/ProductItem';
import Layout from 'components/Layout';
import EmptyProductItem from 'components/EmptyProductItem';
import SkeletonProductItems from 'components/SkeletonProductItems';

import { getProductList } from 'actions/products';

import * as Styled from './styles';

const ProductList = () => {
  const { items: productList, errorMessage, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productList.length === 0) dispatch(getProductList());
  }, [dispatch, productList.length]);

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  return (
    <Layout>
      <Styled.ProductListContainer>
        {isLoading && <SkeletonProductItems />}
        {isLoading || productList ? (
          productList.map(({ id, name, price, thumbnail }) => (
            <ProductItem key={id} id={id} thumbnail={thumbnail} name={name} price={price} />
          ))
        ) : (
          <EmptyProductItem />
        )}
      </Styled.ProductListContainer>
    </Layout>
  );
};

export default ProductList;
