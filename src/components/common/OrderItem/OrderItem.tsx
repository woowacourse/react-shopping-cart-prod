import * as S from './OrderItem.styles';

const OrderItem = () => {
  return (
    <S.Item>
      <S.Thumbnail />
      <S.Info dir="column">
        <S.Name>친환경 실링용기-ECO 19153</S.Name>
        <S.SubInfo>30000원 / 수량: 3개</S.SubInfo>
      </S.Info>
    </S.Item>
  );
};

export default OrderItem;
