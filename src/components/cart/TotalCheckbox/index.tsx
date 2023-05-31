import { S } from './TotalCheckbox.styles';

interface Props {
  cartLength: number;
  checkedItemsCount: number;
  clickRemoveButton: () => void;
  handleCheckAllItems: () => void;
}

const TotalCheckbox = ({
  cartLength,
  checkedItemsCount,
  clickRemoveButton,
  handleCheckAllItems,
}: Props) => {
  return (
    <S.CheckboxAllWrapper>
      <S.CheckboxAll
        type="checkbox"
        id="check-all-items"
        onChange={handleCheckAllItems}
        checked={cartLength === checkedItemsCount}
      />
      <label htmlFor={'all'}>{`전체선택 ${checkedItemsCount}/${cartLength}개`}</label>
      <S.RemoveSelectedButton id="remove-checked-items" onClick={clickRemoveButton}>
        선택 삭제
      </S.RemoveSelectedButton>
    </S.CheckboxAllWrapper>
  );
};

export default TotalCheckbox;
