// @ts-nocheck
import { useEffect, useState } from 'react';
import useProduct from 'hooks/db/useProduct';
import { ProductItem } from 'components';
import Styled from './index.style';

const ProductListPage = () => {
  const [products, setProducts] = useState(null);
  const { getProductsAPI } = useProduct();

  const getProducts = async () => {
    const products = await getProductsAPI();

    setProducts(products);
  };

  useEffect(() => {
    getProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Styled.ProductListPage>
      {products ? (
        <Styled.ProductList>
          {products.map(({ id, name, price, image }) => {
            return id && <ProductItem key={id} id={id} name={name} price={price} image={image} />;
          })}
        </Styled.ProductList>
      ) : (
        <Styled.Loading>열심히 로딩중 .. ✨</Styled.Loading>
      )}
    </Styled.ProductListPage>
  );
};

export default ProductListPage;
