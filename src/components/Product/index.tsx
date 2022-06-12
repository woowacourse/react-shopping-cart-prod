import { useNavigate } from 'react-router-dom';
import routes from 'routes';
import { useDispatch, useSelector } from 'react-redux';
import { addCartAPI } from 'redux/modules/cart';
import { show } from 'redux/modules/snackBar';
import { selectUserState, UserState } from 'redux/modules/user';
import { addProductToCart } from 'redux/modules/products';

import cart from 'assets/cart.svg';
import { MESSAGES } from 'constants/index';
import {
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
  cartId: null | number;
  quantity: number;
};
interface ProductProps {
  productInfo: ProductType;
}

function Product({ productInfo: { name, price, imageUrl, id, quantity } }: ProductProps) {
  const { isLoggedIn }: UserState = useSelector(selectUserState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickCartImage = () => {
    if (!isLoggedIn) {
      navigate(routes.login);
      return;
    }

    if (!quantity) {
      const item = { name, price, imageUrl, id };

      dispatch(
        addCartAPI(item, () => {
          dispatch(addProductToCart(id));
          dispatch(show(MESSAGES.ADDED_TO_CART));
        })
      );
    }
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
        <CartImageWrapper>
          {quantity > 0 && <CartImageBadge />}
          <img onClick={onClickCartImage} src={cart} alt="장바구니" />
        </CartImageWrapper>
      </ProductInfoContainer>
    </ProductContainer>
  );
}

export default Product;
