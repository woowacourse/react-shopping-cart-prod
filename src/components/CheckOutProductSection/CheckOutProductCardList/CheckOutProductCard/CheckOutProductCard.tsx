import styled from 'styled-components';

import type { CartProduct } from 'types/product';
import Box from 'components/@common/Box';

type CheckOutProductCardProps = {
  checkedCartProduct: CartProduct;
};

const CheckOutProductCard = ({ checkedCartProduct }: CheckOutProductCardProps) => {
  const { product, quantity } = checkedCartProduct;
  const { name, price, imageUrl } = product;
  const totalPrice = `${(price * quantity).toLocaleString('ko-KR')}원`;

  return (
    <Container
      sizing={{ width: '100%', height: '140px' }}
      flex={{ gap: '16px', justify: 'flex-start' }}
      role="listitem"
    >
      <ProductImage src={imageUrl} alt={name} />
      <Box
        flex={{ flexDirection: 'column', justify: 'flex-start', align: 'flex-start', gap: '16px' }}
        sizing={{ minHeight: '100%' }}
      >
        <Title>{name}</Title>
        <TotalPriceAndQuantity>{`${totalPrice} / 수량 : ${quantity}개`}</TotalPriceAndQuantity>
      </Box>
    </Container>
  );
};

const Container = styled(Box)`
  border-top: 1px solid var(--color-grayscale-200);
  padding: 20px;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  filter: brightness(96%);
  background-color: var(--color-pure-white);
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

export default CheckOutProductCard;
