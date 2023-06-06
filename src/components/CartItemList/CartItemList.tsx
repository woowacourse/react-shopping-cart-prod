import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { cartAtom, selectedItemSelector } from '../../store/cart';
import { WIDTH } from '../../constants/mediaQuery';
import CartItem from './CartItem/CartItem';
import CheckBox from '../common/CheckBox/CheckBox';
import useSelectedItem from '../../hooks/useSelectedItem';

const CartItemList = () => {
  const cartList = useRecoilValue(cartAtom);
  const { selectedItemCount } = useRecoilValue(selectedItemSelector);
  const {
    isAllSelected,
    toggleSelectAll,
    setIsAllSelected,
    deleteSelectedItems,
  } = useSelectedItem();

  return (
    <Wrapper>
      <SubTitle>배송 상품 ({cartList.length}개)</SubTitle>
      <Ul>
        {cartList.map((item) => {
          return (
            <CartItem
              key={item.id}
              cart={item}
              setIsAllSelected={setIsAllSelected}
            />
          );
        })}

        {Boolean(cartList.length) && (
          <CheckBoxWrapper>
            <CheckBox onClick={toggleSelectAll} checked={isAllSelected} />
            <span>
              전체선택 ({selectedItemCount}/{cartList.length})
            </span>
            <DeleteSelectedItemsButton onClick={deleteSelectedItems}>
              선택삭제
            </DeleteSelectedItemsButton>
          </CheckBoxWrapper>
        )}
      </Ul>
    </Wrapper>
  );
};

export default CartItemList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 720px;
  min-width: ${WIDTH.SM};

  margin-top: 16px;

  @media (max-width: ${WIDTH.LG}) {
    width: 90vw;
    min-width: 375px;
  }
`;

const SubTitle = styled.div`
  width: 90%;
  height: 40px;

  font-weight: 200;

  border-bottom: 1px solid #aaaaaa;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  width: 100%;

  padding: 8px;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 8px;

  width: 100%;
`;

const DeleteSelectedItemsButton = styled.button`
  border: 1px solid var(--grey-100);

  padding: 8px 12px;

  font-weight: 200;
`;
