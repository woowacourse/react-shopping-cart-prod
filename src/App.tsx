import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useSetCartState } from './recoils/recoilCart';
import { useQuery } from './hooks/useQuery';

import GlobalStyle from './GlobalStyle';

import { useApiBaseUrlValue } from './recoils/recoilApiBaseUrl';

import { Home } from './components/pages/Home';
import { ShoppingCart } from './components/pages/ShoppingCart';
import { OrderList } from './components/pages/OrderList';
import { OrderDetail } from './components/pages/OrderDetail';

import { CartItemType, CheckedStateType } from './types';
import { FETCH_URL, PATH } from './constants';
import { useSetCheckedState } from './recoils/recoilChecked';

export const App = () => {
  const baseUrl = useApiBaseUrlValue();
  const { data: cart } = useQuery<CartItemType[]>(baseUrl + FETCH_URL.CART_ITEMS, {
    Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
  });

  const setCartState = useSetCartState();

  const setCheckedState = useSetCheckedState();

  useEffect(() => {
    if (!cart) return;

    setCartState(cart);

    setCheckedState((prev) => {
      const updatedCheckedState: CheckedStateType = {
        all: true,
      };

      for (const item of cart) {
        updatedCheckedState[item.id] = true;
      }

      return updatedCheckedState;
    });
  }, [cart, setCartState, setCheckedState]);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path={PATH.HOME} Component={Home} />
          <Route path={PATH.CART} Component={ShoppingCart} />
          <Route path={PATH.ORDER} Component={OrderList} />
          <Route path={PATH.ORDER_DETAIL} Component={OrderDetail} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
