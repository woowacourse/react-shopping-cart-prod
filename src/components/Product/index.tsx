import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import routes from '@/routes';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addItemAPI } from '@/redux/modules/cart/cartThunk';
import { show } from '@/redux/modules/snackBar';

import {
  CartImageBadge,
  CartImageWrapper,
  ProductContainer,
  ProductImageWrapper,
  ProductInfo,
  ProductInfoContainer,
} from './styles';

import { ProductType } from '@/types';

import { INFO_MESSAGES } from '@/constants';
import cart from '@/assets/cart.svg';

interface ProductProps {
  productInfo: ProductType;
}

function Product({ productInfo: { cartId, id, imageUrl, name, price } }: ProductProps) {
  const { isLoggedIn } = useSelector((state: RootState) => state.customer);
  const [isInCart, setInCart] = useState(cartId !== null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickCartImage = () => {
    if (isInCart) return;

    if (!isLoggedIn) {
      navigate(routes.login);

      return;
    }

    const newItem = { id, imageUrl, name, price };

    dispatch(addItemAPI({ ...newItem, isSelected: true }));
    dispatch(show(INFO_MESSAGES.ADDED_TO_CART));

    setInCart(true);
  };

  return (
    <ProductContainer>
      <ProductImageWrapper>
        <img onClick={() => navigate(routes.productDetail(id))} src={imageUrl} alt={name} />
      </ProductImageWrapper>
      <ProductInfoContainer>
        <ProductInfo onClick={() => navigate(routes.productDetail(id))}>
          <span>{name}</span>
          <span>{price.toLocaleString()}원</span>
        </ProductInfo>
        <CartImageWrapper isInCart={isInCart}>
          {isInCart && <CartImageBadge />}
          <img onClick={onClickCartImage} src={cart} alt="장바구니" />
        </CartImageWrapper>
      </ProductInfoContainer>
    </ProductContainer>
  );
}

export default Product;
