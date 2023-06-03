import { styled } from 'styled-components';

type PriceFormatContainerProps = {
  $unit: string;
};

const PriceFormatContainer = styled.span<PriceFormatContainerProps>`
  &::after {
    content: '${(props) => props.$unit}';
    margin-left: 0.2em;
  }
`;

type PriceFormatProps = {
  price: number;
  unit?: string;
};

const PriceFormat = (props: PriceFormatProps) => {
  const { price, unit = '원' } = props;

  return <PriceFormatContainer $unit={unit}>{price.toLocaleString('kr')}</PriceFormatContainer>;
};

export default PriceFormat;
