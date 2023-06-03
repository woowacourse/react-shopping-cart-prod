import styled from 'styled-components';
import CartQuantityStepper from 'components/CartQuantityStepper/CartQuantityStepper';
import useShoppingCart from 'hooks/useShoppingCart';
import type { Product } from 'types/product';
import { useRecoilValue } from 'recoil';
import { cartProductIdStoreState } from 'state/cartProductIdStore';
import Box from 'components/@common/Box';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { cartProducts, initialAddCart, increaseQuantity, decreaseQuantity } = useShoppingCart();
  const cartProductIdStore = useRecoilValue(cartProductIdStoreState);
  const { id, price, name, imageUrl } = product;
  const targetCartProduct = cartProducts.get(cartProductIdStore[id]);
  const cartProductQuantity = targetCartProduct?.quantity ?? 0;

  return (
    <Box flex={{ flexDirection: 'column', justify: 'flex-start', gap: '8px' }} role="list">
      <ProductImgContainer>
        <ProductImage src={imageUrl} />
        <StepperWrapper>
          <CartQuantityStepper
            quantity={cartProductQuantity}
            initialIncrement={() => initialAddCart(product)}
            increaseQuantity={() => increaseQuantity(id)}
            decreaseQuantity={() => decreaseQuantity(id)}
          />
        </StepperWrapper>
      </ProductImgContainer>

      <ProductInfo sizing={{ width: '100%' }} flex={{ flexDirection: 'column', align: 'flex-start' }}>
        <Title>{name}</Title>
        <Price>{price.toLocaleString('ko-KR')}원</Price>
      </ProductInfo>
    </Box>
  );
};

const ProductImgContainer = styled.div`
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  filter: brightness(96%);
`;

const ProductInfo = styled(Box)`
  text-align: left;
`;

const Title = styled.span`
  font-size: 14px;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.4px;
`;

const StepperWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  right: 8px;
`;

export default ProductCard;
