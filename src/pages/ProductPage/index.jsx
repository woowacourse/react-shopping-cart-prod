import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProductQuantity from 'components/ProductQuantity';

import Skeleton from 'skeletons/ProductDetailSkeleton';

import Wrapper from './style';

import { getProduct } from 'reducers/product';
import { getCarts } from 'reducers/carts';

const ProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { loading: productLoading, data: product } = useSelector(
    (state) => state.product,
  );
  const cartLoading = useSelector((state) => state.carts.loading);
  const cart = useSelector((state) =>
    state.carts.data.find((cart) => cart.productId === Number(productId)),
  );

  useEffect(() => {
    dispatch(getProduct(productId));
    dispatch(getCarts());
  }, [dispatch, productId]);

  if (productLoading || cartLoading) return <Skeleton />;

  return (
    <Wrapper>
      <div className="product-wrapper">
        <img src={product.imageUrl} alt={`${product.name}상품`} />
        <div className="top">
          <ProductQuantity
            productId={productId}
            productTitle={product.name}
            cartQuantity={cart ? cart.quantity : 0}
          >
            <p className="title">{product.name}</p>
          </ProductQuantity>
        </div>
        <div className="bottom flex-row-space-between">
          <p>가격</p>
          <p>{product.price}</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductPage;
