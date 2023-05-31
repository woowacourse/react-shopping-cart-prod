import { useRecoilValue } from 'recoil';
import { currentOrderSelector } from '../store/OrderState';
import { CartListWrapper } from '../style/ContentLayout';

const OrderCompletePage = () => {
  const currentOrder = useRecoilValue(currentOrderSelector);

  const order = currentOrder.orderProducts.map(({ id, quantity, product }) => {
    return (
      <div key={id}>
        <img src={product.imageUrl} alt={product.name} />
        <span>{`${quantity}개`}</span>
        <span>{product.price * quantity}</span>
      </div>
    );
  });

  return (
    <CartListWrapper>
      <div>
        <span>주문이 완료되었습니다.</span>
        <section>{order}</section>
        <section>
          <button>홈으로 가기</button>
          <button>주문 상세 내역 보기</button>
        </section>
      </div>
    </CartListWrapper>
  );
};

export default OrderCompletePage;
