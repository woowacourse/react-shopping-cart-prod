import { useModal } from 'noah-modal';
import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@Components/Header';
import LoadingHeader from '@Components/Header/LoadingHeader';
import QuickMenu from '@Components/QuickMenu';
import QuickMenuMobile from '@Components/QuickMenuMobile';

import ErrorBoundary from '@Pages/ErrorBoundary';
import NotFound from '@Pages/NotFound';

import GlobalStyle, { CommonPageStyle } from '@Styles/GlobalStyle';

import localStorageHelper from '@Utils/localStorageHelper';

import mockMyCouponData3 from './mocks/mockMyCouponData3.json';

function App() {
  useEffect(() => {
    if (!localStorageHelper.hasKey('cartItems')) localStorageHelper.setInitValue('cartItems', []);
    if (!localStorageHelper.hasKey('orderItems')) localStorageHelper.setInitValue('orderItems', []);
    if (!localStorageHelper.hasKey('myCoupons')) localStorageHelper.setInitValue('myCoupons', mockMyCouponData3);
  }, []);

  const { Modal, isModalOpen } = useModal();

  return (
    <>
      <GlobalStyle isModalOpen={isModalOpen} />
      <Suspense fallback={<LoadingHeader />}>
        <Header />
      </Suspense>
      <CommonPageStyle>
        <ErrorBoundary fallback={NotFound}>
          <Outlet />
          {Modal && <Modal />}
        </ErrorBoundary>
        <Suspense>
          <QuickMenu />
          <QuickMenuMobile />
        </Suspense>
      </CommonPageStyle>
    </>
  );
}

export default App;
