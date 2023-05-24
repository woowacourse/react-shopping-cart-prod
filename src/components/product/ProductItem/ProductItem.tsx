import { styled } from 'styled-components';
import Counter from '../../common/Counter/Counter';
import Image from '../../common/Image/Image';
import { formatPrice } from '../../../utils/formatPrice';
import useCartService from '../../../hooks/useCartService';
import { SmallCartIcon } from '../../../assets/svg';
import type { Product } from '../../../types/product';

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

        <CartButtonWrapper>
          {productInCart ? (
            <Counter
              count={quantityInCart}
              onChange={handleChangeQuantity}
              onBlur={handleRemoveProduct}
            />
          ) : (
            <CartButton
              type="button"
              aria-label="장바구니에 추가하기"
              onClick={handleClickCartButton}
            >
              <SmallCartIcon />
            </CartButton>
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
`;

const ProductImageWrapper = styled.div`
  position: relative;
`;

const CartButtonWrapper = styled.div`
  position: absolute;
  right: 8px;
  bottom: 8px;
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

const Price = styled.p`
  margin-top: 3px;
  font-size: 20px;
  font-weight: 400;
`;

const CartButton = styled.button`
  background: #fff;
  border: 1px solid #dddddd;

  padding: 7px;

  cursor: pointer;
`;

export default ProductItem;
