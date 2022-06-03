import React from 'react';
import { Link } from 'react-router-dom';

import ProductQuantity from 'components/ProductQuantity';

import Wrapper from './style';

import { PATH } from 'constants';

const Product = ({ id, imgSrc, title, price, cartQuantity }) => {
  return (
    <Wrapper>
      <Link to={`${PATH.PRODUCT}/${id}`}>
        <img className="thumbnail" src={imgSrc} alt={`${title} 상품`} />
      </Link>
      <ProductQuantity
        productId={id}
        productTitle={title}
        cartQuantity={cartQuantity}
      >
        <div className="product-rest-info">
          <Link to={`/product/${id}`}>
            <p className="title">{title}</p>
          </Link>
          <p className="price">{price.toLocaleString()}</p>
        </div>
      </ProductQuantity>
    </Wrapper>
  );
};

export default Product;
