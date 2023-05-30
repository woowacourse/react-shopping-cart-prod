import Header from '../components/Header/Header';
import OrderDetailPageSection from '../components/OrderDetailPageSection/OrderDetailPageSection';
import PaymentInfo from '../components/PaymentInfo/PaymentInfo';

const OrderDetailPage = () => {
  return (
    <>
      <Header />
      <main>
        <OrderDetailPageSection />
        <PaymentInfo />
      </main>
    </>
  );
};

export default OrderDetailPage;
