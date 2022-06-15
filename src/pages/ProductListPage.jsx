import { useMemo } from 'react';

import styled from 'styled-components';

import Product from '../components/Product';
import Loading from '../components/Loading';

import useFetch from '../hooks/useFetch';
import useCart from '../hooks/useCart';

import { MESSAGE, SERVER_PATH } from '../constants';

function ProductListPage() {
  const { data: productList, isLoading, isError } = useFetch(SERVER_PATH.PRODUCTS);
  const { cartList, addItem, deleteItem } = useCart();
  const idSetInCart = useMemo(() => new Set(cartList.map((cart) => cart.name)), [cartList]);

  const handleClickCartItem = (id, isProductInCart) => {
    if (isProductInCart) {
      deleteItem(id);
      alert(MESSAGE.REMOVE);
      return;
    }
    addItem(id);
    alert(MESSAGE.ADD);
  };

  if (isError) return <h1>error</h1>;
  if (isLoading) return <Loading />;

  return (
    <StyledContent>
      <StyledGridContainer>
        {productList.map((product) => (
          <Product
            key={product.id}
            productData={product}
            handleCartItem={() => handleClickCartItem(product.id, idSetInCart.has(product.name))}
            isProductInCart={idSetInCart.has(product.name)}
          />
        ))}
      </StyledGridContainer>
    </StyledContent>
  );
}

const StyledContent = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 5vh;
`;

const StyledGridContainer = styled.div`
  display: grid;
  gap: 18px;
  width: 80%;
  grid-template-columns: repeat(4, 1fr);
  margin: auto;
  overflow-y: auto;
`;

export default ProductListPage;
