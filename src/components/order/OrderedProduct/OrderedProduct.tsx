import { styled } from 'styled-components';
import { formatPrice } from '../../../utils/formatPrice';
import Image from '../../common/Image/Image';
import Colors from '../../../constant/Colors';

interface OrderedProductProps {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const OrderedProduct = (props: OrderedProductProps) => {
  const { name, price, quantity, imageUrl } = props;

  return (
    <OrderedProductDiv>
      <Image src={imageUrl} size="medium" alt="" />
      <ProductInfoDiv>
        <PrimaryParagraph>{name}</PrimaryParagraph>
        <SecondaryParagraph>
          {formatPrice(price)} <span aria-hidden="true">/</span> 수량: {quantity}개
        </SecondaryParagraph>
      </ProductInfoDiv>
    </OrderedProductDiv>
  );
};

const OrderedProductDiv = styled.div`
  display: flex;
  column-gap: 33px;

  padding: 39px 26px;
  height: 220px;
  width: 100%;

  border: 1px solid ${Colors.grey3};
`;

const ProductInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  width: 50%;
`;

const PrimaryParagraph = styled.p`
  width: 100%;

  color: ${Colors.grey1};
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SecondaryParagraph = styled.p`
  width: 100%;

  color: ${Colors.grey2};
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default OrderedProduct;
