import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

import HTTPError from '../../../api/utils/HTTPError';
import { HTTP_ERROR_MESSAGE, HTTP_STATUS_CODE } from '../../../constants/api';
import { orderState } from '../../../store/order';
import { Divider } from '../../common/Divider/Divider.styles';
import Heading from '../../common/Heading/Heading';
import OrderDetailItem from '../OrderDetailItem/OrderDetailItem';
import * as S from './OrderDetailList.styles';

interface OrderDetailListProps {
  orderId: number;
}

const OrderDetailList = ({ orderId }: OrderDetailListProps) => {
  const order = useRecoilValue(orderState(orderId));

  if (order === null) {
    throw new HTTPError(HTTP_STATUS_CODE.NOT_FOUND, {
      payload: HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.NOT_FOUND],
    });
  }

  return (
    <>
      <Heading css={S.headingStyle} size="xSmall">
        주문번호 {orderId}
      </Heading>
      <S.ListContainer>
        {order.orderedItems.map((orderedItem, index) => (
          <Fragment key={index}>
            <OrderDetailItem {...orderedItem} />
            <Divider />
          </Fragment>
        ))}
      </S.ListContainer>
    </>
  );
};

export default OrderDetailList;
