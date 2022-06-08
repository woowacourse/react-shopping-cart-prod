// @ts-nocheck
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductItem } from 'components';
import Styled from './index.style';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async () => {
    try {
      const response = await axios.get('/products');
      setIsLoading(false);

      setProducts(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Styled.ProductListPage>
      {!isLoading ? (
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
