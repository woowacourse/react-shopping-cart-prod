import FlexBox from 'components/@common/FlexBox';
import SkeletonImg from 'components/@common/SkeletonImg';
import styled from 'styled-components';
// import { CartProduct } from 'types/product';
import emptyImg from 'assets/gradiation-min.png';
import { CartProduct } from 'types/product';

type SheetProductCardProps = {
  sheetProduct: CartProduct;
};

const SheetProductCard = ({ sheetProduct }: SheetProductCardProps) => {
  const { quantity, product } = sheetProduct;
  const { name, price, imageUrl } = product;

  return (
    <CartProductCardContainer justify="flex-start" gap="16px" role="list">
      <ProductImageWrapper>
        <SkeletonImg placeholderSrc={emptyImg} src={imageUrl} width={75} height={75} alt="Product Image" />
      </ProductImageWrapper>
      <ProductInfoContainer flexDirection="column" justify="space-between">
        <Container flexDirection="column" justify="flex-end" align="left">
          <Title>{name}</Title>
          <Description>
            수량 : {quantity}개 | <Price>총 {quantity * price}원</Price>
          </Description>
        </Container>
      </ProductInfoContainer>
    </CartProductCardContainer>
  );
};

export default SheetProductCard;

const CartProductCardContainer = styled(FlexBox)`
  width: 100%;
  height: 100%;
  padding: 20px 0;
  border-top: 1px solid #dddddd;
`;

const ProductImageWrapper = styled.div`
  width: 75px;
`;

const ProductInfoContainer = styled(FlexBox)`
  position: relative;
  width: 100%;
  min-height: 75px;
`;

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  width: 100%;
  font-size: 18px;
  overflow: hidden;
`;

const Description = styled.div`
  width: 100%;
  margin-top: 8px;
  font-size: 14px;
  overflow: hidden;
  color: #828282;
`;

const Price = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #333333;
`;
