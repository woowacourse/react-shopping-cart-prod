import ProductCardList from 'components/ProductCardList/ProductCardList';
import useFetch from 'hooks/useFetch';
import { getProducts } from 'apis/products';
import LoadingErrorCard from '../components/LoadingErrorCard/LoadingErrorCard';
import type { Product } from 'types/product';
import Box from 'components/@common/Box';
import styled from 'styled-components';

const ProductListPage = () => {
  const { data: products, errorState, isLoading, fetchData } = useFetch<Product[]>(getProducts);

  if (isLoading) return <div>상품목록 로딩중...</div>;
  if (errorState?.isError) {
    return <LoadingErrorCard onClickRetryButton={fetchData}>{errorState.error.message}</LoadingErrorCard>;
  }

  return (
    <Box sizing={{ width: '100%' }} flex={{ flexDirection: 'column' }}>
      <PageTitle>상품 목록</PageTitle>
      <ProductCardList products={products ?? []} />
    </Box>
  );
};

export default ProductListPage;

const PageTitle = styled.h2`
  width: 100%;
  height: 80px;
  font-size: 32px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;
