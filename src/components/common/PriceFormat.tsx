import { styled } from 'styled-components';

const PriceFormatContainer = styled.span`
  &::after {
    content: '원';
    margin-left: 0.2em;
  }
`;

type PriceFormatProps = {
  price: number;
};

const PriceFormat = (props: PriceFormatProps) => {
  const { price } = props;

  return <PriceFormatContainer>{price.toLocaleString('kr')}</PriceFormatContainer>;
};

export default PriceFormat;
