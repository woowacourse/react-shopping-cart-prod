import React from 'react';
import { Link } from 'react-router-dom';

import ProductQuantity from 'components/ProductQuantity';

import Wrapper from './style';

import { PATH } from 'constants';

const Product = ({ id, imageUrl, name, price, cartQuantity }) => {
  return (
    <Wrapper>
      <Link to={`${PATH.PRODUCT}/${id}`}>
        <img className="thumbnail" src={imageUrl} alt={`${name} 상품`} />
      </Link>
      <ProductQuantity
        productId={id}
        productTitle={name}
        cartQuantity={cartQuantity}
      >
        <div className="product-rest-info">
          <Link to={`/product/${id}`}>
            <p className="title">{name}</p>
          </Link>
          <p className="price">{price.toLocaleString()}</p>
        </div>
      </ProductQuantity>
    </Wrapper>
  );
};

export default Product;
