import Message from '../components/Common/InformativeMessage';

const OrderFailPage = () => {
  return (
    <main>
      <Message type='orderFailed' homeLink cartLink />
    </main>
  );
};

export default OrderFailPage;
