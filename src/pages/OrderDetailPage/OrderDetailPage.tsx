import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGetOrderDetail from '../../hooks/requests/useGetOrderDetail.ts';
import { useEffect } from 'react';
import { OrderResponse } from '../../types/responses/OrderResponse.ts';
import OrderList from '../../components/@common/OrderList/OrderList.tsx';
import routes from '../../constants/routes.ts';

const OrderDetailPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { orderId } = useParams();
  const { data, fetchOrderDetail } = useGetOrderDetail(orderId as string);

  const handleOrderListButton = () => {
    navigate(routes.orderList);
  };

  const handleProductListButton = () => {
    navigate(routes.list);
  };

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

          <OrderList orderData={orderData} />

          <div>
            <h2>결제금액 정보</h2>
            <p>상품금액: {orderData.productPrice}</p>
            <p>할인금액: {orderData.discountPrice}</p>
            <p>배달금액: {orderData.deliveryFee}</p>
            <p>총 결제: {orderData.totalPrice}</p>
          </div>
          <div>
            <button onClick={handleOrderListButton}>주문 목록</button>
            <button onClick={handleProductListButton}>홈으로</button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetailPage;
