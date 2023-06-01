import { OrderProducts } from '../../types';
import { styled } from 'styled-components';

interface Props {
  item: OrderProducts;
}

const OrderListItem = ({ item }: Props) => {
  return (
    <S.Wrapper>
      <S.ItemImage src={item.imageUrl} alt={`${item.name}의 이미지`} />
      <S.ItemInfoWrapper>
        <S.Name>{item.name}</S.Name>
        <S.TotalPriceAndQuantityWrapper>
          <S.TotalPrice>{item.totalPrice.toLocaleString()}원 / </S.TotalPrice>
          <S.Quantity>수량: {item.quantity}개</S.Quantity>
        </S.TotalPriceAndQuantityWrapper>
      </S.ItemInfoWrapper>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.section`
    display: flex;
    padding: 35px 20px;
    border-bottom: 1px solid var(--gray-color);
  `,
  ItemInfoWrapper: styled.div`
    margin-left: 20px;
  `,

  Name: styled.p`
    font-size: 20px;
    margin-bottom: 20px;
  `,

  TotalPrice: styled.span``,

  Quantity: styled.span`
    margin-left: 4px;
  `,

  ItemImage: styled.img`
    width: 141px;
  `,

  TotalPriceAndQuantityWrapper: styled.div`
    display: flex;
    color: var(--gray-color);
  `,
};

export default OrderListItem;
