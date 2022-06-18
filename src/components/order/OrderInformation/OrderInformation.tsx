import Image from '@/components/common/Image/Image';
import { ROUTE } from '@/route';
import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as Styled from './OrderInformation.style';

function OrderInformation(props) {
  const { id } = useParams();
  const { orderId, orderList, responsive } = props;

  return (
    <>
      <Styled.OrderNumber>
        <p>주문번호: {orderId}</p>
        {id === undefined ? <Link to={`${ROUTE.OrderDetail}/${orderId}`}>상세 보기</Link> : null}
      </Styled.OrderNumber>

      <Styled.OrderDetailsContainer>
        {orderList.map((order: any, index) => (
          <Fragment key={index}>
            <Styled.OrderItemContainer>
              <Link to={`/products/${order.productId}`}>
                <Image
                  src={order.imageURL}
                  alt="대체 이미지"
                  width={responsive === 'desktop' ? '200px' : '150px'}
                />
              </Link>

              <Styled.OrderDescriptionContainer>
                <h2>{order.name}</h2>
                <p>
                  {(order.quantity * order.price).toLocaleString('ko-KR')}원 / 수량:{' '}
                  {order.quantity}개
                </p>
              </Styled.OrderDescriptionContainer>
            </Styled.OrderItemContainer>
          </Fragment>
        ))}
      </Styled.OrderDetailsContainer>
    </>
  );
}

export default OrderInformation;
