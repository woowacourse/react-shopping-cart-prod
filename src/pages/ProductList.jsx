import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from 'components/ProductItem';
import Layout from 'components/Layout';
import EmptyProductItem from 'components/EmptyProductItem';
import SkeletonProductItems from 'components/SkeletonProductItems';

import { v4 as uuidv4 } from 'uuid';
import { getProductList } from 'actions/products';

import * as Styled from './styles';

const ProductList = () => {
  const { items: productList, errorMessage, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  return (
    <Layout>
      <Styled.ProductListContainer>
        {errorMessage && <h1>{errorMessage}</h1>}
        {isLoading && <SkeletonProductItems />}
        {isLoading || productList ? (
          productList.map(({ id, name, price, thumbnail }) => (
            <ProductItem key={uuidv4()} id={id} thumbnail={thumbnail} name={name} price={price} />
          ))
        ) : (
          <EmptyProductItem />
        )}
      </Styled.ProductListContainer>
    </Layout>
  );
};

export default ProductList;
