// @ts-nocheck
import { Image } from 'components';
import Styled from './index.style';

const PaymentProductItem = ({ image, name, quantity }) => {
  return (
    <Styled.Container>
      <Image src={image} alt={name} size="130px" />
      <Styled.InformationContainer>
        <Styled.ProductName>{name}</Styled.ProductName>
        <Styled.ProductQuantity>수량 : {quantity}</Styled.ProductQuantity>
      </Styled.InformationContainer>
    </Styled.Container>
  );
};

export default PaymentProductItem;
