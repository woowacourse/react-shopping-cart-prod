import AsyncBoundary from '../../components/AsyncBoundary/AsyncBoundary';
import CartSection from '../../components/CartPage/CartSection/CartSection';
import ExtraCouponSection from '../../components/CartPage/ExtraCouponSection/ExtraCouponSection';
import OrderAside from '../../components/CartPage/OrderAside/OrderAside';
import Loading from '../../components/common/Loading/Loading';
import Flex from '../../components/common/Flex';
import * as S from './CartPage.styles';

const CartPage = () => {
  return (
    <AsyncBoundary loadingFallback={<Loading />}>
      <S.Root>
        <Flex dir="column" grow>
          <CartSection />
          <ExtraCouponSection />
        </Flex>
        <OrderAside />
      </S.Root>
    </AsyncBoundary>
  );
};

export default CartPage;
