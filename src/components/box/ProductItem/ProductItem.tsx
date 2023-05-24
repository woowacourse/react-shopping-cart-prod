import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { CartIcon } from '../../../assets';
import type { CartItem, Product } from '../../../types/types';
import { Text } from '../../common/Text/Text';
import InputStepper from '../../common/InputStepper/InputStepper';
import getPriceFormat from '../../../utils/getPriceFormat';
import { useCart } from '../../../hooks/useCart';
import { keyframes } from '@emotion/react';

const ProductItem = ({ product }: { product: Product }) => {
  const { data, addCartItemAPI, changeCartQuantityAPI, deleteCartItemAPI } = useCart();
  const [cartItemData, setCartItemData] = useState<CartItem | null>(null);

  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setCartItemData(data.find((cart) => cart.product.id === product.id) || null);
    }
  }, [data]);

  useEffect(() => {
    if (cartItemData) {
      setQuantity(cartItemData.quantity);
    }
  }, [cartItemData]);

  useEffect(() => {
    const mutateCartItem = async () => {
      if (data) {
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
      <ProductImage src={product.imageUrl} alt={product.name} loading="lazy" />
      <ProductInfoWrapper>
        <ProductTextWrapper>
          <Text size="smallest" weight="light" color="#333333">
            {product.name}
          </Text>
          <Text size="small" weight="light" color="#333333" lineHeight="33px">
            {getPriceFormat(product.price)} 원
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

const skeletonAnimation = keyframes`
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

  width: 282px;
`;
const ProductImage = styled.img`
  object-fit: cover;

  width: 100%;
  height: 282px;
  transition: all 0.32s ease;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 1px 14px 24px hsla(218, 53%, 10%, 12%);
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
