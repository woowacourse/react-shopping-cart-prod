import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { PATH } from '../../constants';
import { useSetOrderDetail } from '../../recoils/recoilOrderDetail';
import { UserOrdersType } from '../../types';
import { OrderedProduct } from './OrderedProduct';

interface OrderedProductProps {
  order: UserOrdersType;
  isDetail: boolean;
}

export const OrderedProductList = ({ order, isDetail }: OrderedProductProps) => {
  const setOrderNumber = useSetOrderDetail();

  const navigate = useNavigate();

  const detailOrderClick = () => {
    setOrderNumber(order.orderId);

    navigate(PATH.ORDER_DETAIL);
  };
  return (
    <>
      <Style.OrderNumberAndDetail>
        <Style.OrderNumberAndDate>
          <Style.OrderNumber>주문번호 : {order.orderId}</Style.OrderNumber>
          <Style.OrderDate>주문날짜 : {order.orderDate.split(' ')[0]}</Style.OrderDate>
        </Style.OrderNumberAndDate>
        {isDetail ? '' : <Style.OrderDetail onClick={detailOrderClick}>상세보기</Style.OrderDetail>}
      </Style.OrderNumberAndDetail>
      <Style.OrderProducts>
        {order.orderDetails &&
          order.orderDetails.map((product) => (
            <OrderedProduct key={product.product.id} orderDetail={product} />
          ))}
      </Style.OrderProducts>
    </>
  );
};

const Style = {
  OrderNumberAndDetail: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 92px;

    padding: 0 30px;

    background: #f6f6f6;
    border: 1px solid #aaaaaa;

    font-weight: 400;
    font-size: 20px;
    line-height: 24px;

    letter-spacing: 0.5px;

    @media screen and (max-width: 700px) {
      font-size: 15px;
    }
  `,

  OrderNumberAndDate: styled.div`
    display: flex;
  `,

  OrderNumber: styled.span`
    color: #333333;
  `,

  OrderDate: styled.span`
    margin-left: 40px;

    color: #333333;
  `,

  OrderDetail: styled.span`
    text-align: right;

    cursor: pointer;

    color: #000000;
  `,

  OrderProducts: styled.div`
    margin-bottom: 50px;
  `,
};
