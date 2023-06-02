import { styled } from 'styled-components';
import { OrderItemType } from 'types/OrderType';

function OrderItemList({ orderItems }: { orderItems: OrderItemType[] }) {
  return (
    <>
      {orderItems.map((item) => (
        <WrapperContent>
          <ItemImage src={item.imageUrl} />
          <ItemInfoWrapper>
            <ItemTitle>{item.name}</ItemTitle>
            <ItemInfo>
              {item.price}원 / {item.quantity}개
            </ItemInfo>
          </ItemInfoWrapper>
        </WrapperContent>
      ))}
    </>
  );
}

export default OrderItemList;

const WrapperContent = styled.div`
  display: flex;
  column-gap: 2rem;
  padding-bottom: 2rem;
  margin-bottom: 2rem;

  border-bottom: ${({ theme }) => theme.secondaryColor} 1px solid;
`;

export const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  aspect-ratio: 1/1;
  border-radius: 4px;

  object-fit: cover;
`;

const ItemInfoWrapper = styled.div`
  display: flex;
  row-gap: 1rem;
  flex-direction: column;
`;

const ItemTitle = styled.div`
  font-size: 1.6rem;
`;

const ItemInfo = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.secondaryColor};
`;
