import Message from '../components/Common/Message';

const OrderFailPage = () => {
  return (
    <main>
      <Message type='orderFailed' homeLink cartLink />
    </main>
  );
};

export default OrderFailPage;
