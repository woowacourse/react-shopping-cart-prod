import styled from 'styled-components';
import { SKELETON_LENGTH } from '../../constants';
import { Skeleton } from '../common/Skeleton';

const ProductLoading = () => {
  return (
    <Style.Container>
      {Array.from({ length: SKELETON_LENGTH }).map((_, i) => (
        <Skeleton key={i} />
      ))}
    </Style.Container>
  );
};

const Style = {
  Container: styled.ul`
    display: grid;

    padding-bottom: 45px;

    grid-template-columns: repeat(4, 1fr);
    gap: 80px 46px;

    @media (max-width: 1300px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 1023px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 679px) {
      grid-template-columns: repeat(1, 1fr);
    }
  `,
};

export default ProductLoading;
