import { Suspense } from 'react';

import CartPageSection from '../components/Cart/CartPageSection/CartPageSection';
import Header from '../components/Header/Header';
import LoadingSpinner from '../components/utils/LoadingSpinner/LoadingSpinner';

const CartListPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Header />
      <main>
        <CartPageSection />
      </main>
    </Suspense>
  );
};

export default CartListPage;
