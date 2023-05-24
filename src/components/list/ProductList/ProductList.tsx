import styled from '@emotion/styled';
import ProductItem from '../../box/ProductItem/ProductItem';
import ErrorBox from '../../common/ErrorBox/ErrorBox';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import useProduct from '../../../hooks/useProduct';

const ProductList = () => {
  const { data, isLoading } = useProduct();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (!data) {
    return <ErrorBox errorType="network" />;
  }
  if (data.length === 0) {
    return <ErrorBox errorType="emptyList" />;
  }
  return (
    <ProductListWrapper>
      {data.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ProductListWrapper>
  );
};

export default ProductList;

const ProductListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  grid-column-gap: 47px;
  grid-row-gap: 75px;

  @media screen and (max-width: 1320px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 660px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
