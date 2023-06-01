import { styled } from 'styled-components';
import { OrderItem } from '../../types';
import useNavigatePage from '../../hooks/useNavigatePage';

interface Props {
  order: OrderItem;
  buttonHide?: boolean;
}

const OrderListItem = ({ order, buttonHide = false }: Props) => {
  const { goOrderDetail } = useNavigatePage();

  const orderItems = order.orderProducts.map(({ name, imageUrl, price, quantity }) => (
    <S.ItemWrapper>
      <S.Image src={imageUrl} alt={name} />
      <S.ItemInfoWrapper>
        <S.Name>{name}</S.Name>
        <S.Price>{`${price.toLocaleString()}원 / 수량 : ${quantity}개`}</S.Price>
      </S.ItemInfoWrapper>
    </S.ItemWrapper>
  ));

  return (
    <S.ItemsWrapper>
      <S.OrderInfoWrapper>
        <S.OrderNumber>{`주문번호 : ${order.orderId}`}</S.OrderNumber>
        {buttonHide ? null : (
          <S.DetailButton
            onClick={() => goOrderDetail(order.orderId)}
          >{`상세보기 >`}</S.DetailButton>
        )}
      </S.OrderInfoWrapper>
      {orderItems}
    </S.ItemsWrapper>
  );
};

const S = {
  ItemsWrapper: styled.li`
    width: 100%;
    height: fit-content;
    border: 1px solid #aaa;
    border-radius: 7px;

    :last-child {
      border-bottom: none;
    }
  `,

  ItemWrapper: styled.div`
    display: flex;
    flex-direction: row;
    padding: 40px 26px;
    border-bottom: 1px solid #aaa;
    width: 100%;
  `,

  OrderInfoWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 35px 40px;
    background-color: #f6f6f6;
    border-bottom: 1px solid #aaa;
    border-radius: 7px 7px 0 0;
    width: 100%;
  `,

  OrderNumber: styled.span`
    font-size: 20px;
  `,

  DetailButton: styled.button`
    font-size: 20px;
    background-color: transparent;
    color: black;
  `,

  Image: styled.img`
    width: 140px;
    height: auto;
  `,

  ItemInfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    width: 100%;
    gap: 25px;
  `,

  Name: styled.label`
    font-size: 20px;
  `,

  Price: styled.label`
    font-size: 16px;
    color: #888;
  `,
};

export default OrderListItem;
