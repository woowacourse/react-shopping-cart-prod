import { useLocation, useParams } from 'react-router-dom';
import useGetOrderDetail from '../../hooks/requests/useGetOrderDetail.ts';
import { useEffect } from 'react';
import { OrderResponse } from '../../types/responses/postOrderResponse.ts';

const OrderDetailPage = () => {
  const { state } = useLocation();
  const { orderId } = useParams();
  const { data, fetchOrderDetail } = useGetOrderDetail(orderId as string);

  useEffect(() => {
    if (!state && orderId) {
      fetchOrderDetail({});
    }
  }, [state, orderId]);

  const orderData: OrderResponse = state?.makeOrder ?? data;

  return (
    <>
      {orderData && (
        <div>
          <h1>Order Detail Page</h1>

          <ul>
            <div>
              <h2>Order ID: {orderData?.orderId}</h2>
            </div>
            {orderData.items.map((item) => {
              return (
                <li key={item.product.id}>
                  <img src={item.product.imageUrl} alt='' />
                  <h3>{item.product.name}</h3>
                  <p>
                    {item.product.price}원 / 수량: {item.quantity}개
                  </p>
                </li>
              );
            })}
          </ul>

          <div>
            <h2>결제금액 정보</h2>
            <p>상품금액: {orderData.productPrice}</p>
            <p>할인금액: {orderData?.discountPrice}</p>
            <p>배달금액: {orderData?.deliveryFee}</p>
            <p>총 결제: {orderData?.totalPrice}</p>
          </div>
          <div>
            <button>주문 목록</button>
            <button>홈으로</button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetailPage;
