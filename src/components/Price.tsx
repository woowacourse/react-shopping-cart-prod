import { CSSProp, styled } from 'styled-components';

interface Props {
  price: number;
  tag?: string;
  description?: string;
  css?: CSSProp;
}

const Price = ({ price, tag, description, css }: Props) => {
  const priceTag = tag || 'p';

  return (
    <Wrapper as={priceTag} css={css}>
      {description}
      <span>{price.toLocaleString()}원</span>
    </Wrapper>
  );
};

const Wrapper = styled.p<{ css?: CSSProp }>`
  font-size: 17px;
  letter-spacing: 0.5px;
  color: var(--text-color);

  ${(props) => props.css}

  @media (max-width: 1270px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export default Price;
