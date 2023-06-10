import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { CartIcon } from '../../../assets';
import type { CartItemType, ProductType } from '../../../types/types';
import { Text } from '../../common/Text/Text';
import InputStepper from '../../common/InputStepper/InputStepper';
import { keyframes } from '@emotion/react';
import { useCartFetch } from '../../../hooks/useCartFetch';
import { NUM } from '../../../abstract/constants';

const ProductItem = ({ product }: { product: ProductType }) => {
  const { cartData, addCartItemAPI, changeCartQuantityAPI, deleteCartItemAPI } = useCartFetch();
  const [cartItemData, setCartItemData] = useState<CartItemType | null>(null);

  const [quantity, setQuantity] = useState<number>(NUM.ZERO);

  useEffect(() => {
    const existData = cartData?.find((cart) => cart.product.id === product.id);
    if (existData) {
      setCartItemData(existData);
    }
    if (existData) setQuantity(existData.quantity);
  }, [cartData]);

  useEffect(() => {
    const fetchCartData = async () => {
      if (cartItemData && cartItemData.quantity !== quantity) {
        if (quantity > NUM.ZERO) {
          cartItemData.id && changeCartQuantityAPI(cartItemData.id, { quantity });
          return;
        }
        cartItemData.id && deleteCartItemAPI(cartItemData.id);
      }
      if (quantity > NUM.ZERO && !cartItemData) {
        addCartItemAPI({ productId: product.id });
      }
    };
    fetchCartData();
  }, [quantity]);

  return (
    <ProductWrapper>
      <ProductImage src={product.imageUrl} alt={product.name} loading="lazy" />
      <ProductInfoWrapper>
        <ProductTextWrapper>
          <Text size="smallest" weight="light" color="#333">
            {product.name}
          </Text>
          <Text size="small" weight="light" color="#333" lineHeight="33px">
            {product.price.toLocaleString()} 원
          </Text>
        </ProductTextWrapper>
        {quantity ? (
          <InputStepper
            size="small"
            quantity={quantity}
            setQuantity={(value: number) => setQuantity(value)}
          />
        ) : (
          <CartIcon
            width={25}
            height={22}
            fill="#AAA"
            style={{ transform: 'scaleX(-1)', cursor: 'pointer' }}
            onClick={() => setQuantity(1)}
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
