import { useParams } from 'react-router-dom';
import { OrderList } from '../../components/OrderList';
import { FatBorder, PageTitle } from '../../style/style';
import { OrderListWrapper } from '../Order/Order.style';
import { PaymentInfoBox } from '../../components/PaymentInfoBox';
import { PointInfoBox } from '../../components/PointInfoBox';
import { OrderInfoWrapper } from './OrderDetail.style';

const order = {
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
};

function OrderDetail() {
  const params = useParams();

  return (
    <>
      <PageTitle>주문내역상세</PageTitle>
      <FatBorder />
      <OrderListWrapper>
        <OrderList {...order} detail={false} />
      </OrderListWrapper>
      <OrderInfoWrapper>
        <PaymentInfoBox />
        <PointInfoBox />
      </OrderInfoWrapper>
    </>
  );
}

export default OrderDetail;
