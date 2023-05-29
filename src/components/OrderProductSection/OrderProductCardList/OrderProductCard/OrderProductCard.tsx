import styled from 'styled-components';

import type { CartProduct } from 'types/product';
import Box from 'components/@common/Box';

type OrderProductCardProps = {
  checkedCartProduct: CartProduct;
};

const OrderProductCard = ({ checkedCartProduct }: OrderProductCardProps) => {
  const { product, quantity } = checkedCartProduct;
  const { id, name, price, imageUrl } = product;
  const totalPrice = `${(price * quantity).toLocaleString('ko-KR')}원`;

  return (
    <Container
      sizing={{ width: '100%', height: '160px' }}
      flex={{ gap: '16px', justify: 'flex-start' }}
      role="listitem"
    >
      <ProductImage src={imageUrl} alt={name} />
      <Box
        flex={{ flexDirection: 'column', justify: 'flex-start', align: 'flex-start', gap: '20px' }}
        sizing={{ minHeight: '100%' }}
      >
        <Title>{name}</Title>
        <TotalPriceAndQuantity>{`${totalPrice} / 수량 : ${quantity}개`}</TotalPriceAndQuantity>
      </Box>
    </Container>
  );
};

const Container = styled(Box)`
  border: 1px solid var(--color-grayscale-200);
  padding: 20px 10px;
`;

const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 4px;
  filter: brightness(96%);
`;

const Title = styled.span`
  font-size: 18px;
  overflow: hidden;
`;

const TotalPriceAndQuantity = styled.span`
  font-size: 16px;
  letter-spacing: -0.4px;
  color: var(--color-grayscale-500);
`;

export default OrderProductCard;
