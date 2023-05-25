import styled, { css } from 'styled-components';

import Skeleton from './Skeleton';
import { useRecoilValue } from 'recoil';
import { totalCartProductSelect } from '../../recoil/cartProductData';

interface Props {
  content: 'product' | 'cart';
}

const ContentListSkeleton = ({ content }: Props) => {
  const totalCartProduct = useRecoilValue(totalCartProductSelect);
  const contentCount = content === 'cart' ? totalCartProduct : 12;

  return (
    <ProductListContainer content={content}>
      {Array.from({ length: contentCount }).map((_, index) => (
        <li key={index}>
          <Skeleton content={content} />
        </li>
      ))}
    </ProductListContainer>
  );
};

const ContentStyled = {
  product: css`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(4, 282px);
    grid-row-gap: 84px;
    grid-column-gap: 48px;

    @media (min-width: 640px) and (max-width: 768px) {
      grid-template-columns: repeat(2, 282px);
    }

    @media (max-width: 640px) {
      grid-template-columns: repeat(1, 282px);
    }
  `,

  cart: css`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    gap: 20px;
  `,
};

const ProductListContainer = styled.ul<Props>`
  ${({ content }) =>
    content === 'cart' ? ContentStyled['cart'] : ContentStyled['product']}
`;

export default ContentListSkeleton;
