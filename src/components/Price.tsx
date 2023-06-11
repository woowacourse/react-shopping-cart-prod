import { CSSProp, styled } from 'styled-components';

interface Props {
  value: number;
  tag?: string;
  description?: string;
  css?: CSSProp;
}

const Price = ({ value, tag, description, css }: Props) => {
  const priceTag = tag || 'p';

  return (
    <S.Price as={priceTag} css={css}>
      {description}
      <span>{value.toLocaleString()}원</span>
    </S.Price>
  );
};

const S = {
  Price: styled.p<{ css?: CSSProp }>`
    font-size: 17px;
    letter-spacing: 0.5px;
    color: var(--text-color);

    @media (max-width: 1270px) {
      font-size: 16px;
    }

    @media (max-width: 768px) {
      font-size: 15px;
    }

    ${(props) => props.css}
  `,
};

export default Price;
