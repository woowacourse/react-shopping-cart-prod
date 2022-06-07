import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from 'routes';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, decrement, deleteItem, increment } from 'redux/modules/cart';
import { show } from 'redux/modules/snackBar';
import { selectUserState, UserState } from 'redux/modules/user';

import { useCartItemSelector, useCartListSelector } from 'hooks/useCartSelector';

import cart from 'assets/cart.svg';
import { MESSAGES, CART, PRODUCT } from 'constants/index';
import {
  CartCounter,
  CartImageBadge,
  CartImageWrapper,
  ProductContainer,
  ProductImageWrapper,
  ProductInfo,
  ProductInfoContainer,
} from './styles';

export type ProductType = {
  name: string;
  price: number;
  imageUrl: string;
  id: number;
};
interface ProductProps {
  productInfo: ProductType;
}

function Product({ productInfo: { name, price, imageUrl, id } }: ProductProps) {
  const { isLoggedIn }: UserState = useSelector(selectUserState);
  const [isShowCartCounter, setIsShowCartCounter] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItemList = useCartListSelector();
  const cartItem = useCartItemSelector(id);
  const timeout = useRef<NodeJS.Timeout>();

  const onClickCartImage = () => {
    if (!isLoggedIn) {
      navigate(routes.login);
      return;
    }

    if (!cartItemList.some((item) => item.id === id)) {
      const newItem = { name, price, imageUrl, id, amount: 1, isSelected: false };

      dispatch(addItem(newItem));
      dispatch(show(MESSAGES.ADDED_TO_CART));
    }
    setIsShowCartCounter((prev) => !prev);
  };

  const onClickDecreaseCounter = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    if (cartItem?.amount === PRODUCT.MIN_COUNT) {
      dispatch(deleteItem(id));
      dispatch(show(MESSAGES.DELETED_FROM_CART));
      setIsShowCartCounter(false);
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
    dispatch(addItem({ name, price, imageUrl, id, amount: 1, isSelected: false }));
  };

  useEffect(() => {
    if (isShowCartCounter) {
      timeout.current = setTimeout(() => {
        setIsShowCartCounter(false);
      }, CART.COUNTER_DISPLAY_TIME);
    }
  }, [isShowCartCounter, cartItem?.amount]);

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
          {cartItem?.amount && <CartImageBadge />}
          <img onClick={onClickCartImage} src={cart} alt="장바구니" />
        </CartImageWrapper>
        <CartCounter isShowCartCounter={isShowCartCounter}>
          <button onClick={onClickDecreaseCounter}>-</button>
          <span>{cartItem?.amount ?? 0}</span>
          <button onClick={onClickIncreaseCounter}>+</button>
        </CartCounter>
      </ProductInfoContainer>
    </ProductContainer>
  );
}

export default Product;
