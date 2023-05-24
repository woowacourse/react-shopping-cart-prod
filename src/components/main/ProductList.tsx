import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { CART_URL, PRODUCT_LIST_URL } from '../../constants/url';
import { useFetchData } from '../../hooks/useFetchData';
import { productListState, serverState } from '../../recoil';
import ProductItem from './ProductItem';

const ProductList = () => {
  const [productList, setProductList] = useRecoilState(productListState);
  const server = useRecoilValue(serverState);

  const { api, isLoading } = useFetchData();

  useEffect(() => {
    api.get(`${server}${PRODUCT_LIST_URL}`).then((data) => {
      setProductList(data);
    });
    api
      .get(`${server}${CART_URL}`, {
        Authorization: 'Basic YUBhLmNvbToxMjM0',
        'Content-Type': 'application/json',
      })
      .then((data) => {
        // TODO: setCartList
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.Wrapper>
      {isLoading ? (
        <p>로딩중...</p>
      ) : (
        productList.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))
      )}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.main`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 86px 4%;
    max-width: 1270px;
    margin: 0 auto;
    padding: 0 20px 120px;

    @media (max-width: 1270px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(1, 1fr);
    }
  `,
};

export default ProductList;
