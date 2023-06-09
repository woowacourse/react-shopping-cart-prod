import * as S from './style';

const SkeltonPurChasedItems = () => {
  return (
    <S.Container>
      <S.OrderTitle>
        <S.OrderDate />
        <S.ShowDetailButton />
      </S.OrderTitle>
      <S.OrderItemsContainer>
        <S.EmptyContent />
      </S.OrderItemsContainer>
    </S.Container>
  );
};

export default SkeltonPurChasedItems;
