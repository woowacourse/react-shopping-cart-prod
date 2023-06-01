import Message from '../components/Common/Message';

const OrderCompletePage = () => {
  return (
    <main>
      <Message type='orderCompleted' homeLink orderLink />
    </main>
  );
};

export default OrderCompletePage;
