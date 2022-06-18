import { CartItem } from 'types/domain';
import CheckBox from 'components/@common/CheckBox';
import CartItemContainer from './CartItemContainer';
import { Styled } from './styles';
import { useCartList } from 'hooks/useCartList';

interface CartListProps {
  cartList: CartItem[];
}

const CartList = ({ cartList }: CartListProps) => {
  const { isAllItemChecked, toggleCheckedAll, deleteSelectedItem } = useCartList(cartList);

  return (
    <Styled.CartList>
      <Styled.ButtonSet>
        <Styled.CheckBoxWrapper>
          <CheckBox
            id='전체 선택'
            checked={isAllItemChecked}
            onChange={toggleCheckedAll}
          ></CheckBox>
          <p>선택 해제</p>
        </Styled.CheckBoxWrapper>
        <Styled.DeleteSelectedButton onClick={deleteSelectedItem}>
          상품 삭제
        </Styled.DeleteSelectedButton>
      </Styled.ButtonSet>
      <Styled.CartItemListHeader>
        든든상품배송 {`( ${cartList.length} )`}개
      </Styled.CartItemListHeader>
      <Styled.CartItemList>
        {cartList.map(cartItem => (
          <CartItemContainer key={cartItem.id} cartList={cartList} cartItem={cartItem} />
        ))}
      </Styled.CartItemList>
    </Styled.CartList>
  );
};

export default CartList;
