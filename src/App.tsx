import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useSetCartState } from './recoils/recoilCart';
import { useQuery } from './hooks/useQuery';

import GlobalStyle from './GlobalStyle';

import { useApiBaseUrlValue } from './recoils/recoilApiBaseUrl';

import Home from './components/pages/Home';

import { CartItemType, CheckedStateType } from './types';
import { FETCH_URL, PATH } from './constants';
import { useSetCheckedState } from './recoils/recoilChecked';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';

const ShoppingCart = lazy(() => import('./components/pages/ShoppingCart'));
const OrderDetail = lazy(() => import('./components/pages/OrderDetail'));
const OrderList = lazy(() => import('./components/pages/OrderList'));

export const App = () => {
  const baseUrl = useApiBaseUrlValue();
  const { data: cart } = useQuery<CartItemType[]>(baseUrl + FETCH_URL.CART_ITEMS, true);

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
        <ErrorBoundary fallback={NotFound}>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path={PATH.HOME} Component={Home} />
              <Route path={PATH.CART} Component={ShoppingCart} />
              <Route path={PATH.ORDER} Component={OrderList} />
              <Route path={PATH.ORDER_DETAIL} Component={OrderDetail} />
              <Route path={PATH.OTHERS} Component={NotFound} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
};
