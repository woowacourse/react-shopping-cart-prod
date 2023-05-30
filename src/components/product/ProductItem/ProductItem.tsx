import { styled } from 'styled-components';
import Counter from '../../common/Counter/Counter';
import CartButton from '../CartButton/CartButton';
import Image from '../../common/Image/Image';
import { formatPrice } from '../../../utils/formatPrice';
import useCartService from '../../../hooks/useCartService';
import type { Product } from '../../../types/product';
import colors from '../../../colors';

interface Foo {
  mode: unknown;
}

const ProductItem = (product: Product) => {
  const { id, name, price, imageUrl } = product;
  const {
    cart,
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
  } = useCartService();
  const productInCart = cart.find((cartItem) => cartItem.product.id === id);
  const quantityInCart = productInCart?.quantity ?? 0;

  const handleClickCartButton = () => {
    addProductToCart(id);
  };

  const handleChangeQuantity = (quantity: number) => {
    const cartItemId = cart.find((cartItem) => cartItem.product.id === id)?.id;

    if (cartItemId === undefined) return;

    updateProductQuantity(cartItemId, quantity);
  };

  const handleRemoveProduct = (quantity: number) => {
    const cartItemId = cart.find((cartItem) => cartItem.product.id === id)?.id;

    if (cartItemId === undefined) return;

    if (quantity === 0) {
      removeProductFromCart(cartItemId);
    }
  };

  return (
    <ItemContainer>
      <ProductImageWrapper>
        <Image src={imageUrl} loading="lazy" alt={name} size="large" />

        <CartButtonWrapper mode={productInCart}>
          {productInCart ? (
            <Counter
              count={quantityInCart}
              onChange={handleChangeQuantity}
              onBlur={handleRemoveProduct}
            />
          ) : (
            <CartButton onClick={handleClickCartButton} />
          )}
        </CartButtonWrapper>
      </ProductImageWrapper>
      <Contents>
        <div>
          <Title>{name}</Title>
          <Price>{formatPrice(price)}</Price>
        </div>
      </Contents>
    </ItemContainer>
  );
};

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 18px;
  width: 282px;
  height: 358px;
  background-color: ${colors.pureBlack};
  padding: 5px;
  box-sizing: border-box;
  box-shadow: 0 0 30px ${colors.pureBlack};
`;

const ProductImageWrapper = styled.div`
  position: relative;
`;

const CartButtonWrapper = styled.div<Foo>`
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: ${({ mode }) => (mode ? '120px' : '42px')};
  overflow: hidden;
  transition: 0.2s;
  background-color: ${colors.pureBlack};
  border-radius: 10px;
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #fffac8;
`;

const Price = styled.p`
  margin-top: 3px;
  font-size: 24px;
  font-weight: 600;
  color: ${colors.gold};
  font-family: 'Bodoni Moda';
`;

export default ProductItem;
