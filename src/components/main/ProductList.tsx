import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { CART_URL, PRODUCT_LIST_URL } from '../../constants/url';
import useFetchData from '../../hooks/useFetchData';
import { cartState, productsState, serverState } from '../../recoil';
import Spinner from '../Spinner';
import ProductItem from './ProductItem';

const ProductList = () => {
  const [products, setProducts] = useRecoilState(productsState);
  const server = useRecoilValue(serverState);
  const setCart = useSetRecoilState(cartState);

  const { api, isLoading } = useFetchData();

  useEffect(() => {
    api.get(`${server}${PRODUCT_LIST_URL}`).then((data) => {
      setProducts(data);
    });

    api.get(`${server}${CART_URL}`).then((data) => {
      setCart(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [server]);

  if (isLoading) return <Spinner />;

  return (
    <Grid>
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </Grid>
  );
};

const Grid = styled.ul`
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
`;

export default ProductList;
