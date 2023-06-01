import styled from '@emotion/styled';
import { OrderListType } from '../../../types/types';
import { Text } from '../../common/Text/Text';
import DetailItem from '../../box/DetailItem/DetailItem';

interface DetailListProps {
  order: OrderListType;
  onConfirm?: () => void;
  onDelete?: () => void;
  isList?: boolean;
}
const DetailList = ({ order, isList = true, onConfirm, onDelete }: DetailListProps) => {
  return (
    <DetailListWrapper>
      <ListHeadWrapper>
        <Text size="small" weight="light" lineHeight="20px">
          주문번호: {order.id}
        </Text>
        {!isList && !order.confirmState && (
          <ButtonWrapper>
            <Button onClick={onConfirm}>주문확정</Button>|
            <Button onClick={onDelete}>주문취소</Button>
          </ButtonWrapper>
        )}
        {isList && (
          <SingleWrapper>
            <Button>상세보기{`>`}</Button>
          </SingleWrapper>
        )}
      </ListHeadWrapper>
      {order.orderProducts.map((orderProduct) => {
        return <DetailItem key={orderProduct.product.id} orderProduct={orderProduct} />;
      })}
    </DetailListWrapper>
  );
};

export default DetailList;

const DetailListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ListHeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  padding: 30px 39px;
  background-color: rgb(243, 245, 247);
  border: 1px solid #aaaaaa;
  border-radius: 6px 6px 0 0;
  @media screen and (max-width: 510px) {
    flex-direction: column;
    justify-content: space-around;
    padding: 15px 39px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;

  @media screen and (max-width: 510px) {
    align-self: flex-end;
  }
`;

const SingleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60px;

  @media screen and (max-width: 510px) {
    align-self: flex-end;
  }
`;

const Button = styled.button`
  font-weight: bold;
  background-color: transparent;
`;
