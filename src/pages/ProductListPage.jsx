import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Product from '../components/Product';
import useFetch from '../hooks/useFetch';
import Loading from '../components/Loading';
import { MESSAGE, SERVER_PATH } from '../constants';
import useCart from '../hooks/useCart';

import axios from 'axios';
import { actionTypes } from '../store/cart/cart.actions';

function ProductListPage() {
  const dispatch = useDispatch();
  const accessToken = useSelector(({ user }) => user.accessToken);
  const { data: productList, isLoading, isError } = useFetch(SERVER_PATH.PRODUCTS);
  const cartList = useSelector(({ cart }) => cart.data);
  const { addItem, deleteItem } = useCart();

  const idSetInCart = useMemo(() => new Set(cartList.map((cart) => cart.name)), [cartList]);

  const handleCartItem = (id, isCart, accessToken) => {
    if (isCart) {
      deleteItem(id, accessToken);
      alert(MESSAGE.REMOVE);
      return;
    }
    addItem(id, accessToken);
    alert(MESSAGE.ADD);
  };

  useEffect(() => {
    const requestData = async () => {
      try {
        const { data } = await axios.get(SERVER_PATH.CART, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch({
          type: actionTypes.ADD_CART_SUCCESS,
          payload: data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (!accessToken) {
      dispatch({
        type: actionTypes.ADD_CART_SUCCESS,
        payload: [],
      });
      return;
    }
    requestData();
  }, [accessToken]);

  if (isError) return <h1>error</h1>;
  if (isLoading) return <Loading />;

  return (
    <StyledContent>
      <StyledGridContainer>
        {productList.map((product) => (
          <Product
            key={product.id}
            productData={product}
            handleCartItem={() =>
              handleCartItem(product.id, idSetInCart.has(product.name), accessToken)
            }
            isCart={idSetInCart.has(product.name)}
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
