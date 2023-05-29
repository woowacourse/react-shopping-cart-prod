import { useNavigate } from 'react-router-dom';
import { OrderItem } from '../OrderItem';
import * as S from './OrderList.style';

function OrderList() {
  const navigate = useNavigate();

  const orders = [
    {
      orderId: 0,
      orderItems: [
        {
          id: 0,
          productName: '바나나',
          productPrice: 3500,
          paymentPrice: 3500,
          createdAt: 'string',
          productQuantity: 3,
          imageUrl:
            'https://cdn.pixabay.com/photo/2016/01/03/17/59/bananas-1119790_1280.jpg',
        },
        {
          id: 1,
          productName: '딸기',
          productPrice: 9900,
          paymentPrice: 9900,
          createdAt: 'string',
          productQuantity: 2,
          imageUrl:
            'https://cdn.pixabay.com/photo/2018/04/29/11/54/strawberries-3359755_1280.jpg',
        },
      ],
    },
    {
      orderId: 1,
      orderItems: [
        {
          id: 0,
          productName: '바나나',
          productPrice: 3500,
          paymentPrice: 3500,
          createdAt: 'string',
          productQuantity: 1,
          imageUrl:
            'https://cdn.pixabay.com/photo/2016/01/03/17/59/bananas-1119790_1280.jpg',
        },
      ],
    },
  ];

  return (
    <S.Wrapper>
      {orders.map(({ orderId, orderItems }) => (
        <S.OrderItemList>
          <S.OrderInfo>
            <span>주문번호: {orderId}</span>
            <S.DetailButton onClick={() => navigate(`/order/${orderId}`)}>
              상세보기 &gt;
            </S.DetailButton>
          </S.OrderInfo>
          {orderItems.map((item) => (
            <OrderItem item={item} />
          ))}
        </S.OrderItemList>
      ))}
    </S.Wrapper>
  );
}

export default OrderList;
