import { styled } from 'styled-components';
import {
  formatPrice,
  formatPriceWithoutWon,
} from '../../../../utils/formatPrice';
import colors from '../../../../colors';
import Points from '../../../common/Points/Points';

interface SummaryPriceInfoProps {
  type: 'price' | 'points';
  name: string;
  price: number;
}

interface LabelProps {
  type: 'price' | 'points';
}

const SummaryPriceInfo = ({ type, name, price }: SummaryPriceInfoProps) => {
  return (
    <Container>
      <Label type={type}>{name}</Label>
      {type === 'price' ? (
        <Price>{formatPrice(price)}</Price>
      ) : (
        <Points size="24px">{price}</Points>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span<LabelProps>`
  padding: 10px;
  height: 42px;
  font-size: 20px;
  border-radius: 17px;
  color: ${colors.pureWhite};
  background-color: ${({ type }) =>
    type === 'price' ? colors.gray200 : colors.darkOrange};
`;

const Price = styled.span`
  font-size: 32px;
  font-weight: 700;
  color: ${colors.pureWhite};
`;

export default SummaryPriceInfo;
