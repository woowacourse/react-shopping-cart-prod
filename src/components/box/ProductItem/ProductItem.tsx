import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { CartIcon } from '../../../assets';
import type { CartItemType, ProductType } from '../../../types/types';
import { Text } from '../../common/Text/Text';
import InputStepper from '../../common/InputStepper/InputStepper';
import getPriceFormat from '../../../utils/getPriceFormat';
import { keyframes } from '@emotion/react';
import { useCartFetch } from '../../../hooks/useCartFetch';

const ProductItem = ({ product }: { product: ProductType }) => {
  const { cartData, addCartItemAPI, changeCartQuantityAPI, deleteCartItemAPI } = useCartFetch();

  const [cartItemData, setCartItemData] = useState<CartItemType | null>(null);

  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    if (cartData) {
      setCartItemData(cartData.find((cart) => cart.product.id === product.id) || null);
    }
  }, [cartData]);

  useEffect(() => {
    if (cartItemData) {
      setQuantity(cartItemData.quantity);
      return;
    }
    setQuantity(0);
  }, [cartItemData]);

  useEffect(() => {
    const mutateCartItem = async () => {
      if (cartData) {
        if (cartItemData && cartItemData.quantity !== quantity) {
          if (quantity > 0) {
            cartItemData.id && changeCartQuantityAPI(cartItemData.id, { quantity });
            return;
          }
          cartItemData.id && deleteCartItemAPI(cartItemData.id);
        }
        if (quantity > 0 && !cartItemData) {
          addCartItemAPI({ productId: product.id });
        }
      }
    };
    mutateCartItem();
  }, [quantity]);

  return (
    <ProductWrapper>
      <ProductImageWrapper>
        <ProductImage src={product.imageUrl} alt={product.name} loading="lazy" />
      </ProductImageWrapper>

      <ProductInfoWrapper>
        <ProductTextWrapper>
          <Text size="smaller" weight="light">
            {product.name}
          </Text>
          <Text size="small" weight="bold">
            {getPriceFormat(product.price)}원
          </Text>
        </ProductTextWrapper>
        {quantity === 0 ? (
          <CartIcon
            width={25}
            height={22}
            fill="#AAAAAA"
            style={{ transform: 'scaleX(-1)', cursor: 'pointer' }}
            onClick={() => setQuantity(1)}
          />
        ) : (
          <InputStepper
            size="small"
            quantity={quantity}
            setQuantity={(value: number) => setQuantity(value)}
          />
        )}
      </ProductInfoWrapper>
    </ProductWrapper>
  );
};

export default ProductItem;

export const skeletonAnimation = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 250px;
`;

const ProductImageWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 250px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const ProductImage = styled.img`
  object-fit: cover;
  transition: all 0.32s ease;

  width: 100%;
  height: 100%;

  &:hover {
    transform: scale(1.05);
  }

  background: linear-gradient(120deg, #e5e5e5 20%, #f0f0f0 28%, #f0f0f0 40%, #e5e5e5 48%);
  background-position: 100% 0;
  background-size: 582px;
  animation: ${skeletonAnimation} 1s infinite;
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 12px;
`;

const ProductTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
