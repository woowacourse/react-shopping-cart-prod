import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Product from 'components/Product';
import Pagination from 'components/Pagination';

import Skeleton from 'skeletons/ProductSkeleton';

import Wrapper from './style';

import { getProducts } from 'reducers/products';
import { getCarts } from 'reducers/carts';

import { PAGING, PATH } from 'constants';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const {
    loading: productLoading,
    data: products,
    totalCount,
  } = useSelector((state) => state.products);
  const { loading: cartLoading, data: carts } = useSelector(
    (state) => state.carts,
  );
  const accessToken = useSelector((state) => state.user.accessToken);
  const page = Number(useParams().page) || 1;

  useEffect(() => {
    dispatch(getProducts(page));
  }, [dispatch, page]);

  useEffect(() => {
    accessToken && dispatch(getCarts());
  }, [dispatch]);

  if (productLoading || (accessToken && cartLoading)) {
    return <Skeleton />;
  }

  return (
    <Wrapper>
      <div className="body">
        {products?.map((product) => {
          const cart = carts.find(({ productId }) => productId === product.id);

          return (
            <Product
              key={product.id}
              {...product}
              cartQuantity={cart ? cart.quantity : 0}
            />
          );
        })}
      </div>
      <div className="footer">
        <Pagination
          endPoint={PATH.PRODUCTS}
          totalCount={totalCount}
          currentPage={page}
          viewCount={PAGING.VIEW_COUNT}
        />
      </div>
    </Wrapper>
  );
};

export default ProductsPage;
