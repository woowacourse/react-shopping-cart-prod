import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import ProductItem from './ProductItem';
import { Product } from '../../types';
import { PRODUCT_BASE_URL } from '../../constants/url';
import { productListState } from '../../store/ProductListState';
import { useEffect } from 'react';
import Skeleton from './Skeleton';
import { serverState } from '../../store/ServerState';
import useGet from '../../hooks/useGet';

// TODO: 관심사 분리하기
const ProductList = () => {
  const [productList, setProductList] = useRecoilState<Product[]>(productListState);
  const serverUrl = useRecoilValue(serverState);
  const { data, isLoading } = useGet<Product[]>(`${serverUrl}${PRODUCT_BASE_URL}`);

  useEffect(() => {
    if (data) setProductList(data);
  }, [data, serverUrl, setProductList]);

  const skeleton = Array.from({ length: 12 }).map((_, index) => <Skeleton key={index} />);
  const products = productList.map((product) => (
    <ProductItem
      key={product.id}
      id={product.id}
      name={product.name}
      price={product.price}
      imgUrl={product.imageUrl}
    />
  ));

  return <S.Wrapper>{isLoading ? skeleton : products}</S.Wrapper>;
};

const S = {
  Wrapper: styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(4, 210px);
    grid-template-rows: repeat(3, 1fr);
    gap: 86px 4%;

    @media all and (min-width: 768px) and (max-width: 1023px) {
      grid-template-columns: repeat(3, 225px);
    }

    @media all and (min-width: 480px) and (max-width: 767px) {
      grid-template-columns: repeat(2, 235px);
    }

    @media all and (max-width: 479px) {
      grid-template-columns: repeat(1, 286px);
    }
  `,
};

export default ProductList;
