import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import routes from '@/routes';

import { useDispatch } from 'react-redux';
import { addItem, decrement, deleteItem, increment } from '@/redux/modules/cart/cartAction';
import { show } from '@/redux/modules/snackBar';

import { useCartItemSelector, useCartListSelector } from '@/hooks/useCartSelector';

import {
  CartCounter,
  CartImageBadge,
  CartImageWrapper,
  ProductContainer,
  ProductImageWrapper,
  ProductInfo,
  ProductInfoContainer,
} from './styles';

import { ProductType } from '@/types';

import { INFO_MESSAGES, CART, PRODUCT } from '@/constants';
import cart from '@/assets/cart.svg';

interface ProductProps {
  productInfo: ProductType;
}

function Product({ productInfo: { id, imageUrl, name, price } }: ProductProps) {
  const [isShowCartCounter, setIsShowCartCounter] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItemList = useCartListSelector();
  const cartItem = useCartItemSelector(id);
  const timeout = useRef<NodeJS.Timeout>();

  const onClickCartImage = () => {
    setIsShowCartCounter((prev) => !prev);

    if (!cartItemList.some((item) => item.id === id)) {
      const newItem = { id, imageUrl, name, price, quantity: 1, isSelected: false };

      dispatch(addItem(newItem));
      dispatch(show(INFO_MESSAGES.ADDED_TO_CART));
    }
  };

  const onClickDecreaseCounter = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    if (cartItem?.quantity === PRODUCT.MIN_COUNT) {
      dispatch(deleteItem(id));
      setIsShowCartCounter(false);
      dispatch(show(INFO_MESSAGES.DELETED_FROM_CART));

      return;
    }

    dispatch(decrement(id));
  };

  const onClickIncreaseCounter = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    if (cartItem) {
      dispatch(increment(id));

      return;
    }

    dispatch(addItem({ name, price, imageUrl, id, quantity: 1, isSelected: false }));
  };

  useEffect(() => {
    if (isShowCartCounter) {
      timeout.current = setTimeout(() => {
        setIsShowCartCounter(false);
      }, CART.COUNTER_DISPLAY_TIME);
    }
  }, [isShowCartCounter, cartItem?.quantity]);

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
        <CartImageWrapper>
          {cartItem?.quantity && <CartImageBadge />}
          <img onClick={onClickCartImage} src={cart} alt="장바구니" />
        </CartImageWrapper>
        <CartCounter isShowCartCounter={isShowCartCounter}>
          <button onClick={onClickDecreaseCounter}>-</button>
          <span>{cartItem?.quantity ?? 0}</span>
          <button onClick={onClickIncreaseCounter}>+</button>
        </CartCounter>
      </ProductInfoContainer>
    </ProductContainer>
  );
}

export default Product;
