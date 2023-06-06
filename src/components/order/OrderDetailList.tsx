import { styled } from 'styled-components';
import { OrderProducts } from '../../types';

interface Props {
  item: OrderProducts;
}

const OrderDetailItem = ({ item }: Props) => {
  return (
    <Style.Wrapper>
      <Style.ItemImage src={item.imageUrl} alt={`${item.name}의 이미지`} />
      <Style.ItemInfoWrapper>
        <Style.Name>{item.name}</Style.Name>
        <Style.TotalPriceAndQuantityWrapper>
          <Style.TotalPrice>{item.totalPrice.toLocaleString()}원 / </Style.TotalPrice>
          <Style.Quantity>수량: {item.quantity}개</Style.Quantity>
        </Style.TotalPriceAndQuantityWrapper>
      </Style.ItemInfoWrapper>
    </Style.Wrapper>
  );
};

const Style = {
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

export default OrderDetailItem;
