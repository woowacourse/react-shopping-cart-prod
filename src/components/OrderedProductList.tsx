import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { PATH } from '../constants';
import { useSetOrderDetail } from '../recoils/recoilOrderDetail';
import { UserOrdersType } from '../types';
import { OrderedProduct } from './OrderedProduct';

interface OrderedProductProps {
  order: UserOrdersType;
}

export const OrderedProductList = ({ order }: OrderedProductProps) => {
  const setOrderNumber = useSetOrderDetail()

  const navigate = useNavigate();

  const detailOrderClick = () => {
    setOrderNumber(order.orderId)

    navigate(PATH.ORDER_DETAIL)
  }
  return (
    <>
      <Style.OrderNumberAndDetail>
        <Style.OrderNumber >주문번호 : {order.orderId}</Style.OrderNumber>
        <Style.OrderDetail onClick={detailOrderClick}>
          상세보기
        </Style.OrderDetail>
      </Style.OrderNumberAndDetail>
      <Style.OrderProducts>
      {order.orderDetails && order.orderDetails.map((product)=> <OrderedProduct key={product.product.id} orderDetail={product}/>)}
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
  `,

  OrderNumber: styled.span`
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;

    letter-spacing: 0.5px;

    color: #333333;
  `,

  OrderDetail: styled.span`
    font-size: 20px;
    line-height: 24px;

    text-align: right;
    letter-spacing: 0.5px;

    color: #000000;
  `,

  OrderProducts: styled.div`
    margin-bottom: 50px;
  `
};
