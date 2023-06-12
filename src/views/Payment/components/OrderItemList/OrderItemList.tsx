import { OrderItemType } from "types/OrderType";
import * as S from "./OrderItemList.style";

function OrderItemList({ orderItems }: { orderItems: OrderItemType[] }) {
  return (
    <>
      {orderItems.map((item) => (
        <S.WrapperContent key={item.orderItemId}>
          <S.ItemImage src={item.imageUrl} />
          <S.ItemInfoWrapper>
            <S.ItemTitle>{item.name}</S.ItemTitle>
            <S.ItemInfo>
              {item.price}원 / {item.quantity}개
            </S.ItemInfo>
          </S.ItemInfoWrapper>
        </S.WrapperContent>
      ))}
    </>
  );
}

export default OrderItemList;
