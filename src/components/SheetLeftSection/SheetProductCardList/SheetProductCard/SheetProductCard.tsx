import FlexBox from 'components/@common/FlexBox';
import styled from 'styled-components';
import { CartProduct } from 'types/product';

type SheetProductCardProps = {
  sheetProduct: CartProduct;
};

const SheetProductCard = ({ sheetProduct }: SheetProductCardProps) => {
  const { product, quantity } = sheetProduct;
  const { id, name, price, imageUrl } = product;

  return (
    <CartProductCardContainer justify="flex-start" gap="16px" role="list">
      <ProductImageWrapper>
        <ProductImage src={imageUrl} />
      </ProductImageWrapper>
      <ProductInfoContainer flexDirection="column" justify="space-between">
        <Container>
          <Title>{name}</Title>
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
  width: 150px;
`;

const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 4px;
  filter: brightness(96%);
`;

const ProductInfoContainer = styled(FlexBox)`
  position: relative;
  width: 100%;
  min-height: 150px;
`;

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
`;

const Title = styled.span`
  width: 100%;
  font-size: 18px;
  overflow: hidden;
`;
