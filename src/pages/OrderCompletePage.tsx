import Message from '../components/Common/InformativeMessage';

const OrderCompletePage = () => {
  return (
    <main>
      <Message type='orderCompleted' homeLink orderLink />
    </main>
  );
};

export default OrderCompletePage;
