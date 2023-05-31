import { styled } from 'styled-components';
import colors from '../../../colors';
import { GiCrownCoin } from 'react-icons/gi';
import { formatPriceWithoutWon } from '../../../utils/formatPrice';

interface PointsProps {
  children: number;
  size?: string;
}

interface AmountProps {
  size: string;
}

const Points = ({ children, size = '24px' }: PointsProps) => {
  return (
    <Container size={size}>
      <GiCrownCoin />
      <Amount>{formatPriceWithoutWon(children)}</Amount>
    </Container>
  );
};

const Amount = styled.span`
  font-weight: 700;
`;

const Container = styled.div<AmountProps>`
  display: inline-flex;
  column-gap: 10px;
  height: 30px;
  align-items: center;

  & * {
    color: ${colors.orange};
    font-size: ${({ size }) => size};
  }
`;

export default Points;
