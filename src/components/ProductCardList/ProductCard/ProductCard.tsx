import styled from 'styled-components';
import emptyCartImg from 'assets/gradiation-min.png';
import FlexBox from 'components/@common/FlexBox';
import CartQuantityStepper from 'components/CartQuantityStepper/CartQuantityStepper';
import useShoppingCart from 'hooks/useShoppingCart';
import type { Product } from 'types/product';
import { useRecoilValue } from 'recoil';
import { cartProductIdStoreState } from 'state/cartProductIdStore';
import SkeletonImg from 'components/@common/SkeletonImg';

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
    <FlexBox flexDirection="column" justify="flex-start" gap="8px" role="list">
      <ProductImgContainer>
        <SkeletonImg src={imageUrl} placeholderSrc={emptyCartImg} />
        <StepperWrapper>
          <CartQuantityStepper
            quantity={cartProductQuantity}
            initialIncrement={() => initialAddCart(product)}
            increaseQuantity={() => increaseQuantity(id)}
            decreaseQuantity={() => decreaseQuantity(id)}
          />
        </StepperWrapper>
      </ProductImgContainer>

      <ProductInfo flexDirection="column" align="flex-start">
        <Title>{name}</Title>
        <Price>{price.toLocaleString('ko-KR')}원</Price>
      </ProductInfo>
    </FlexBox>
  );
};

const ProductImgContainer = styled.div`
  position: relative;
`;

const ProductInfo = styled(FlexBox)`
  width: 100%;
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
