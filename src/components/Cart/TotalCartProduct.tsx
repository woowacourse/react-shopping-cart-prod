import styled from 'styled-components';

import CheckBox from '../Common/CheckBox';
import Button from '../Common/Button';

import useCartProductCount from '../../hooks/useCartProductCount';
import useCheckedCount from '../../hooks/useCheckedCount';
import useMultipleChecked from '../../hooks/useMultipleChecked';

const TotalCartProduct = () => {
  const cartProductCount = useCartProductCount();
  const checkedCount = useCheckedCount();
  const { isAllChecked, toggleAllProductChecked, deleteCheckedProducts } =
    useMultipleChecked();

  return (
    <Container>
      <TotalProductCountWrapper>
        <CheckBox
          id="total-item-check"
          onChange={toggleAllProductChecked}
          checked={isAllChecked}
        />
        <p>
          전체 선택 ({checkedCount}/{cartProductCount})
        </p>
      </TotalProductCountWrapper>
      <Button
        type="button"
        buttonPrimary={false}
        size="small"
        buttonBorder
        disabled={checkedCount === 0 ? true : false}
        onClick={deleteCheckedProducts}
      >
        선택삭제
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 28px 0 40px 0;
`;

const TotalProductCountWrapper = styled.div`
  display: flex;
  align-items: center;

  & > p {
    margin: 0 0 0 12px;
  }
`;

export default TotalCartProduct;
